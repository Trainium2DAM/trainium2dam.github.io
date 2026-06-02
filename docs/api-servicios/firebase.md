---
title: Firebase Auth y Data Connect
sidebar_position: 2
---

# Firebase Auth y Data Connect

## Firebase Authentication

El SDK de Firebase Auth está declarado como dependencia (`libs.firebase.auth`) e incluido en la BOM de Firebase. Sin embargo, en la versión actual de la aplicación, el flujo de autenticación principal no delega en Firebase Auth: el login se implementa mediante una consulta directa a la tabla `usuarios` de Supabase comparando el DNI y la contraseña.

Firebase Auth queda disponible para una eventual migración del sistema de autenticación a un flujo basado en JWT estándar (email/contraseña, OAuth, etc.) sin necesidad de añadir dependencias adicionales.

## DataConnectClient

`DataConnectClient.kt` implementa un cliente HTTP manual para invocar el endpoint de Firebase Data Connect. A diferencia del SDK de Supabase, no existe un SDK de Kotlin para Data Connect que esté disponible en este contexto, por lo que se usa `HttpURLConnection` directamente.

### Configuracion del endpoint

```kotlin
object DataConnectClient {
    private const val API_KEY = "AIzaSy..."
    private const val APP_ID = "1:689673187580:android:..."
    private const val ENDPOINT = 
        "https://europe-southwest1-dataconnect.googleapis.com/v1beta/projects/bbdd-practicas" +
        "/locations/europe-southwest1/services/bbdd-practicas-service/connectors/default:executeGraphql"
}
```

El subdominio regional `europe-southwest1-dataconnect.googleapis.com` es obligatorio. El uso del dominio genérico `dataconnect.googleapis.com` devuelve HTTP 404 cuando el servicio está desplegado en una región distinta a `us-central1`.

### Firma del metodo execute

```kotlin
suspend fun execute(
    query: String,
    variables: Map<String, Any?> = emptyMap(),
    operationName: String? = null
): JSONObject?
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `query` | `String` | Query o mutación GraphQL en formato de cadena |
| `variables` | `Map<String, Any?>` | Variables de la operación GraphQL (opcional) |
| `operationName` | `String?` | Nombre de la operación cuando el documento contiene múltiples (opcional) |

**Valor de retorno:** `JSONObject` con la respuesta completa de la API (incluyendo el objeto `data`) o `null` si se produjo un error de red o la respuesta HTTP fue no exitosa (código fuera del rango 200–299).

### Cabeceras HTTP enviadas

| Cabecera | Valor |
|---|---|
| `Content-Type` | `application/json` |
| `x-goog-api-key` | API key del proyecto Firebase |
| `x-firebase-gmpid` | App ID del proyecto Firebase |

### Estructura del cuerpo de la peticion

```json
{
  "query": "query GetUsuarios { usuarios { id nombre } }",
  "variables": {
    "id": 42
  },
  "operationName": "GetUsuarios"
}
```

Los campos `variables` y `operationName` se omiten del cuerpo si no se proporcionan.

### Gestion de errores

Los errores de red (`IOException`, `SocketTimeoutException`, etc.) se capturan con un bloque `catch(Exception)` y se loguean con `Log.e("DataConnect", ...)`. En ese caso el método devuelve `null`. Los errores HTTP (respuesta con código fuera del rango 200–299) se leen del `errorStream` de la conexión y también se loguean antes de devolver `null`.
