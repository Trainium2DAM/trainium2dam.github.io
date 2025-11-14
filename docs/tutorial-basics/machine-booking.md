# Wireframe: Reserva de Máquinas de Cardio

![image info](./img/machine-booking.png)

## 🎯 Objetivo
Permitir reserva específica de equipos de cardio disponibles.

## 📱 Flujo de Interacción

### Pantalla Principal
- **Título**: "Seleccione la maquina de cardio que desea reservar"
- **Lista de equipos**:
  - Bicicleta estática → Botón "Reservar"
  - Cinta de correr → Botón "Reservar"

## 🎨 Patrones de Diseño
- **Lista expandible**: Cada item con acción específica
- **Botones contextuales**: "Reservar" por cada máquina
- **Agrupación por categoría**: Solo equipos de cardio

## 🔧 Especificaciones Técnicas
```javascript
// Estructura de datos para reservas
const cardioMachines = [
  {
    id: 1,
    name: "Bicicleta estática",
    type: "cardio",
    available: true,
    reservationButton: true
  },
  {
    id: 2, 
    name: "Cinta de correr",
    type: "cardio",
    available: true,
    reservationButton: true
  }
];
```