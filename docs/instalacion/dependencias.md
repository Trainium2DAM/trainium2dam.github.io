---
title: Dependencias
sidebar_position: 3
---

# Dependencias

Todas las dependencias se declaran en `app/build.gradle.kts` mediante el sistema de catálogo de versiones de Gradle (`libs`). Las versiones concretas se resuelven en el fichero `gradle/libs.versions.toml` del proyecto.

## Dependencias de producción

### AndroidX Core

```kotlin
implementation(libs.androidx.core.ktx)
implementation(libs.androidx.lifecycle.runtime.ktx)
implementation(libs.androidx.activity.compose)
```

`core.ktx` aporta extensiones de Kotlin para las APIs de Android. `lifecycle.runtime.ktx` permite lanzar corrutinas con scope ligado al ciclo de vida del componente. `activity.compose` es el puente entre `ComponentActivity` y Jetpack Compose.

### Jetpack Compose + Material 3

```kotlin
implementation(platform(libs.androidx.compose.bom))
implementation(libs.androidx.compose.ui)
implementation(libs.androidx.compose.ui.graphics)
implementation(libs.androidx.compose.ui.tooling.preview)
implementation(libs.androidx.compose.material3)
implementation("androidx.compose.material3:material3:1.2.0")
implementation("androidx.compose.material:material-icons-extended")
```

La BOM (Bill of Materials) de Compose sincroniza las versiones de todos los artefactos del toolkit. `material-icons-extended` proporciona el conjunto completo de iconos de Material Symbols utilizados en los distintos componentes de la interfaz.

### Navegación

```kotlin
implementation("androidx.navigation:navigation-compose:2.7.7")
```

Permite definir el grafo de navegación de forma declarativa mediante composables. La versión 2.7.7 es compatible con las APIs de tipo seguro y con el manejo de argumentos tipados que se utiliza en `MainActivity.kt`.

### Firebase

```kotlin
implementation(platform(libs.firebase.bom))
implementation(libs.firebase.auth)
```

La BOM de Firebase sincroniza las versiones de los SDKs de Firebase. Solo se usa el módulo de autenticación (`firebase.auth`) a nivel de SDK de cliente, dado que Data Connect se invoca mediante llamadas HTTP directas al endpoint GraphQL.

### Supabase

```kotlin
implementation(libs.supabase.postgrest)
implementation(libs.supabase.auth)
implementation(libs.ktor.client.android)
```

El SDK oficial de Supabase para Kotlin se divide en módulos. `postgrest` gestiona las operaciones CRUD sobre las tablas de PostgreSQL. `supabase.auth` proporciona flujos de autenticación basados en JWT. `ktor.client.android` es el motor HTTP subyacente requerido por el SDK.

### Persistencia local

```kotlin
implementation(libs.androidx.datastore.preferences)
```

DataStore Preferences se utiliza en `ThemeManager.kt` para persistir la preferencia de tema (claro/oscuro) del usuario entre sesiones. Es el sucesor recomendado de `SharedPreferences` al operar de forma asíncrona sobre corrutinas.

### Material (legacy)

```kotlin
implementation(libs.material)
```

Incluido para compatibilidad con `DatePickerDialog` y `TimePickerDialog` de Android View, que se instancian directamente en `MaquinasScreen.kt` y `ReservasScreen.kt` ya que Compose Material 3 no proporciona estos diálogos nativamente en la versión utilizada.

## Dependencias de testing

```kotlin
testImplementation(libs.junit)
androidTestImplementation(libs.androidx.junit)
androidTestImplementation(libs.androidx.espresso.core)
androidTestImplementation(platform(libs.androidx.compose.bom))
androidTestImplementation(libs.androidx.compose.ui.test.junit4)
debugImplementation(libs.androidx.compose.ui.tooling)
debugImplementation(libs.androidx.compose.ui.test.manifest)
```

Los tests instrumentados se ubican en `app/src/androidTest/` y los tests de unidad en `app/src/test/`. El proyecto incluye las clases de test por defecto generadas por Android Studio (`ExampleInstrumentedTest` y `ExampleUnitTest`) sin tests personalizados adicionales en esta versión.

## Plugins de Gradle

```kotlin
// app/build.gradle.kts
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.google.services)
    alias(libs.plugins.kotlin.serialization)
}
```

El plugin `kotlin.compose` habilita el compilador de Compose para Kotlin 2.0+. `google.services` procesa `google-services.json`. `kotlin.serialization` habilita el procesador de anotaciones de `kotlinx.serialization`, utilizado por las data classes de modelos para la deserialización automática desde las respuestas de Supabase.
