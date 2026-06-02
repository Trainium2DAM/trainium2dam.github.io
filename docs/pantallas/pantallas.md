---
title: Pantallas
sidebar_position: 1
---

# Pantallas

Este apartado describe cada composable de nivel de pantalla, sus responsabilidades, los parámetros que recibe y los efectos secundarios que produce.

---

## SplashVideoScreen

**Fichero:** `SplashVideoScreen.kt`  
**Ruta:** `splash`

Muestra una pantalla de bienvenida con reproducción de vídeo introductorio. El vídeo se carga desde `res/raw/video_app.mp4` mediante `VideoView` integrado en Compose con `AndroidView`.

**Comportamiento:**
- Aparece con un fade-in de 500 ms al inicio.
- Tras 2 segundos, aparece el indicador de progreso y el branding en la zona inferior.
- Navega automáticamente a `main` al completarse el vídeo (`OnCompletionListener`) o tras un timeout de 13 segundos si el vídeo no termina.
- El fondo es blanco fijo independientemente del tema del sistema.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `onVideoFinished` | `() -> Unit` | Callback invocado al finalizar el vídeo |

---

## MainScreen

**Fichero:** `MainScreen.kt`  
**Ruta:** `main`

Pantalla de bienvenida para usuarios no autenticados. Muestra el logotipo de Trainium, el eslogan y un botón de acceso al login. Incluye el selector de tema en la esquina superior derecha.

**Animaciones:** logo con scale + alpha, título con alpha, botón con alpha + offset vertical. Todos los elementos se animan secuencialmente con `LaunchedEffect`.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onToggleTheme` | `() -> Unit` | Alterna entre tema claro y oscuro |
| `onNavigateToLogin` | `() -> Unit` | Navega a la pantalla de login |

---

## LoginScreen

**Fichero:** `LoginScreen.kt`  
**Ruta:** `login`

Gestiona la autenticación de usuarios existentes mediante DNI y contraseña. Realiza una consulta a la tabla `usuarios` de Supabase filtrando por `dni` y verificando la contraseña en texto plano.

**Flujo de autenticación:**
1. El usuario introduce su DNI y contraseña.
2. Se consulta Supabase: `from("usuarios").select { filter { eq("dni", dni) } }`.
3. Si se encuentra un registro y la contraseña coincide, se invoca `onLoginSuccess` con el nombre, el flag de admin, el id y el flag de premium del usuario.
4. Si las credenciales son incorrectas, se muestra un `Toast` de error.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onBack` | `() -> Unit` | Regresa a `MainScreen` |
| `onNavigateToRegister` | `() -> Unit` | Navega al registro |
| `onNavigateToForgot` | `() -> Unit` | Navega a la recuperación de contraseña |
| `onLoginSuccess` | `(String, Int, Int, Int) -> Unit` | Callback con (nombre, isAdmin, idUsuario, isPremium) |

---

## RegisterScreen

**Fichero:** `RegisterScreen.kt`  
**Ruta:** `register`

Formulario de alta de nuevos usuarios. Recoge nombre, DNI, email, contraseña y teléfono, y crea un nuevo registro en la tabla `usuarios` de Supabase.

**Validaciones implementadas:**
- Todos los campos obligatorios deben estar rellenos (validación básica de cadena no vacía).
- El nuevo usuario se inserta con `admin = 0` y `premium = false` por defecto.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onBack` | `() -> Unit` | Regresa a `LoginScreen` |

---

## ForgotPasswordScreen

**Fichero:** `ForgotPasswordScreen.kt`  
**Ruta:** `forgot`

Flujo de recuperación de contraseña en dos pasos:

**Paso 1:** El usuario introduce su DNI y email. Se consulta Supabase para verificar que existe un usuario con ese par de credenciales. Si es correcto, se avanza al paso 2.

**Paso 2:** El usuario introduce la nueva contraseña y su confirmación. Si coinciden, se actualiza el campo `contraseniaHash` en Supabase mediante un `update`.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onBack` | `() -> Unit` | Regresa a `LoginScreen` |

---

## ProfileScreen

**Fichero:** `ProfileScreen.kt`  
**Ruta:** `profile/{nombre}/{isAdmin}/{idUsuario}/{isPremium}`

Hub principal de la aplicación tras el login. Muestra el avatar del usuario, su nombre, su badge de Premium/Admin y los botones de acceso a cada sección.

**Funcionalidad adicional al cargar:**
- Recupera los datos actualizados del usuario desde Supabase para mostrar la foto de perfil.
- Comprueba si existe alguna reserva cancelada automáticamente por mantenimiento de maquinaria para la fecha actual. Si es así, muestra un `AlertDialog` informativo **una única vez por sesión** (controlado por la variable global `avisoMantenimientoMostradoEnSesion`).

**Botones de navegacion disponibles:**

| Botón | Disponible para | Destino |
|---|---|---|
| Máquinas | Todos | `maquinas/{isAdmin}/{idUsuario}` |
| Mis Reservas | Todos | `reservas/{isAdmin}/{idUsuario}` |
| Platos | Todos | `platos/{isAdmin}/{idUsuario}` |
| Registro de peso | Todos | `registro/{idUsuario}` |
| Mi Perfil | Todos | `edit_profile/{idUsuario}` |
| Cerrar sesión | Todos | `main` (popUpTo 0) |

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `nombre` | `String` | Nombre del usuario autenticado |
| `isAdmin` | `Boolean` | Rol de administrador |
| `idUsuario` | `Int` | ID del usuario en la base de datos |
| `isPremium` | `Boolean` | Estado de suscripción Premium |
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onToggleTheme` | `() -> Unit` | Alterna entre tema claro y oscuro |
| `onLogout` | `() -> Unit` | Callback de cierre de sesión |
| `onNavigateToMaquinas` | `(Boolean, Int) -> Unit` | Navega al catálogo de máquinas |
| `onNavigateToPlatos` | `(Boolean, Int) -> Unit` | Navega al catálogo de platos |
| `onNavigateToRegistro` | `(Int) -> Unit` | Navega al registro de peso |
| `onNavigateToReservas` | `(Boolean, Int) -> Unit` | Navega a las reservas |
| `onNavigateToEditProfile` | `(Int) -> Unit` | Navega a la edición de perfil |

---

## EditProfileScreen

**Fichero:** `EditProfileScreen.kt`  
**Ruta:** `edit_profile/{idUsuario}`

Permite al usuario modificar su nombre, email, teléfono, contraseña y foto de perfil. La foto se selecciona de la galería del dispositivo mediante `ActivityResultContracts.GetContent()` y se convierte a Base64 mediante `ImageUtils.uriToBase64`.

Al guardar, se ejecuta un `update` en Supabase sobre el registro del usuario.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `idUsuario` | `Int` | ID del usuario a editar |
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onBack` | `() -> Unit` | Regresa a `ProfileScreen` |
| `onNavigateToHistorial` | `(Int) -> Unit` | Navega al historial de pagos |
| `onNavigateToPremium` | `() -> Unit` | Navega a la selección de plan Premium |

---

## MaquinasScreen

**Fichero:** `MaquinasScreen.kt`  
**Ruta:** `maquinas/{isAdmin}/{idUsuario}`

Catálogo de maquinaria del gimnasio con funcionalidad de reserva para usuarios estándar y gestión de mantenimiento para administradores.

La documentación detallada de esta pantalla se encuentra en la sección [Funcionalidades - Maquinas y reservas](/docs/funcionalidades/maquinas-reservas).

---

## ReservasScreen

**Fichero:** `ReservasScreen.kt`  
**Ruta:** `reservas/{isAdmin}/{idUsuario}`

Listado de reservas con sistema de filtrado. La documentación detallada se encuentra en [Funcionalidades - Maquinas y reservas](/docs/funcionalidades/maquinas-reservas).

---

## PlatosScreen

**Fichero:** `PlatosScreen.kt`  
**Ruta:** `platos/{isAdmin}/{idUsuario}`

Catálogo de platos nutricionales. La documentación detallada se encuentra en [Funcionalidades - Platos y nutricion](/docs/funcionalidades/platos-nutricion).

---

## RegistroScreen

**Fichero:** `RegistroScreen.kt`  
**Ruta:** `registro/{idUsuario}`

Control de peso corporal con gráfico de evolución. La documentación detallada se encuentra en [Funcionalidades - Registro de peso](/docs/funcionalidades/registro-peso).

---

## HistorialScreen

**Fichero:** `HistorialScreen.kt`  
**Ruta:** `historial/{idUsuario}`

Muestra el historial de pagos del usuario ordenados por fecha descendente. Los pagos se cargan desde la tabla `pagos` de Supabase filtrando por `id_usuario`.

Cada item de la lista muestra el concepto (tipo de plan), el método de pago, el importe y la fecha. En caso de error de conectividad se muestra un mensaje de error con botón de reintento.

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `idUsuario` | `Int` | ID del usuario cuyo historial se consulta |
| `isDarkTheme` | `Boolean` | Controla el tema visual activo |
| `onBack` | `() -> Unit` | Regresa a `EditProfileScreen` |

---

## PremiumSelectionScreen

**Fichero:** `PremiumSelectionScreen.kt`  
**Ruta:** `premium_selection/{idUsuario}`

Pantalla de contratación de suscripción Premium. La documentación detallada se encuentra en [Funcionalidades - Suscripcion Premium](/docs/funcionalidades/suscripcion-premium).
