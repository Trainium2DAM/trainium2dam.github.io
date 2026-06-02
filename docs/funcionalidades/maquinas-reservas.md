---
title: Maquinas y reservas
sidebar_position: 1
---

# Maquinas y reservas

## MaquinasScreen

`MaquinasScreen` es la pantalla de mayor complejidad de la aplicación. Su comportamiento difiere sustancialmente según el rol del usuario autenticado.

### Modo usuario estandar

El usuario estándar ve la lista completa de máquinas disponibles. Al pulsar sobre una máquina operativa, puede iniciar el proceso de reserva.

**Proceso de reserva:**

1. Se muestra un `DatePickerDialog` (Android View) para seleccionar la fecha.
2. Se muestra un `TimePickerDialog` para seleccionar la hora de inicio. La aplicación calcula automáticamente la hora de fin añadiendo 30 minutos.
3. Antes de confirmar la reserva, se comprueban dos condiciones:
   - Que la máquina no esté ya reservada en ese tramo horario (`reservasDeLaMaquina`).
   - Que el usuario no tenga ya otra reserva en esa misma franja (`reservasDelUsuario`).
4. Si no hay conflicto, se inserta un nuevo registro en la tabla `reservas` de Supabase con `estado = true`.

**Restriccion por estado de mantenimiento:**

Si una máquina tiene `operativa = false`, se muestra un badge de "Mantenimiento" y el botón de reserva queda deshabilitado. La tarjeta muestra las fechas de inicio y fin del periodo de mantenimiento cuando están disponibles.

### Modo administrador

El administrador dispone de funcionalidades adicionales accesibles desde cada tarjeta de máquina:

**Alta de máquina:** Un FAB (`FloatingActionButton`) en la esquina inferior derecha abre un diálogo para introducir el nombre, tipo y descripción de una nueva máquina. El registro se inserta en Supabase con `operativa = true` por defecto.

**Eliminación de máquina:** Cada tarjeta incluye un botón de borrado que ejecuta un `delete` en Supabase filtrando por el `id` de la máquina.

**Activación de mantenimiento:** El botón de llave inglesa abre un formulario con cuatro campos: fecha de inicio, hora de inicio, fecha de fin y hora de fin (mediante `DatePickerDialog` y `TimePickerDialog`). Al confirmar, se ejecuta la siguiente secuencia atómica en Supabase:

1. Se actualiza la máquina: `operativa = false`, `mantenimiento_desde` y `mantenimiento_hasta` con el rango introducido.
2. Se consultan todas las reservas activas (`estado = true`) de esa máquina.
3. Para cada reserva, se comprueba si el tramo `[fecha + hora_inicio, fecha + hora_fin]` se solapa con el rango de mantenimiento.
4. Las reservas solapadas se cancelan automáticamente: `estado = false`.

La detección de solapamiento usa la condición estándar de intervalos: `resInicio < calHasta && resFin > calDesde`.

**Reactivación de máquina:** Un botón de check marca la máquina como operativa de nuevo (`operativa = true`, limpiando los campos de mantenimiento).

---

## ReservasScreen

Lista todas las reservas con un sistema de filtrado por cuatro criterios:

| Filtro | Comportamiento |
|---|---|
| Próximas | Muestra reservas con fecha mayor o igual a hoy y estado activo |
| Hoy | Muestra reservas con fecha igual a la fecha actual |
| Todas | Muestra todas las reservas sin filtro de fecha |
| Fecha | Abre un `DatePickerDialog` para filtrar por una fecha concreta |

Las reservas se cargan desde Supabase con la sintaxis de relaciones embebidas: `*, usuarios(*), maquinas(*)`. Esto permite mostrar el nombre del usuario y de la máquina directamente sin consultas adicionales.

**Vista del administrador:** El administrador ve las reservas de todos los usuarios. Cada fila muestra el nombre del usuario además del nombre de la máquina. También puede cancelar cualquier reserva activa pulsando el botón de borrado, lo que ejecuta un `delete` en Supabase.

**Vista del usuario:** El usuario ve únicamente sus propias reservas. Puede cancelar una reserva activa, lo que también ejecuta un `delete`.

Las reservas se ordenan por fecha ascendente y luego por hora de inicio, de modo que las más próximas aparecen primero.
