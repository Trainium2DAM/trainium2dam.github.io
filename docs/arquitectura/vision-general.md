---
title: Vision general de la arquitectura
sidebar_position: 1
---

# Vision general de la arquitectura

## Patron arquitectonico

Trainium sigue un patron de arquitectura **monolítica por capa de presentación**, sin separación explícita en capas de dominio ni repositorios. Toda la lógica de negocio y el acceso a datos se ejecuta directamente dentro de los composables mediante corrutinas lanzadas en `rememberCoroutineScope()`. Esta decisión es propia de proyectos de alcance académico donde la velocidad de desarrollo prima sobre la mantenibilidad a largo plazo.

El código fuente de la capa de presentación se organiza de la siguiente forma:

```
com.example.trainium2/
├── MainActivity.kt           # Punto de entrada, NavHost y grafo de navegación
├── SplashVideoScreen.kt      # Pantalla de splash con vídeo
├── MainScreen.kt             # Landing sin autenticar
├── LoginScreen.kt            # Autenticación
├── RegisterScreen.kt         # Alta de usuario
├── ForgotPasswordScreen.kt   # Recuperación de contraseña
├── ProfileScreen.kt          # Hub principal autenticado
├── EditProfileScreen.kt      # Edición de datos de perfil
├── MaquinasScreen.kt         # Catálogo y reserva de maquinaria
├── ReservasScreen.kt         # Listado y gestión de reservas
├── PlatosScreen.kt           # Catálogo nutricional
├── RegistroScreen.kt         # Registro de peso corporal
├── HistorialScreen.kt        # Historial de pagos
├── PremiumSelectionScreen.kt # Selección de plan Premium
├── SupabaseClient.kt         # Singleton del cliente Supabase
├── DataConnectClient.kt      # Cliente HTTP para Firebase Data Connect
├── ThemeManager.kt           # Gestión de tema con DataStore
├── DatabaseAdmin.kt          # Referencia legacy a JDBC (no activo en prod)
├── ImageUtils.kt             # Utilidades de conversión Bitmap ↔ Base64
├── models/                   # Data classes serializables
│   ├── Maquina.kt
│   ├── Reserva.kt
│   ├── Usuario.kt
│   ├── Pago.kt
│   ├── Plato.kt
│   └── PesoUsuario.kt
└── ui/theme/
    ├── Color.kt              # Paleta completa de colores
    ├── Theme.kt              # MaterialTheme con esquemas claro/oscuro
    └── Type.kt               # Escala tipográfica
```

## Backends externos

La aplicación interactúa con dos backends externos de forma simultánea:

**Supabase** actúa como backend principal. Gestiona todas las tablas de datos mediante el protocolo PostgREST. El SDK Kotlin de Supabase mapea automáticamente las respuestas JSON a las data classes mediante `kotlinx.serialization`. La autenticación de Supabase está instalada pero la verificación de credenciales se realiza directamente contra la tabla `usuarios` mediante consulta manual (comparación de contraseña en texto plano), no mediante el flujo de Auth de Supabase.

**Firebase** se utiliza para autenticación y como backend alternativo a través de Data Connect. El módulo `firebase.auth` está declarado como dependencia pero el flujo principal de login no delega en Firebase Auth. `DataConnectClient.kt` implementa un cliente HTTP manual que invoca el endpoint GraphQL de Data Connect para operaciones específicas.

## Gestion del estado

El estado de la UI se gestiona mediante variables de estado de Compose (`mutableStateOf`, `mutableIntStateOf`) declaradas con `remember` dentro de cada composable. No se utiliza ningún `ViewModel`. El estado no sobrevive a rotaciones de pantalla ni a cambios de configuración, lo que es aceptable dado que la aplicación fuerza orientación vertical implícitamente por el diseño.

La única excepción es la preferencia de tema, que se persiste en disco mediante `ThemeManager` (DataStore) y se lee en `MainActivity.kt` como un `Flow<Boolean?>` coleccionado con `collectAsState`.

## Navegacion

La navegación se gestiona con Navigation Compose. El `NavHost` se declara en `MainActivity.kt` y define todas las rutas de la aplicación. Los argumentos de navegación se pasan como parámetros de ruta en forma de segmentos de path (por ejemplo `profile/{nombre}/{isAdmin}/{idUsuario}/{isPremium}`), no como `savedStateHandle`. Este enfoque limita los tipos soportados a `String`, `Int`, `Boolean` (como `Int`) y `Float`.

El diagrama de navegación se detalla en la sección [Grafo de navegacion](/docs/arquitectura/grafo-navegacion).
