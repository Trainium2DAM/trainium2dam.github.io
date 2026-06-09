---
title: Sistema diseño
sidebar_position: 1
---

# Sistema de diseño

## Paleta de colores

La paleta de Trainium está definida en `ui/theme/Color.kt`. Sigue una estética oscura y monocromática con azul eléctrico como color de acento.

### Tonos base (independientes del tema)

| Token | Valor HEX | Uso principal |
|---|---|---|
| `BlueDark` | `#0B1426` | Fondo del tema oscuro |
| `BlueMid` | `#121F3D` | Superficie del tema oscuro |
| `BlueDeep` | `#162347` | Superficie variante del tema oscuro |
| `BlueAccent` | `#2196F3` | Color primario de acciones (botones, bordes activos) |
| `BlueElectric` | `#448AFF` | Gradiente de botones CTA |
| `BlueSoft` | `#64B5F6` | Textos secundarios y subtítulos en tema oscuro |
| `BlueGlow` | `#332196F3` | Efectos de brillo y sombras con transparencia |
| `BlueLight` | `#BBDEFB` | Fondos suaves en tema claro |
| `WhiteSoft` | `#F0F4FF` | Fondo del tema claro |

### Esquema de colores del tema oscuro

| Rol Material 3 | Token | Valor HEX |
|---|---|---|
| `primary` | `DarkPrimary` | `#448AFF` |
| `onPrimary` | `DarkOnPrimary` | `#001E5F` |
| `primaryContainer` | `DarkPrimaryContainer` | `#1A3A6E` |
| `background` | `DarkBackground` | `#0B1426` |
| `surface` | `DarkSurface` | `#121F3D` |
| `surfaceVariant` | `DarkSurfaceVariant` | `#1A2D54` |
| `error` | `DarkError` | `#FF6B6B` |

### Esquema de colores del tema claro

| Rol Material 3 | Token | Valor HEX |
|---|---|---|
| `primary` | `LightPrimary` | `#1565C0` |
| `onPrimary` | `LightOnPrimary` | `#FFFFFF` |
| `primaryContainer` | `LightPrimaryContainer` | `#D0E4FF` |
| `background` | `LightBackground` | `#F0F4FF` |
| `surface` | `LightSurface` | `#FFFFFF` |
| `surfaceVariant` | `LightSurfaceVariant` | `#E3ECFA` |
| `error` | `LightError` | `#D32F2F` |

## Tipografia

La escala tipográfica está definida en `ui/theme/Type.kt` y utiliza `FontFamily.SansSerif` (la fuente sans-serif por defecto del sistema Android, normalmente Roboto) para todos los niveles.

| Nivel | Weight | Tamaño | Interletraje |
|---|---|---|---|
| `displayLarge` | Black (900) | 34 sp | -0.25 sp |
| `headlineLarge` | Bold (700) | 28 sp | 0 sp |
| `headlineMedium` | Bold (700) | 24 sp | 0 sp |
| `titleLarge` | SemiBold (600) | 20 sp | 0.15 sp |
| `titleMedium` | SemiBold (600) | 16 sp | 0.15 sp |
| `bodyLarge` | Normal (400) | 16 sp | 0.5 sp |
| `bodyMedium` | Normal (400) | 14 sp | 0.25 sp |
| `labelLarge` | Bold (700) | 14 sp | 1.2 sp |
| `labelMedium` | Medium (500) | 12 sp | 0.5 sp |
| `labelSmall` | Medium (500) | 11 sp | 0.5 sp |

El `labelLarge` con `letterSpacing = 1.2 sp` se usa en los botones CTA (como "COMENZAR AHORA", "CONTINUAR") para dar el efecto de texto expandido característico de la interfaz.

## Formas (Shapes)

El sistema de formas personalizado `PremiumShapes` reemplaza el esquema de esquinas por defecto de Material 3:

| Nivel | Radio de esquina |
|---|---|
| `small` | 10 dp |
| `medium` | 16 dp |
| `large` | 22 dp |
| `extraLarge` | 28 dp |

Estos radios más generosos que los valores por defecto de Material 3 contribuyen al aspecto premium redondeado de tarjetas y botones.

## Gestion del tema

El tema se gestiona en dos capas:

**MaterialTheme (`ui/theme/Theme.kt`):** Define el `Trainium2Theme` composable que aplica el `ColorScheme`, la `Typography` y las `Shapes` según el parámetro `darkTheme`.

**ThemeManager (`ThemeManager.kt`):** Persiste la preferencia del usuario en DataStore. La preferencia se lee como un `Flow<Boolean?>` y se colecciona en `MainActivity.kt` con `collectAsState(initial = null)`. El valor inicial `null` significa que la preferencia aún no se ha leído del disco; en ese caso, se usa el tema del sistema (`isSystemInDarkTheme()`).

```kotlin
val savedDarkMode by themeManager.isDarkMode.collectAsState(initial = null)
val systemTheme = isSystemInDarkTheme()
var isDarkTheme by remember(savedDarkMode) {
    mutableStateOf(savedDarkMode ?: systemTheme)
}
```

## Gradientes de fondo

Todas las pantallas utilizan gradientes verticales en lugar de fondos planos. El gradiente varía según el tema activo:

**Tema oscuro:**
```kotlin
Brush.verticalGradient(listOf(BlueDark, BlueMid, BlueDeep))
// #0B1426 → #121F3D → #162347
```

**Tema claro:**
```kotlin
Brush.verticalGradient(listOf(Color(0xFFF0F4FF), Color(0xFFE3ECFF), Color(0xFFD6E4FF)))
```

## Animaciones de entrada

Todas las pantallas implementan animaciones de entrada escalonadas mediante `LaunchedEffect(Unit)` + `animateFloatAsState`. El patrón estándar es:

```kotlin
var elementoVisible by remember { mutableStateOf(false) }
val alpha by animateFloatAsState(
    targetValue = if (elementoVisible) 1f else 0f,
    animationSpec = tween(durationMillis = 500),
    label = "elemento_alpha"
)

LaunchedEffect(Unit) {
    delay(100)
    elementoVisible = true
}
```

Los elementos se revelan secuencialmente con retardos de 100–300 ms entre cada uno, creando un efecto de aparición en cascada.
