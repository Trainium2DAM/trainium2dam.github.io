---
sidebar_position: 4
title: 🧩 Componentes y Patrones Reutilizables
---

# 🧩 Componentes y Patrones Reutilizables

La aplicación utiliza un conjunto de componentes modulares y patrones de diseño consistentes para acelerar el desarrollo y mantener la coherencia de la interfaz de usuario (UI).

## 1. Patrones de Navegación

| Patrón | Descripción | Ubicaciones Clave |
| :--- | :--- | :--- |
| **Barra de Navegación Inferior** | Fija y persistente en la parte inferior de la pantalla para navegación de alto nivel. | Global (Inicio, Reservar, Premium, Perfil). |
| **Encabezado (Header) con Acciones** | Título de la pantalla centrado o alineado a la izquierda, acompañado de iconos de acción (ej. Notificaciones 🔔, Headset 🎧, Editar peso 📝).
| **Botón de Retroceso (`<`)** | Icono consistente para volver a la pantalla anterior, típicamente en la esquina superior izquierda. |

## 2. Componentes de Interacción y Datos

| Componente | Descripción | Uso y Ejemplos |
| :--- | :--- | :--- |
| **Botón de Acción Primaria** | Formato de píldora de ancho completo, relleno con el color **Púrpura Oscuro** de la marca. | **"Continuar"**, **"Iniciar Sesión"**, **"Terminar"**, **"Desbloquea las ventajas"**. |
| **Card de Selección de Opción** | Un contenedor rectangular, a menudo con un borde púrpura, que aloja una imagen, texto y un control de selección (radio/checkbox). | Seleccionar **Género**, **Tipo de Ejercicio**, **Plan de Suscripción** |
| **Input Field con Iconografía** | Campos de texto con icono de visibilidad (ojo) para datos sensibles como contraseñas y DNI. | **Contraseña**, **Repite contraseña**, **Introduce el DNI** |
| **Widget de Resumen (Card)** | Contenedor para mostrar un resumen visual de datos clave (progreso o nutrición). | **"Reto de peso"** (barra de progreso) y **"Dieta y nutrición"** (receta/macros) |
| **Lista de Métodos de Pago** | Elementos de lista que contienen texto, un icono relevante (banco, tarjeta, G Pay) y un indicador de acción (`>`). | **Tarjeta de crédito o débito**, **Bizum** |