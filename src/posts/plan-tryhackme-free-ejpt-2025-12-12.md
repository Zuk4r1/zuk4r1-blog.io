---
title: "plan-tryhackme-free-ejpt"
description: "Plan estructurado de entrenamiento para el eJPT con ejercicios reales, máquinas recomendadas y una ruta de estudio totalmente basada en práctica."
date: "2025-12-12"
published: true
tags: ["ejpt", "pentesting", "certificaciones", "tryhackme", "ethical hacking"]
readTime: "15 min"
---

# 🟩 Entrenamiento para Aprobar el eJPT

Este plan está diseñado para fortalecer los puntos débiles más comunes del examen eJPT, especialmente en áreas como enumeración, auditoría de red, pivoting y explotación de servicios, nos apoyaremos de la plataforma **tryhackme** para realizar los ejercicios y mejorar nuestras habilidades.

---

## 🔵 Semana 1 — Fundamentos de Enumeración y Escaneo

### Objetivo:
Corregir fallos críticos en reconocimiento y auditoría de red.

### 1. **Intro to Networking** 
- Comprensión de subredes, rangos y DMZ.  
- *Área donde presentaste fallos en el examen.*

### 2. **Nmap — Live Host Discovery**
- Identificación de endpoints.  
- Detección de puertos y servicios.  
- *Fallaste reconocimiento básico, así que esta room es clave.*

### 3. **Nmap (Advanced)**
- Escaneo profundo.  
- Detección de versión y sistema operativo.  
- Uso de scripts NSE.

### 4. **Network Services 1 (FTP, SMB, SSH)**
- Enumeración de SMB (usuarios y recursos).  
- FTP con acceso anónimo.  
- Temas frecuentes en el eJPT.

### 5. **Network Services 2 (MySQL, RDP, etc.)**
- Enumeración de MySQL (muy recurrente en el examen).  
- Recolección de credenciales y configuraciones.

---

## 🔵 Semana 2 — Pivoting + Explotación en Host

### 1. **Pivoting Fundamentals (Free)**
- Conceptos de routing y autoroute.  
- Dynamic port forwarding (SSH / Metasploit).  
- *Tema donde tuviste un fallo crítico durante el examen.*

### 2. **Metasploit Intro & Metasploit Pivoting**
- Uso de módulos como `hta_server`.  
- Creación de rutas y túneles SOCKS.  
- Enumeración de redes internas.

### 3. **Linux Fundamentals 1–3**
- Enumeración del sistema.  
- Permisos, usuarios y archivos clave.  
- Localización de credenciales en CMS.

### 4. **Windows Fundamentals 1–2**
- Enumeración de usuarios y grupos locales.  
- Cuentas Administrator y política de contraseñas.  
- *Otro punto débil detectado en tu examen.*

---

## 🔵 Semana 3 — Web + CMS (Drupal / WordPress)

### 1. **OWASP Top 10 (Free)**
- Enumeración web y análisis de superficie.  
- WebDAV (pregunta real del eJPT).  
- LFI/RFI y brute force en logins.

### 2. **Attacktive Directory (Free)**
- Enumeración SMB/LDAP.  
- Ataques de fuerza bruta.  
- Usuarios, grupos y estructura AD.  
- *Muy similar a la parte DMZ del examen.*

### 3. **WordPress CMS (Free)**
- Detección de versión.  
- Enumeración de plugins y themes.  
- Acceso a `wp-config.php`.  
- *Varias preguntas del examen provienen de WordPress.*

### 4. **Drupal CMS (Práctica manual)**
No hay lab dedicado en Free, pero puedes ensayar:
- Revisión de `changelog.txt`.  
- Enumeración de usuarios.  
- Detección de versión con **droopescan**.

---

# 🔥 Labs TryHackMe Similares al eJPT (Todos Free)

### 1. **Blue**
- SMB + explotación Windows.  
- Estilo de preguntas del examen.

### 2. **Simple CTF**
- WordPress + archivos de configuración.  
- Privesc básica.

### 3. **Mr. Robot**
- Enumeración web avanzada.  
- Fuerza bruta.  
- WordPress.  
- *Excelente simulación del eJPT.*

### 4. **Kenobi**
- Enumeración SMB y NFS.  
- Usuarios y hashes.  
- *Directamente relacionado con tus fallos del examen.*

### 5. **Steel Mountain**
- Explotación Windows.  
- Transferencia de archivos (certutil).  
- Privesc sencilla.

---

# 🟢 Plan Final Día por Día (15 Días)

## Semana 1 — Enumeración Hardcore (Día 1–7)
- **D1:** Host discovery + service discovery con Nmap  
- **D2:** NSE + detección de SO  
- **D3:** SMB enumeration (Kenobi)  
- **D4:** Fuerza bruta FTP/SSH  
- **D5:** Enumeración de MySQL  
- **D6:** Blue  
- **D7:** Repaso y creación de mindmap

## Semana 2 — Pivoting + Host Exploitation (Día 8–14)
- **D8:** Pivoting Fundamentals  
- **D9:** Pivoting con Metasploit + autoroute  
- **D10:** Linux privilege escalation  
- **D11:** Windows privilege escalation  
- **D12:** Steel Mountain  
- **D13:** Simple CTF  
- **D14:** Drills de pivoting + SOCKS + Nmap interno

## Semana 3 — Simulación Final (Día 15)
- Mr. Robot  
- Kenobi  
- Crea tu propio mini-examen  
- **Objetivo:** obtener **>80%** antes de presentar el examen real

---


