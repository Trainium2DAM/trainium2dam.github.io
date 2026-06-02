---
title: Trainium
sidebar_position: 1
slug: /
---

# Trainium

Trainium es una aplicación Android nativa orientada a la gestión integral de un gimnasio. Permite a los usuarios registrarse, reservar maquinaria, controlar su progreso físico mediante registro de peso y seguir planes de nutrición. Dispone de un sistema de suscripción Premium que amplía las funcionalidades disponibles, así como un rol de administrador con acceso a la gestión del catálogo de maquinaria, las reservas activas y la moderación de platos nutricionales.

Este proyecto ha sido desarrollado como Trabajo de Fin de Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM) por los estudiantes:

- Daniel Adrian Altenir Sánchez
- José Manuel Altenir Sánchez
- Othmane Fathi
- Jesús Mora Peñarrubia

## Características principales

La aplicación implementa las siguientes funcionalidades en su versión final:

- Autenticación de usuarios mediante DNI y contraseña, con recuperación de credenciales por email
- Registro de nuevos usuarios con validación de campos (nombre, DNI, email, teléfono)
- Reserva de maquinaria con selección de fecha y franja horaria, con detección de solapamientos
- Sistema de mantenimiento de maquinaria con cancelación automática de reservas afectadas
- Seguimiento de peso con gráfico de evolución temporal y cálculo de IMC
- Catálogo de platos nutricionales con sistema de sugerencias por parte del usuario y moderación por el administrador
- Suscripción Premium con tres modalidades de precio (mensual, semestral y anual) y registro de pagos
- Edición de perfil con foto de usuario almacenada en Base64
- Soporte de tema claro y oscuro con persistencia de preferencia mediante DataStore
- Pantalla de splash animada con reproducción de vídeo introductorio

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Lenguaje | Kotlin |
| UI | Jetpack Compose + Material 3 |
| Navegación | Navigation Compose 2.7.7 |
| Backend principal | Supabase (PostgreSQL) via SDK oficial |
| Backend alternativo | Firebase Data Connect (GraphQL) |
| Autenticación | Firebase Auth |
| Persistencia local | Jetpack DataStore Preferences |
| Build system | Gradle (Kotlin DSL) |
| IDE | Android Studio |

## Estructura de la documentación

La documentación está organizada en las siguientes secciones:

**Instalación y configuración** cubre los requisitos del entorno de desarrollo, la clonación del repositorio y la configuración de las credenciales de Supabase y Firebase necesarias para compilar el proyecto.

**Arquitectura** describe la estructura de módulos, el grafo de navegación y las decisiones de diseño adoptadas.

**Base de datos** documenta el esquema de tablas de Supabase, las relaciones entre entidades y el esquema GraphQL de Firebase Data Connect.

**Pantallas** describe cada pantalla de la aplicación, sus responsabilidades y los flujos de navegación.

**Funcionalidades** detalla la implementación de cada bloque funcional principal.

**API y servicios** explica la integración con Supabase, Firebase Auth y Firebase Data Connect.

**Diseño** documenta el sistema de diseño, la paleta de colores y la tipografía.

**Despliegue** indica los pasos para generar un APK de release.

**Referencia** recoge el inventario de modelos de datos y clases de utilidad.
