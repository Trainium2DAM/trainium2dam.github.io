---
title: Suscripcion Premium
sidebar_position: 4
---

# Suscripcion Premium

## PremiumSelectionScreen

Gestiona el flujo de contratación de suscripción Premium. El proceso se completa en una única pantalla con selección de plan y selección de método de pago.

### Planes disponibles

| Plan | Precio | Duración |
|---|---|---|
| Mensual | 9,99 € | 1 mes |
| Semestral | 49,99 € | 6 meses |
| Anual | 89,99 € | 12 meses |

Los planes se definen como una lista en el propio composable:

```kotlin
val planes = listOf(
    Triple("Mensual", 9.99, 1),
    Triple("Semestral", 49.99, 6),
    Triple("Anual", 89.99, 12)
)
```

### Metodos de pago

- **Tarjeta de crédito/débito:** Muestra un formulario con los campos número de tarjeta (16 dígitos, teclado numérico), fecha de vencimiento y CVV (3 dígitos).
- **Bizum:** No requiere campos adicionales, solo confirmar la selección.

### Procesamiento del pago

Al pulsar el botón de confirmar, la aplicación ejecuta la siguiente secuencia en Supabase:

1. **Registrar el pago:** Inserta un nuevo registro en la tabla `pagos` con `id_usuario`, el importe del plan seleccionado, la fecha actual, el tipo de plan y el método de pago.

2. **Activar la suscripción:** Actualiza el registro del usuario en la tabla `usuarios`:
   - `premium = true`
   - `fecha_ini_prem` = fecha actual (`yyyy-MM-dd`)
   - `fecha_fin_prem` = fecha actual + número de meses del plan

El cálculo de `fecha_fin_prem` se realiza con `Calendar`:

```kotlin
val cal = Calendar.getInstance()
cal.add(Calendar.MONTH, meses)
val fechaFin = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(cal.time)
```

Tras el procesamiento correcto, se muestra un diálogo de confirmación y se invoca `onSuccess` para cerrar la pantalla.

### Historial de pagos

Los pagos registrados en la tabla `pagos` son consultados por `HistorialScreen`, que los lista ordenados por `fecha_pago` de forma descendente. Cada entrada muestra el tipo de plan, el método de pago, el importe y la fecha.
