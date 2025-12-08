---
title: "Guía Completa de Preparación para el eJPT: Estrategias, Laboratorios Recomendados y Skills Fundamentales"
description: "Ruta completa y ampliada para aprobar el eJPT basada en experiencia real: habilidades esenciales, metodología, herramientas, máquinas recomendadas y consejos prácticos."
date: "2025-12-08"
published: true
tags: ["ejpt", "pentesting", "certificaciones", "tryhackme", "ine", "ethical hacking"]
readTime: "30 min"
---

# Guía Completa de Preparación para el eJPT  
**Cómo aprobar el examen dominando lo esencial del pentesting práctico**

El **eJPT** es una certificación de entrada al pentesting que valida tu capacidad para realizar pruebas reales: desde enumeración, explotación, movimiento lateral, hasta escalada de privilegios y análisis de tráfico. A diferencia de otros exámenes más teóricos, este es **100% práctico**, por lo que tu entrenamiento debe basarse en laboratorios, metodología y dominio de herramientas.

Esta guía reúne una ruta ampliada basada en experiencia real, sumada a laboratorios recomendados, técnicas centrales y máquinas en las que realmente aprenderás lo que el examen evalúa.

---

# 🧠 Conocimientos Fundamentales que Debes Dominar

El eJPT evalúa **tu proceso**, no tu capacidad de memorizar comandos. Por eso, estas habilidades son esenciales:

## 🔍 1. Enumeración Efectiva

Es el pilar del examen. Debes dominar:

- Escaneo de puertos y servicios expuestos  
- Fingerprinting de servicios y versiones  
- Enumeración de FTP, SSH, HTTP, SMB  
- Descubrimiento de rutas sobre web  
- Identificación de credenciales débiles o expuestas  

**Herramientas clave:**  

`Nmap`, `WhatWeb`, `Gobuster`, `smbmap`, `enum4linux`, `Hydra`, `WPScan`

---

## 🛠️ 2. Explotación de Servicios y Vulnerabilidades

No necesitas explotar CVEs avanzados: todo es básico, pero requiere metodología.

* Archivos expuestos (backup, config, rutas sensibles)  
* Subida de archivos controlada (web shells)  
* SQL Injection  
* RCE por funcionalidades inseguras  
* Password cracking  

**Herramientas:**  

`Burp Suite`, `SQLmap`, `Hydra`, `PHP reverse shells`, `John the Ripper`, `Curl`, `Netcat`

---

## 🔐 3. Escalada de Privilegios

Saber identificar vectores comunes:

- SUID vulnerables  
- Permisos sudo mal configurados  
- Credenciales almacenadas en texto plano  
- Cronjobs modificables  
- Capabilities  
- Docker/LXD escapes  

**Herramientas:**  

`LinPEAS`, `WinPEAS`, `GTFOBins`, `sudo -l`, `find`, `tar`, `vim`, `python`, `bash`

---

## 🧩 4. Scripting & Automatización

No necesitas ser un programador, pero sí dominar:

- Python para shells y web servers temporales  
- Bash para tareas repetitivas  
- Manipulación de archivos  
- reverse shells con netcat/python  

---

## 🧰 5. Herramientas Imprescindibles

| Categoría | Herramientas |
|----------|--------------|
| Enumeración | Nmap, WhatWeb, Gobuster, smbmap, enum4linux |
| Fuerza bruta | Hydra, Medusa, John |
| Web | Burp Suite, Nikto, curl, WPScan |
| Post-explotación | Netcat, Python PTY, wget, LinPEAS, WinPEAS |
| Reversing ligero | CyberChef, base64, hexdump |
| Shells | bash, python, socat |

---

# 🧠 Laboratorios Clave para la Preparación del eJPT  

Los siguientes labs están organizados por nivel de importancia según las habilidades evaluadas en el examen.

---

# 🌐 TryHackMe Labs Recomendados

## **1. Basic Pentesting**

**Habilidades:**  

* Enumeración completa de red  
* Brute-force básico  
* Enum4linux + Samba  
* Escalada por credenciales expuestas  

**Herramientas:**  

Nmap, Hydra, Gobuster, enum4linux, John, SSH, LinPEAS  

**Por qué es crucial:**  

Simula muy bien el flujo del eJPT: enumerar → encontrar credenciales → acceder → escalar.

---

## **2. Pickle Rick**

**Habilidades:**  

- Web exploitation básico  
- Comandos remotos  
- Priv-esc con sudo  

**Herramientas:**  

Nmap, Gobuster, Browser, sudo, less  

**Por qué es importante:**  

Refuerza la lógica de leer archivos sensibles cuando tienes sudo limitado.

---

## **3. RootMe**

**Habilidades:**  

- File upload bypass  
- Shell reversa  
- SUID exploitation  

**Herramientas:**  

PHP reverse shell, Nmap, Gobuster, Netcat, Python, GTFOBins  

**Relevancia:**  

Muy útil para entender el flujo de RCE → shell → priv-esc simple.

---

## **4. SimpleCTF**

**Habilidades:**  

- FTP Enumeration  
- SQL Injection  
- Uso correcto de ExploitDB  
- Priv esc con sudo/vim  

**Herramientas:**  

Nmap, Gobuster, SQL tools, SSH, GTFOBins  

**Relevancia:**  

Excelente ejercicio de SQL Injection sencilla, muy alineada con el examen.

---

## **5. Bounty Hacker**

**Habilidades:**  

- FTP con acceso anónimo  
- Cracking de contraseñas  
- SUID exploitation  

**Relevancia:**  

Uno de los más parecidos al examen a nivel de complejidad.

---

## **6. LazyAdmin**

**Habilidades:**  

- Enumeración web profunda  
- Backups filtrados  
- MD5 cracking  
- RCE + escalada mediante script sudo  

Excelente práctica del flujo más común del examen: **buscar archivos expuestos → credenciales → acceso → escalada.**

---

## **7. c4ptur3-th3-fl4g**

**Habilidades:**  

- Criptografía básica  
- Encoding/decoding  
- Steganografía  

Aunque no es explotación directa, te prepara para manipular datos codificados que pueden aparecer en el examen (por ejemplo, credenciales base64).

---

## **8. Skynet**

**Habilidades:**  

- SMB enumeration  
- Vulnerabilidad RFI  
- Priv esc mediante wildcard injection  

**Relevancia:**  

Laboratorio completo que cubre varias cadenas de ataque.

---

## **9. Ignite**

**Habilidades:** 

- CMS exploitation  
- Reverse shell tradicional  
- Priv-esc from credentials found  

Perfecto para practicar explotación de aplicaciones con CVEs conocidos.

---

## **10. ToolsRus**

**Habilidades:**  

- Autenticación básica  
- Tomcat manager exploitation  
- Metasploit  

Ideal para aprender en qué momento utilizar Metasploit de forma controlada.

---

## **11. Wgel CTF**

**Habilidades:**  

- Descarga de llaves SSH expuestas  
- wget para priv-esc (GTFOBins)  

Muy bueno para practicar uso de herramientas básicas del sistema para escalar privilegios.

---

## **12. Startup**

**Habilidades:**  

- FTP upload  
- PHP webshell  
- Extracción de PCAP  
- Cron abuse para root  

Uno de los más completos. Perfecto para practicar flujo avanzado.

---

## **13. Brooklyn Nine-Nine**

**Habilidades:**  

- FTP + SSH brute-force  
- Priv esc con GTFOBins  

Perfecto para reforzar credenciales débiles y vectores clásicos.

---

## **14. Chill Hack**

**Habilidades:**  

- SQLi  
- Steganografía  
- Docker exploitation  

Te prepara para escenarios complejos ordenados paso a paso.

---

## **15. GamingServer**

**Habilidades:**  

- Enumeración web avanzada  
- Cracking claves SSH  
- LXD container escape  

Practicar container escapes puede darte entendimiento profundo de escalada moderna.

---

## **16. Mr. Robot**

**Habilidades:**  

- WordPress  
- Burp enumeration  
- PHP reverse shell  
- MD5 cracking  
- Priv esc mediante SUID Nmap  

Uno de los mejores laboratorios para prepararte para explotación web.

---

# 🧭 Metodología para el eJPT (Muy Importante)

## 1. Escanea TODO primero (Nmap agresivo)

```bash
nmap -sV -sC -A -p- <IP>
```


## 2. Clasifica los servicios:

| Servicio | Qué buscar |
|---------|------------|
| HTTP    |     rutas ocultas, uploads, backup, creds |
| FTP     |     acceso anónimo, archivos sensibles |
| SSH     |     fuerza bruta solo si hay usuarios válidos |
| SMB     |     shares sin autenticación |
| DB      |     credenciales débiles |

## 3. Documenta cada hallazgo

## 4. Explota por orden lógico:

credenciales → acceso → shell → escalada

## 5. Verifica credenciales en múltiples servicios

## 6. Repite el ciclo: enumerar → explotar → enumerar → escalar

---

# 🎯 Consejos Finales para Aprobar el eJPT

- **No memorices herramientas**, entiende para qué sirven.  
- La clave del examen es **leer bien la pregunta**.  
- No todo requiere explotación avanzada: a veces solo es leer un archivo.  
- La mayor parte del examen es **búsqueda lógica**, no fuerza bruta.  
- Mantén una hoja de trucos con comandos esenciales.  
- Aprovecha Python para levantar servidores:

```bash
python3 -m http.server 8080
```
- Los vectores más comunes:
- credenciales débiles  
- backups expuestos  
- SQLi  npm dev 
- FTP/SMB abiertos  

---

# 📌 Conclusión
Si dominas la metodología, practicas las máquinas recomendadas y entiendes las herramientas esenciales, aprobar el eJPT será un proceso fluido y natural. Esta certificación es un excelente primer paso hacia OSCP, PNPT, e incluso hacia roles profesionales de pentesting.