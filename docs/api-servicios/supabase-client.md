---
title: Cliente Supabase
sidebar_position: 1
---

# Cliente Supabase

## SupabaseClient

`SupabaseClient.kt` define un singleton `object` que inicializa el cliente del SDK de Supabase. Es el punto de acceso único para todas las operaciones de base de datos de la aplicación.

```kotlin
object SupabaseClient {
    private const val SUPABASE_URL = "https://zuvattchpylwyclbwahe.supabase.co"
    private const val SUPABASE_KEY = "sb_publishable_..."

    val client = createSupabaseClient(
        supabaseUrl = SUPABASE_URL,
        supabaseKey = SUPABASE_KEY
    ) {
        install(Postgrest)
        install(Auth)
    }
}
```

Los plugins instalados son `Postgrest` (para operaciones CRUD sobre tablas) y `Auth` (módulo de autenticación del SDK, aunque el flujo de login de la aplicación no delega en él directamente).

## Patrones de uso en la aplicacion

Todas las llamadas a Supabase siguen el mismo patrón: se lanzan dentro de un `scope.launch {}` o `withContext(Dispatchers.IO) {}` para ejecutarse fuera del hilo principal.

### Consulta simple (SELECT con filtro)

```kotlin
val usuario = withContext(Dispatchers.IO) {
    SupabaseClient.client.from("usuarios")
        .select { filter { eq("id", idUsuario) } }
        .decodeSingleOrNull<Usuario>()
}
```

### Consulta con relaciones embebidas (JOIN implícito)

PostgREST permite recuperar datos de tablas relacionadas en una única petición usando la sintaxis de columnas raw:

```kotlin
val columns = Columns.raw("*, usuarios(*), maquinas(*)")
val reservas = SupabaseClient.client.from("reservas")
    .select(columns)
    .decodeList<ReservaConDetalles>()
```

El objeto `ReservaConDetalles` debe declarar los campos `usuario: Usuario?` y `maquina: Maquina?` con los nombres de las tablas relacionadas anotados con `@SerialName`.

### Insercion (INSERT)

```kotlin
SupabaseClient.client.from("reservas")
    .insert(Reserva(
        idUsuario = idUsuario,
        idMaquina = maquina.id,
        fecha = fechaSeleccionada,
        horaInicio = horaSeleccionada,
        horaFin = horaFin
    ))
```

### Actualizacion (UPDATE con filtro)

```kotlin
SupabaseClient.client.from("maquinas")
    .update({
        set("operativa", false)
        set("mantenimiento_desde", desde)
        set("mantenimiento_hasta", hasta)
    }) { filter { eq("id", maquina.id) } }
```

### Eliminacion (DELETE con filtro)

```kotlin
SupabaseClient.client.from("reservas")
    .delete { filter { eq("id", reserva.id ?: 0) } }
```

## Deserializacion automatica

Las data classes del paquete `models` están anotadas con `@Serializable` de `kotlinx.serialization`. El SDK de Supabase usa este mecanismo para mapear automáticamente el JSON de las respuestas de PostgREST a los tipos Kotlin correspondientes. Los nombres de campo que difieren entre la columna de la base de datos y el campo Kotlin se alinean con `@SerialName`:

```kotlin
@Serializable
data class Reserva(
    val id: Int? = null,
    @SerialName("id_usuario") val idUsuario: Int,
    @SerialName("id_maquina") val idMaquina: Int,
    val fecha: String,
    @SerialName("hora_inicio") val horaInicio: String,
    @SerialName("hora_fin") val horaFin: String,
    val estado: Boolean = true
)
```
