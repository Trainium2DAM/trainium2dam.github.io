---
title: Componentes y patrones de UI
sidebar_position: 2
---

# Componentes y patrones de UI

Este apartado documenta los patrones de componentes que se repiten a lo largo de la interfaz de usuario. No existe una biblioteca de componentes compartidos formalizada en el proyecto; los patrones se replican entre pantallas de forma consistente.

## Patron de tarjeta de elemento de lista

Las listas de máquinas, reservas y platos pendientes siguen el mismo patrón de tarjeta:

```
Card (RoundedCornerShape 16 dp, elevation, cardBg)
  └── Row (padding 16 dp, verticalAlignment Center)
        ├── Image/Icon (60-80 dp)
        ├── Column (weight 1f)
        │     ├── Text nombre (titleMedium, fontWeight Bold)
        │     └── Text subtítulo (bodyMedium, alpha 0.5)
        └── Botones de acción (IconButton)
```

El color de fondo `cardBg` se adapta al tema activo: `Color(0xFF162347).copy(0.9f)` en oscuro y `Color.White` en claro.

## Patron de campo de texto (OutlinedTextField)

Todos los formularios usan `OutlinedTextField` con el esquema de colores personalizado:

```kotlin
val inputColors = OutlinedTextFieldDefaults.colors(
    focusedBorderColor = BlueAccent,
    unfocusedBorderColor = if (isDarkTheme) Color.White.copy(0.15f) else BlueDark.copy(0.15f),
    focusedLabelColor = BlueAccent,
    unfocusedLabelColor = if (isDarkTheme) Color.White.copy(0.4f) else BlueDark.copy(0.4f),
    cursorColor = BlueAccent,
    focusedTextColor = textColor,
    unfocusedTextColor = textColor.copy(0.9f)
)
```

El borde activo es siempre `BlueAccent` (#2196F3) independientemente del tema.

## Boton de accion primaria (CTA)

Los botones de acción principal utilizan un gradiente horizontal en lugar del color plano de Material 3:

```kotlin
Button(
    onClick = accion,
    modifier = Modifier.fillMaxWidth().height(56.dp),
    colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
    contentPadding = PaddingValues()
) {
    Box(
        Modifier
            .fillMaxSize()
            .background(
                Brush.horizontalGradient(listOf(BlueAccent, BlueElectric)),
                RoundedCornerShape(16.dp)
            ),
        contentAlignment = Alignment.Center
    ) {
        Text(
            "CONFIRMAR",
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 2.sp,
            color = Color.White
        )
    }
}
```

## Boton de retroceso

El retroceso se implementa con `TextButton` en lugar de un `IconButton` con flecha, para mayor área táctil:

```kotlin
TextButton(onClick = onBack) {
    Text("← Volver", color = BlueAccent, fontWeight = FontWeight.Bold)
}
```

## Selector de tema (toggle)

El toggle de tema aparece en `MainScreen` y `ProfileScreen` como un `IconButton` alineado a la esquina superior derecha, con `statusBarsPadding()` para respetar la barra de estado del sistema:

```kotlin
IconButton(
    onClick = onToggleTheme,
    modifier = Modifier.align(Alignment.TopEnd).padding(16.dp).statusBarsPadding()
) {
    Icon(
        if (isDarkTheme) Icons.Default.LightMode else Icons.Default.DarkMode,
        contentDescription = "Cambiar tema",
        tint = if (isDarkTheme) BlueSoft else BlueAccent
    )
}
```

## Avatar de usuario

El avatar de perfil se muestra en `ProfileScreen` y `EditProfileScreen` como un `Box` circular con `clip(CircleShape)`. Si el usuario tiene foto almacenada en Base64, se decodifica con `ImageUtils.decodeBase64ToBitmap` y se renderiza con `Image`. Si no tiene foto, se muestra un icono genérico de persona.

```kotlin
Box(
    modifier = Modifier
        .size(80.dp)
        .clip(CircleShape)
        .background(BlueAccent.copy(0.15f))
        .clickable { /* lanzar galería */ },
    contentAlignment = Alignment.Center
) {
    if (fotoBase64 != null) {
        val bitmap = decodeBase64ToBitmap(fotoBase64!!)
        bitmap?.let {
            Image(
                bitmap = it.asImageBitmap(),
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )
        }
    } else {
        Icon(Icons.Default.Person, null, tint = BlueAccent, modifier = Modifier.size(40.dp))
    }
}
```

## Indicador de estado de maquina

Las tarjetas de máquinas en `MaquinasScreen` muestran un badge de estado coloreado:

| Estado | Color | Texto |
|---|---|---|
| Operativa | Verde (`Color(0xFF4CAF50)`) | Disponible |
| En mantenimiento | Naranja (`Color(0xFFFF9800)`) | Mantenimiento |

El badge es una `Row` con fondo de color redondeado, un icono (`CheckCircle` o `Build`) y texto compacto.

## Chip de filtro (ReservasScreen)

Los filtros de la pantalla de reservas se implementan como `FilterChip` de Material 3:

```kotlin
FilterChip(
    selected = filtroSeleccionado == opcion,
    onClick = { filtroSeleccionado = opcion },
    label = { Text(opcion) }
)
```

La fila de chips se presenta en una `LazyRow` para que sea desplazable horizontalmente si los chips no caben en pantalla.
