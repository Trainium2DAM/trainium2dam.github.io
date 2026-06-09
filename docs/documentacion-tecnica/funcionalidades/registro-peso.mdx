---
title: Registro de peso
sidebar_position: 3
---

# Registro de peso

## RegistroScreen

Permite al usuario registrar su peso corporal diario y visualizar la evolución temporal mediante un gráfico de líneas dibujado con la API de `Canvas` de Compose.

### Carga de datos

Al inicializar la pantalla se consulta la tabla `peso_usuario` de Supabase filtrando por `id_usuario` y ordenando los resultados de forma ascendente por fecha. Los registros se almacenan en el estado `registros: List<PesoUsuario>`.

### Restriccion de un registro por dia

La pantalla comprueba si ya existe un registro para la fecha actual (`fechaHoy`) antes de mostrar el campo de entrada. La variable `yaExisteHoy` se calcula comparando la fecha de cada registro con la fecha del sistema:

```kotlin
val fechaHoy = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
val yaExisteHoy = registros.any { it.fecha == fechaHoy }
```

Si ya existe un registro para hoy, el campo de entrada se oculta y se muestra un mensaje informativo. Esta restricción es exclusivamente a nivel de UI, no existe una restricción `UNIQUE` en la base de datos para esta combinación de columnas.

### Insercion de un nuevo registro

El usuario introduce el peso en el campo de texto (acepta valores decimales) y pulsa el botón de confirmar. Se ejecuta un `insert` en Supabase con el `id_usuario`, el valor de peso y la fecha actual.

### Edicion de un registro existente

Cada fila del listado incluye un botón de edición que activa el modo de edición en línea (`editandoId`). Al confirmar, se ejecuta un `update` en Supabase sobre el registro identificado por su `id`.

### Eliminacion de un registro

El botón de borrado de cada fila ejecuta un `delete` en Supabase filtrando por `id` del registro.

### Grafico de evolucion

El gráfico se dibuja con `Canvas` de Jetpack Compose. La implementación normaliza los valores de peso al rango `[0, 1]` relativo al mínimo y máximo del historial, los mapea a coordenadas de píxel en el canvas y los une con líneas mediante `drawPath`. Cada punto se representa con un círculo relleno.

El eje horizontal representa el tiempo (las entradas están ordenadas cronológicamente) y el eje vertical el peso en kilogramos. Los valores mínimo y máximo se muestran como etiquetas de texto en los extremos del eje.

Si el historial contiene menos de dos puntos, el gráfico no se renderiza (se necesitan al menos dos puntos para dibujar una línea).
