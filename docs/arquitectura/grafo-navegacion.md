---
title: Grafo de navegacion
sidebar_position: 2
---

# Grafo de navegacion

El grafo de navegación se declara de forma centralizada en `MainActivity.kt` mediante un `NavHost`. El destino de inicio es siempre `splash`.

## Rutas definidas

| Ruta | Composable | Argumentos | Accesible desde |
|---|---|---|---|
| `splash` | `SplashVideoScreen` | ninguno | Inicio de la app |
| `main` | `MainScreen` | ninguno | `splash` (al completar el vídeo) |
| `login` | `LoginScreen` | ninguno | `main` |
| `register` | `RegisterScreen` | ninguno | `login` |
| `forgot` | `ForgotPasswordScreen` | ninguno | `login` |
| `profile/{nombre}/{isAdmin}/{idUsuario}/{isPremium}` | `ProfileScreen` | `String`, `Int`, `Int`, `Int` | `login` (al completar login) |
| `edit_profile/{idUsuario}` | `EditProfileScreen` | `Int` | `profile` |
| `historial/{idUsuario}` | `HistorialScreen` | `Int` | `edit_profile` |
| `premium_selection/{idUsuario}` | `PremiumSelectionScreen` | `Int` | `edit_profile` |
| `maquinas/{isAdmin}/{idUsuario}` | `MaquinasScreen` | `Int`, `Int` | `profile` |
| `reservas/{isAdmin}/{idUsuario}` | `ReservasScreen` | `Int`, `Int` | `profile` |
| `platos/{isAdmin}/{idUsuario}` | `PlatosScreen` | `Int`, `Int` | `profile` |
| `registro/{idUsuario}` | `RegistroScreen` | `Int` | `profile` |

## Flujo de navegacion principal

```
[splash]
    |
    v (onVideoFinished, popUpTo splash inclusive)
[main]
    |
    v (onNavigateToLogin)
[login]
    |---> [register] (onNavigateToRegister)
    |---> [forgot]   (onNavigateToForgot)
    |
    v (onLoginSuccess: nombre, isAdmin, idUsuario, isPremium)
[profile/{nombre}/{isAdmin}/{idUsuario}/{isPremium}]
    |---> [maquinas/{isAdmin}/{idUsuario}]   (onNavigateToMaquinas)
    |---> [platos/{isAdmin}/{idUsuario}]     (onNavigateToPlatos)
    |---> [registro/{idUsuario}]             (onNavigateToRegistro)
    |---> [reservas/{isAdmin}/{idUsuario}]   (onNavigateToReservas)
    |---> [edit_profile/{idUsuario}]         (onNavigateToEditProfile)
    |---> [main] popUpTo(0)                  (onLogout)
         |
         v (edit_profile)
    [edit_profile/{idUsuario}]
         |---> [historial/{idUsuario}]       (onNavigateToHistorial)
         |---> [premium_selection/{idUsuario}] (onNavigateToPremium)
```

## Gestion del back stack

El destino `splash` se elimina del back stack al navegar hacia `main` mediante `popUpTo("splash") { inclusive = true }`, evitando que el usuario pueda volver a la pantalla de vídeo con el botón Atrás.

Al hacer logout desde `ProfileScreen`, se ejecuta `popUpTo(0)` para limpiar completamente el back stack antes de navegar a `main`, lo que impide el acceso a pantallas protegidas mediante el botón Atrás del sistema.

## Paso de booleanos como enteros

Navigation Compose 2.7.7 no soporta `Boolean` como tipo de argumento de navegación. Por ello, los campos `isAdmin` e `isPremium` se transportan como `Int` (0 o 1) y se convierten mediante comparación al recuperarlos del `Bundle`:

```kotlin
val isAdmin = backStackEntry.arguments?.getInt("isAdmin") == 1
val isPremium = backStackEntry.arguments?.getInt("isPremium") == 1
```

Al navegar, la conversión inversa se realiza con el operador ternario:

```kotlin
navController.navigate("maquinas/${if(admin) 1 else 0}/$id")
```
