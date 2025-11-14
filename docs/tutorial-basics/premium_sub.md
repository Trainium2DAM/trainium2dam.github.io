## ⭐ Suscripción Premium

### `premium-subscription.png` - Página de Suscripción

# Wireframe: Página de Suscripción Premium

## 🎯 Objetivo
Conversión de usuarios gratuitos a premium mediante value proposition clara.

## 📱 Estructura Comercial

### Value Proposition
- **Título**: "Reserva con antelación ¡No pierdas más tu tiempo!"
- **Lista de beneficios**:
  - [x] Reserva hasta con 5 días de antelación
  - [x] Prioridad en asistencia
  - [x] Ofertas en colaboración de tu GYM
  - [x] Disfruta sin anuncios

### Planes de Precio
- **Acceso Mensual**: 6,99€
- **Acceso Anual**: 69,90€
  - **Ahorro destacado**: "Ahorra: 14,20€"
  - **Recomendación**: "Anual" (badge)

### Call-to-Action
- **Botón principal**: "Desbloquea las ventajas >"

### Footer Legal
- Términos de uso
- Política de privacidad
- Navigation: Inicio | Reservar | Premium | Perfil

## 🎨 Estrategia de Conversión
- **Beneficios con checkboxes**: Visual claro de ventajas
- **Comparativa de precios**: Mensual vs Anual
- **Ahorro destacado**: 14,20€ en negrita
- **CTA prominente**: Color y posición estratégica

## 🔧 Especificaciones Técnicas
```javascript
// Modelo de suscripción premium
const premiumPlans = {
  features: [
    { text: "Reserva hasta con 5 días de antelación", included: true },
    { text: "Prioridad en asistencia", included: true },
    { text: "Ofertas en colaboración de tu GYM", included: true },
    { text: "Disfruta sin anuncios", included: true }
  ],
  pricing: {
    monthly: {
      price: 6.99,
      currency: "€",
      period: "month"
    },
    annual: {
      price: 69.90,
      currency: "€", 
      period: "year",
      savings: 14.20,
      recommended: true
    }
  },
  cta: {
    text: "Desbloquea las ventajas",
    link: "#"
  }
};
```