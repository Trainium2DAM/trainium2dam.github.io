---
title: Modelos de datos
sidebar_position: 1
---

# Modelos de datos

Todas las data classes del paquete `models` están anotadas con `@Serializable` de `kotlinx.serialization`. Son inmutables por defecto y se usan tanto para deserializar respuestas de Supabase como para serializar los cuerpos de las peticiones de inserción y actualización.

---

## Usuario

**Fichero:** `models/Usuario.kt`  
**Tabla Supabase:** `usuarios`

```kotlin
@Serializable
data class Usuario(
    val id: Int,
    val nombre: String,
    val dni: String,
    val contraseniaHash: String,
    val admin: Int,
    val premium: Boolean,
    val email: String? = null,
    val telefono: String? = null,
    val foto: String? = null
)
```

| Campo | Tipo | Nullable | Descripción |
|---|---|---|---|
| `id` | `Int` | No | PK autoincremental |
| `nombre` | `String` | No | Nombre completo |
| `dni` | `String` | No | DNI usado como credencial de login |
| `contraseniaHash` | `String` | No | Contraseña (texto plano en esta versión) |
| `admin` | `Int` | No | 0 = usuario, 1 = administrador |
| `premium` | `Boolean` | No | Estado de suscripción |
| `email` | `String?` | Sí | Correo electrónico |
| `telefono` | `String?` | Sí | Teléfono de contacto |
| `foto` | `String?` | Sí | Imagen de perfil en Base64 |

---

## Maquina

**Fichero:** `models/Maquina.kt`  
**Tabla Supabase:** `maquinas`

```kotlin
@Serializable
data class Maquina(
    val id: Int,
    val nombre: String,
    val tipo: String? = null,
    val estado: Int = 0,
    val descripcion: String? = null,
    val operativa: Boolean = true,
    val mantenimiento_desde: String? = null,
    val mantenimiento_hasta: String? = null
)
```

| Campo | Tipo | Nullable | Descripción |
|---|---|---|---|
| `id` | `Int` | No | PK autoincremental |
| `nombre` | `String` | No | Nombre de la máquina |
| `tipo` | `String?` | Sí | Categoría de ejercicio |
| `estado` | `Int` | No | Campo de estado genérico (valor por defecto 0) |
| `descripcion` | `String?` | Sí | Descripción detallada |
| `operativa` | `Boolean` | No | `true` = disponible para reservas |
| `mantenimiento_desde` | `String?` | Sí | Inicio del periodo de mantenimiento (`yyyy-MM-dd HH:mm`) |
| `mantenimiento_hasta` | `String?` | Sí | Fin del periodo de mantenimiento (`yyyy-MM-dd HH:mm`) |

---

## Reserva

**Fichero:** `models/Reserva.kt`  
**Tabla Supabase:** `reservas`

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

| Campo | Tipo | Nullable | Descripción |
|---|---|---|---|
| `id` | `Int?` | Sí | PK (null al insertar, Supabase lo asigna) |
| `idUsuario` | `Int` | No | FK → usuarios.id |
| `idMaquina` | `Int` | No | FK → maquinas.id |
| `fecha` | `String` | No | Fecha de la reserva (`yyyy-MM-dd`) |
| `horaInicio` | `String` | No | Hora de inicio (`HH:mm`) |
| `horaFin` | `String` | No | Hora de fin (`HH:mm`) |
| `estado` | `Boolean` | No | `true` = activa, `false` = cancelada |

## ReservaConDetalles

Data class extendida para consultas con relaciones embebidas (JOIN implícito de PostgREST).

```kotlin
@Serializable
data class ReservaConDetalles(
    val id: Int,
    val fecha: String,
    @SerialName("hora_inicio") val horaInicio: String,
    @SerialName("hora_fin") val horaFin: String,
    val estado: Boolean,
    @SerialName("usuarios") val usuario: Usuario? = null,
    @SerialName("maquinas") val maquina: Maquina? = null
)
```

Se obtiene con la columna `"*, usuarios(*), maquinas(*)"`.

---

## Plato

**Fichero:** `models/Plato.kt`  
**Tabla Supabase:** `platos`

```kotlin
@Serializable
data class Plato(
    val id: Int? = null,
    @SerialName("id_usuario") val idUsuario: Int? = null,
    val nombre: String,
    val descripcion: String? = null,
    val calorias: Double? = null,
    @SerialName("imagen_url") val imagenUrl: String? = null,
    @SerialName("fecha_subida") val fechaSubida: String? = null,
    val visibilidad: Boolean = true,
    val tiempo: String? = null,
    val aceptado: Boolean = false
)
```

| Campo | Tipo | Nullable | Descripción |
|---|---|---|---|
| `id` | `Int?` | Sí | PK (null al insertar) |
| `idUsuario` | `Int?` | Sí | FK → usuarios.id (null para platos del sistema) |
| `nombre` | `String` | No | Nombre del plato |
| `descripcion` | `String?` | Sí | Receta o descripción |
| `calorias` | `Double?` | Sí | Calorías por ración |
| `imagenUrl` | `String?` | Sí | URL o cadena Base64 de la imagen |
| `fechaSubida` | `String?` | Sí | Timestamp de creación |
| `visibilidad` | `Boolean` | No | `true` = visible en el catálogo |
| `tiempo` | `String?` | Sí | Tiempo de preparación (texto libre) |
| `aceptado` | `Boolean` | No | `false` = pendiente de moderación |

---

## PesoUsuario

**Fichero:** `models/PesoUsuario.kt`  
**Tabla Supabase:** `peso_usuario`

```kotlin
@Serializable
data class PesoUsuario(
    val id: Int? = null,
    @SerialName("id_usuario") val idUsuario: Int,
    val peso: Double,
    val fecha: String
)
```

| Campo | Tipo | Nullable | Descripción |
|---|---|---|---|
| `id` | `Int?` | Sí | PK (null al insertar) |
| `idUsuario` | `Int` | No | FK → usuarios.id |
| `peso` | `Double` | No | Peso en kilogramos |
| `fecha` | `String` | No | Fecha del registro (`yyyy-MM-dd`) |

---

## Pago

**Fichero:** `models/Pago.kt`  
**Tabla Supabase:** `pagos`

```kotlin
@Serializable
data class Pago(
    val id: Int? = null,
    @SerialName("id_usuario") val idUsuario: Int,
    val monto: Double,
    @SerialName("fecha_pago") val fechaPago: String,
    val tipo: String,
    @SerialName("metodo_pago") val metodoPago: String
)
```

| Campo | Tipo | Nullable | Descripción |
|---|---|---|---|
| `id` | `Int?` | Sí | PK (null al insertar) |
| `idUsuario` | `Int` | No | FK → usuarios.id |
| `monto` | `Double` | No | Importe en euros |
| `fechaPago` | `String` | No | Fecha del pago (`yyyy-MM-dd`) |
| `tipo` | `String` | No | Modalidad: Mensual, Semestral, Anual |
| `metodoPago` | `String` | No | Método: Tarjeta, Bizum |
