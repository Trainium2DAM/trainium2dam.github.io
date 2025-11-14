### `machine-booking (1).png` - Dashboard de Reserva Rápida

# Wireframe: Dashboard Principal de Reservas

![image info](./img/machines-catalog.png)

## 🎯 Objetivo
Dashboard unificado con acceso rápido a todas las funcionalidades.

## 📱 Componentes Principales

### Header
- **Saludo personalizado**: "Buenos días, Usuario"
- **Sección "Reserva rápida"**:
  - Cardio → Reservar
  - Espalda → Reservar  
  - Pierna → Reservar

### Sección de Progreso
- **Reto de peso**: 85% Completado
- **Barra de progreso visual**
- **Marcadores**: 95KG → 72KG

### Sección Nutricional
- **Macronutrientes**:
  - 25g Proteína
  - 16g Grasa
- **Comida sugerida**: "Ensalada con huevos"
  - 548kcal
  - 20min (tiempo preparación)

### Navigation Bar
- Inicio | Reservar | Premium | Perfil

## 🎨 Arquitectura de Información
- **Jerarquía clara**: De general a específico
- **Progreso visual**: Barras e indicadores
- **Navegación consistente**: Bottom navigation pattern

## 🔧 Especificaciones Técnicas
```javascript
// Estructura del dashboard
const dashboardData = {
  user: {
    name: "Usuario",
    greeting: "Buenos días"
  },
  quickReserve: ["Cardio", "Espalda", "Pierna"],
  weightChallenge: {
    progress: 85,
    start: "95KG",
    current: "72KG"
  },
  nutrition: {
    protein: "25g",
    fat: "16g",
    suggestedMeal: {
      name: "Ensalada con huevos",
      calories: 548,
      prepTime: 20
    }
  }
};