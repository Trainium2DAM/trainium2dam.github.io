## 👤 Flujo de Registro

### Wireframes de Registro y Selección de Género

# Wireframe: Selección de Género

![image info](./img/diet-plans.png)

### Estructura
- **Hora**: 9:41
- **Título**: "Seleccione Su Género"
- **Opciones**:
  - "Tu género (Hombre)"
  - "Tu género (Mujer)"
- **Botones de navegación**:
  - "Volver a Iniciar Sesión"
  - "Continuar"

## `image.png` (formulario registro)

### Formulario de Registro Completo
- **Título**: "Registrarse"
- **Subtítulo**: "Rellena los campos con tu información"
- **Campos requeridos**:
  - Usuario
  - Nombre: "Daniel Fathi Jesús José"
  - Correo electrónico
  - DNI
  - Peso(kg): 75
  - Altura(cm)
  - Contraseña
  - Repite contraseña
- **Botón de acción**: "Terminar"

## `image.png` (selección tipo ejercicio)

### Preferencias de Entrenamiento
- **Título**: "Seleccione el tipo de ejercicio que desea hacer"
- **Categorías disponibles**:
  - Cardio, Espalda, Pierna, Pecho, Bíceps, Triceps, Glúteo
- **Disclaimer**: "Las actividades con mancuernas o bancos no es posible hacer una reserva"

## 🎨 Patrones de Onboarding
- **Progresión lineal**: Género → Datos → Preferencias
- **Formulario escalonado**: Evita fatiga del usuario
- **Validación en tiempo real**: Especialmente en contraseñas

## 🔧 Especificaciones Técnicas
```javascript
// Modelo de usuario para registro
const userRegistration = {
  personal: {
    username: "",
    fullName: "Daniel Fathi Jesús José",
    email: "",
    dni: "",
    gender: "" // 'hombre' | 'mujer'
  },
  physical: {
    weight: 75, // kg
    height: "" // cm
  },
  security: {
    password: "",
    confirmPassword: ""
  },
  preferences: {
    exerciseTypes: [] // array de categorías seleccionadas
  }
};
```