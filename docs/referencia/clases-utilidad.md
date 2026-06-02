---
title: Clases de utilidad
sidebar_position: 2
---

# Clases de utilidad

## ImageUtils

**Fichero:** `ImageUtils.kt`

Contiene dos funciones de conversión entre formatos de imagen. Se usa para el almacenamiento de imágenes de perfil y fotografías de platos en Supabase.

### uriToBase64

Convierte una URI de imagen seleccionada de la galería del dispositivo a una cadena Base64 comprimida en formato JPEG.

```kotlin
fun uriToBase64(uri: Uri, contentResolver: ContentResolver): String?
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `uri` | `Uri` | URI de la imagen seleccionada por el usuario |
| `contentResolver` | `ContentResolver` | Resolver del contexto para abrir el stream de la imagen |

**Valor de retorno:** Cadena Base64 de la imagen comprimida, o `null` si se produce alguna excepción.

**Proceso interno:**
1. Abre el `InputStream` de la URI mediante `contentResolver.openInputStream(uri)`.
2. Decodifica el stream a un `Bitmap` con `BitmapFactory.decodeStream`.
3. Comprime el bitmap a JPEG con calidad 70 en un `ByteArrayOutputStream`.
4. Codifica el array de bytes resultante a Base64 con `Base64.encodeToString(byteArray, Base64.DEFAULT)`.

La calidad de compresión del 70% reduce significativamente el tamaño del dato almacenado en la base de datos manteniendo una calidad visual aceptable para imágenes de perfil y miniaturas de platos.

### decodeBase64ToBitmap

Convierte una cadena Base64 de vuelta a un objeto `Bitmap`.

```kotlin
fun decodeBase64ToBitmap(base64Str: String): Bitmap?
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `base64Str` | `String` | Cadena Base64 que representa la imagen |

**Valor de retorno:** `Bitmap` decodificado, o `null` si la cadena no es Base64 válida o se produce cualquier otra excepción.

**Uso en la interfaz:**

```kotlin
val bitmap = decodeBase64ToBitmap(fotoBase64!!)
bitmap?.let {
    Image(
        bitmap = it.asImageBitmap(),
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = Modifier.fillMaxSize().clip(CircleShape)
    )
}
```

---

## ThemeManager

**Fichero:** `ThemeManager.kt`

Gestiona la persistencia de la preferencia de tema (claro/oscuro) mediante Jetpack DataStore Preferences.

```kotlin
class ThemeManager(private val context: Context) {
    val isDarkMode: Flow<Boolean?>
    suspend fun setDarkMode(isDark: Boolean)
}
```

La extensión `val Context.dataStore` crea un `DataStore<Preferences>` con el nombre `"settings"` ligado al `Context` de la aplicación.

### isDarkMode

`Flow<Boolean?>` que emite el valor actual de la preferencia. Emite `null` si la clave aún no se ha escrito en el DataStore (primera ejecución de la aplicación). El colector en `MainActivity.kt` trata `null` como "usar el tema del sistema".

### setDarkMode

Función `suspend` que escribe el nuevo valor en el DataStore mediante `dataStore.edit`. Debe llamarse desde una corrutina. En `MainActivity.kt` se llama dentro de un `scope.launch`:

```kotlin
val toggleTheme = {
    val newValue = !isDarkTheme
    isDarkTheme = newValue
    scope.launch { themeManager.setDarkMode(newValue) }
    Unit
}
```

---

## DatabaseAdmin

**Fichero:** `DatabaseAdmin.kt`

Singleton que define una conexión JDBC directa a una base de datos MySQL/MariaDB. Esta clase corresponde al acceso directo a la base de datos local que se usó durante las primeras fases del desarrollo.

```kotlin
object DatabaseAdmin {
    private const val url = "jdbc:mysql://10.0.2.2:3306/prueba?useSSL=false&serverTimezone=UTC"
    private const val user = "admin_tren"
    private const val pass = "admin123"

    fun connection(): Connection?
}
```

La dirección `10.0.2.2` es la IP de loopback del host desde el emulador de Android. **Esta clase no está activa en la versión de producción** de la aplicación; todas las operaciones de datos se realizan a través de `SupabaseClient`. Se conserva en el repositorio como referencia histórica.
