# Catálogo de Turismo San Fernando

## Autor: Julia Núñez Baña

**Descripción del Proyecto**
Esta aplicación web permite visualizar un catálogo de lugares de interés en San Fernando. Los usuarios pueden explorar diferentes localizaciones, ver los detalles de cada una de ellas y dejar tanto comentarios como valoraciones en sus ubicaciones favoritas! En el caso de los administradores, cuentan con un panel de administración en el cual pueden gestionar las localizaciones: consultar, editar o eliminar.

**Estructura del Proyecto**
  - Frontend: Desarrollado en Angular utilizando Angular Material para la interfaz.
  - Backend: Se utiliza json-server para el almacenamiento de datos.
  - Autenticación: Implementada con crypto-js para cifrar contraseñas y jsonwebtoken (JWT) para la autenticación basada en tokens.
  - Generación de PDF: Se usa pdfmake-wrapper para exportar informes de localizaciones.

**Roles de Usuario**
  - Visitante: Puede ver el catálogo sin registrarse.
  - Usuario registrado: Puede comentar y valorar los lugares.
  - Administrador: Puede añadir, modificar, eliminar y consultar localizaciones.

**Recursos Utilizados**
  - Angular (framework principal).
  - Angular Material (componentes UI).
  - json-server (almacenamiento de datos local).
  - crypto-js (cifrado de contraseñas).
  - jsonwebtoken (JWT) (autenticación y control de acceso).
  - pdfmake-wrapper (exportación de datos en PDF).

**Modificaciones y Mejoras**
  - Implementación de sistema de autenticación con JWT.
  - Integración de pdfmake-wrapper para generar listados en PDF.
  - Mejora en la UI con Angular Material.
  - Implementación de un sistema de valoraciones y comentarios.
