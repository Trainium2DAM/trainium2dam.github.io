---
title: Requisitos previos
sidebar_position: 1
---

# Requisitos previos

Antes de clonar el repositorio y compilar el proyecto es necesario disponer del siguiente software instalado y configurado en la máquina de desarrollo.

## Entorno de desarrollo

| Herramienta | Versión mínima | Notas |
|---|---|---|
| Android Studio | Hedgehog (2023.1.1) o superior | Se recomienda la versión más reciente estable |
| JDK | 11 | Configurado como `sourceCompatibility` y `targetCompatibility` en el módulo `:app` |
| Gradle | 8.13 | Gestionado por el wrapper incluido en el repositorio (`gradlew`) |
| Android SDK (compileSdk) | 36 | Instalar desde el SDK Manager de Android Studio |
| Android SDK (minSdk) | 24 (Android 7.0 Nougat) | La aplicación no se instala en versiones anteriores |
| Kotlin | 2.0+ | Gestionado por el plugin `kotlin.android` declarado en `build.gradle.kts` |

## Cuentas de servicio necesarias

El proyecto depende de dos backends externos que requieren cuentas activas:

**Supabase**

Se necesita un proyecto de Supabase con las tablas del esquema descritas en la sección [Base de datos](/docs/base-de-datos/esquema-supabase). Las credenciales (`SUPABASE_URL` y `SUPABASE_KEY`) se declaran como constantes en `SupabaseClient.kt`. Para entornos de producción se recomienda moverlas a un fichero `local.properties` o a variables de entorno y no commitar los valores reales.

**Firebase**

Se necesita un proyecto de Firebase con los servicios Authentication y Data Connect habilitados. El fichero `google-services.json` debe copiarse en `app/google-services.json`. Este fichero no debe subirse al repositorio si el proyecto es público.

## Permisos requeridos por la aplicación

El `AndroidManifest.xml` declara los siguientes permisos:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Ambos son permisos normales (no requieren aprobación en tiempo de ejecución por parte del usuario). La conectividad de red es imprescindible para el funcionamiento de la aplicación ya que todas las operaciones de datos son remotas.
