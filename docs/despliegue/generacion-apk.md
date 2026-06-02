---
title: Generacion del APK
sidebar_position: 1
---

# Generacion del APK

## APK de debug

El APK de debug se genera automáticamente al ejecutar la aplicación desde Android Studio o mediante el wrapper de Gradle:

```bash
./gradlew assembleDebug
```

El artefacto se genera en:
```
app/build/outputs/apk/debug/app-debug.apk
```

El APK de debug lleva la firma de debug de Android Studio y no puede distribuirse en Google Play. Es adecuado para pruebas internas e instalación directa en dispositivos mediante `adb`.

## APK de release

Para generar un APK firmado apto para distribución:

### 1. Crear un keystore

Si no se dispone de un keystore de firma:

```bash
keytool -genkey -v \
  -keystore trainium-release-key.jks \
  -alias trainium \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### 2. Configurar la firma en build.gradle.kts

Añadir la configuración de `signingConfigs` en `app/build.gradle.kts`:

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("../trainium-release-key.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "trainium"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

Se recomienda leer las contraseñas desde variables de entorno (`System.getenv`) en lugar de incluirlas en texto plano en el fichero de build.

### 3. Generar el APK firmado

```bash
./gradlew assembleRelease
```

El artefacto se genera en:
```
app/build/outputs/apk/release/app-release.apk
```

## Minificacion y ofuscacion

En la configuración actual, `isMinifyEnabled = false` en el bloque `release`. Esto significa que el código no se minifica ni se ofusca con R8/ProGuard. Para una distribución en producción se recomienda habilitar la minificación:

```kotlin
release {
    isMinifyEnabled = true
    proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
    )
}
```

Al habilitar la minificación con Supabase y `kotlinx.serialization` es necesario añadir las reglas de ProGuard correspondientes para preservar las clases serializables. El fichero `proguard-rules.pro` incluido en el proyecto está vacío en esta versión.

## Instalacion via adb

Para instalar el APK directamente en un dispositivo conectado:

```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

Si hay varios dispositivos conectados, especificar el destino:

```bash
adb -s <device-serial> install app-debug.apk
```

Para obtener la lista de dispositivos conectados:

```bash
adb devices
```

## Requisitos del dispositivo destino

| Requisito | Valor |
|---|---|
| API mínima | 24 (Android 7.0 Nougat) |
| API objetivo | 36 |
| Arquitectura | arm64-v8a, armeabi-v7a, x86_64 (según el dispositivo) |
| Permisos en instalación | INTERNET, ACCESS_NETWORK_STATE |
| Conexión a internet | Obligatoria para el funcionamiento de la aplicación |
