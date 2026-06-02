---
title: Instalacion y configuracion
sidebar_position: 2
---

# Instalacion y configuracion

## Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd AppFinal
```

El directorio raíz contiene el wrapper de Gradle (`gradlew` / `gradlew.bat`) y el único módulo de la aplicación (`:app`).

## Estructura del proyecto

```
AppFinal/
├── app/
│   ├── build.gradle.kts          # Dependencias y configuración del módulo
│   ├── google-services.json      # Credenciales Firebase (no commitar en repos públicos)
│   ├── dataconnect/              # Esquemas y queries de Firebase Data Connect
│   │   ├── dataconnect.yaml
│   │   ├── schema/
│   │   │   └── schema.gql
│   │   └── default_connector/
│   │       ├── connector.yaml
│   │       └── queries.gql
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml
│           ├── java/com/example/trainium2/
│           │   ├── MainActivity.kt
│           │   ├── models/
│           │   └── ui/theme/
│           └── res/
│               ├── drawable/
│               ├── raw/          # video_app.mp4 (splash)
│               └── values/
├── build.gradle.kts              # Configuración raíz (plugins)
├── settings.gradle.kts           # Nombre del proyecto e inclusión del módulo
├── gradle.properties             # JVM args y flags de AndroidX
├── setup_database.sql            # Script de inicialización para MySQL/MariaDB
└── gradlew / gradlew.bat
```

## Configurar las credenciales de Supabase

Las credenciales de Supabase se encuentran en `app/src/main/java/com/example/trainium2/SupabaseClient.kt`:

```kotlin
object SupabaseClient {
    private const val SUPABASE_URL = "https://<tu-proyecto>.supabase.co"
    private const val SUPABASE_KEY = "<tu-anon-key>"

    val client = createSupabaseClient(
        supabaseUrl = SUPABASE_URL,
        supabaseKey = SUPABASE_KEY
    ) {
        install(Postgrest)
        install(Auth)
    }
}
```

Sustituir `SUPABASE_URL` y `SUPABASE_KEY` por los valores del proyecto Supabase propio. La `anon key` (clave pública) es la que corresponde a este campo. No usar la `service_role` key en la aplicación cliente.

## Configurar Firebase

1. Acceder a la consola de Firebase y seleccionar el proyecto correspondiente.
2. Ir a **Configuración del proyecto > General > Tus aplicaciones**.
3. Descargar el fichero `google-services.json`.
4. Copiar el fichero en `app/google-services.json`.

El plugin `com.google.gms.google-services` declarado en `app/build.gradle.kts` procesa este fichero automáticamente durante la compilación.

## Compilar el proyecto

### Desde Android Studio

1. Abrir Android Studio.
2. Seleccionar **File > Open** y apuntar al directorio raíz `AppFinal/`.
3. Esperar a que Gradle sincronice el proyecto (la primera vez descarga las dependencias).
4. Conectar un dispositivo Android (API 24+) o lanzar un AVD.
5. Pulsar **Run > Run 'app'** o el icono de play.

### Desde línea de comandos

```bash
# En sistemas Unix/macOS
./gradlew assembleDebug

# En Windows
gradlew.bat assembleDebug
```

El APK de debug se genera en `app/build/outputs/apk/debug/app-debug.apk`.

## Configurar la base de datos

El fichero `setup_database.sql` contiene el script de inicialización para una base de datos MySQL/MariaDB local (utilizada como referencia durante el desarrollo inicial). El backend activo en producción es Supabase. Véase la sección [Base de datos](/docs/base-de-datos/esquema-supabase) para el esquema completo de tablas que debe existir en el proyecto de Supabase.

## Parámetros de configuración de Gradle

El fichero `gradle.properties` contiene las siguientes propiedades relevantes:

```properties
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
kotlin.code.style=official
android.nonTransitiveRClass=true
```

La propiedad `org.gradle.jvmargs=-Xmx2048m` asigna 2 GB de heap al proceso Gradle. En máquinas con poca RAM puede reducirse a `-Xmx1024m` a costa de tiempos de compilación más lentos.
