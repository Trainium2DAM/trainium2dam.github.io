## 🥗 Planes de Dieta

### `diet-plans.png` - Plato del Día

# Wireframe: Detalle de Plan Nutricional

## 🎯 Objetivo
Presentar información nutricional detallada de comidas específicas.

## 📱 Estructura de Información

### Header Nutricional
- **Título**: "Plato Del Día"
- **Nombre receta**: "Pollo Picante Con Cuscús"
- **Desglose nutricional**:
  - Calorias: 284kcal
  - Grasas: 3g
  - Carbohidratos: 22g
  - Proteína: 50g

### Sección de Ingredientes
- **Ingredientes principales**:
  - 1 Cucharada De Pasta De Curry
  - 1 Cucharada De Chutney De Mango
  - ½ Cucharadita De Cúrcuma
  - Sal Al Gusto
  - 50 ml De Aceite De Oliva
  - 4 Pechugas De Pollo
  - 300 G De Cuscús
  - 350 ml De Caldo De Verduras

### Extras Opcionales
- Semillas De Granada
- Cilantro

## 🎨 Diseño Nutricional
- **Jerarquía clara**: De macro a micro nutrientes
- **Lista de ingredientes**: Ordenada y cuantificada
- **Extras diferenciados**: Opcionales vs esenciales

## 🔧 Especificaciones Técnicas
```javascript
// Modelo de datos para recetas
const dailyMeal = {
  title: "Plato Del Día",
  recipe: {
    name: "Pollo Picante Con Cuscús",
    nutrition: {
      calories: 284,
      fat: 3,
      carbs: 22,
      protein: 50
    },
    ingredients: [
      { name: "Pasta De Curry", quantity: "1 Cucharada" },
      { name: "Chutney De Mango", quantity: "1 Cucharada" },
      // ... más ingredientes
    ],
    optional: ["Semillas De Granada", "Cilantro"]
  }
};
```