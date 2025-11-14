## 📊 Seguimiento de Progreso

### `progress-tracking.png` - Control de Métricas Corporales

# Wireframe: Panel de Seguimiento Físico

## 🎯 Objetivo
Visualización completa del progreso físico del usuario.

## 📱 Componentes de Datos

### Header de Usuario
- **Título**: "Usuario"
- **Gráfico de peso**: 
  - Escala: 70Kg - 100Kg
  - Timeline: Día 1 a 60
  - **Botón**: "Editar peso"

### Métricas Principales
- **Progreso reciente**: "En los ultimos 10 días has bajado: 2,2kg"
- **Índice de Masa Corporal**: "Tu IMC (peso/altura): 24,1"
- **Porcentaje de grasa**: "Tu porcentaje de grasa: 16,2%"

### Disclaimer Médico
- "Esta información es una referencia general..."
- "Los datos son aproximados"

## 🎨 Visualización de Datos
- **Gráfico lineal**: Evolución del peso
- **Métricas destacadas**: IMC y grasa corporal
- **Contexto temporal**: Progreso en 10 días

## 🔧 Especificaciones Técnicas
```javascript
// Modelo de datos para progreso
const userProgress = {
  weightData: {
    current: 72,
    start: 95,
    timeline: Array(60).fill(), // 60 días
    recentChange: -2.2 // kg en 10 díasx
  },
  metrics: {
    bmi: 24.1,
    bodyFat: 16.2,
    lastUpdated: "2024-01-15"
  },
  disclaimer: {
    text: "Esta información es una referencia general...",
    type: "medical"
  }
};
```