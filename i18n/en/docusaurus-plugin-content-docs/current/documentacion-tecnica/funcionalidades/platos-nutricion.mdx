---
title: Platos y nutricion
sidebar_position: 2
---

# Platos y nutricion

## PlatosScreen

El catálogo nutricional muestra los platos aprobados en un formato de tarjeta única con navegación secuencial, similar a un carrusel lineal. El usuario ve un plato a la vez y puede avanzar o retroceder entre ellos.

### Carga de datos

Al inicializar la pantalla se realizan dos consultas a Supabase en paralelo:

**Platos aceptados:** `from("platos").select { filter { eq("visibilidad", true); eq("aceptado", true) } }`. Solo se muestran en el carrusel los platos que han sido aprobados por un administrador y tienen visibilidad activada.

**Sugerencias pendientes (solo administrador):** `from("platos").select { filter { eq("aceptado", false) } }`. Los platos pendientes de moderación solo son visibles para los administradores.

### Visualizacion del plato

Cada tarjeta muestra:
- Imagen del plato (si `imagen_url` contiene un string Base64, se decodifica a `Bitmap` mediante `ImageUtils.decodeBase64ToBitmap`).
- Nombre del plato.
- Calorías.
- Tiempo de preparación.
- Descripción o receta.

### Sugerencia de platos por el usuario

Cualquier usuario puede sugerir un nuevo plato mediante el botón de sugerencia, que abre un diálogo modal con los siguientes campos:
- Título (nombre del plato)
- Receta o descripción
- Tiempo de preparación
- Calorías
- Foto (seleccionada de la galería mediante `ActivityResultContracts.GetContent()`, convertida a Base64)

El plato se inserta en Supabase con `aceptado = false` y `visibilidad = true`. Quedará pendiente de revisión por un administrador.

### Moderacion por administrador

El administrador ve en una sección separada la lista de platos pendientes de aprobación (`aceptado = false`). Para cada plato puede:
- **Aceptar:** Ejecuta `update { set("aceptado", true) }` en Supabase. El plato pasa a ser visible en el carrusel.
- **Rechazar:** Ejecuta `delete` en Supabase. El plato se elimina permanentemente.

Desde el carrusel de platos aceptados, el administrador también puede eliminar cualquier plato ya publicado.
