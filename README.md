🛠️ Práctico Integrador Fullstack - Productos y Personas

Este proyecto es un CRUD Fullstack desarrollado con React (Vite) en el frontend y Node.js + Express en el backend.
La persistencia se realiza en archivos .json usando fs.
Incluye autenticación con tokens, roles de usuario (admin / user), exportación a PDF, y estilos con Bootstrap 5.

📁 Estructura del proyecto
/backend
│   ├── server.js
│   ├── /routes
│   │    ├── productosRoutes.js
│   │    ├── usuariosRoutes.js
│   │    └── loginRoutes.js
│   └── /controllers
│        ├── productosController.js
│        ├── usuariosController.js
│        └── authController.js

/frontend
│   ├── /src
│   │    ├── App.jsx
│   │    ├── main.jsx
│   │    ├── /components
│   │    │    ├── /Productos
│   │    │    │    ├── ProductosView.jsx
│   │    │    │    └── ProductoForm.jsx
│   │    │    └── /Personas
│   │    │         ├── PersonasView.jsx
│   │    │         └── PersonaForm.jsx
│   │    └── /Auth
│   │         ├── Login.jsx
│   │         └── Register.jsx
│   └── vite.config.js

🚀 Funcionalidades principales
🔒 Autenticación y seguridad

Login y Registro de usuarios con contraseña encriptada (bcrypt).

JWT tokens para validar sesiones activas.

Protección de rutas: no se puede acceder a productos ni personas sin estar logueado.

Roles (admin / user):

admin: puede crear, editar y eliminar usuarios.

user: acceso limitado (no puede editar usuarios).

🛠️ Backend (Node.js + Express)

Rutas para productos (/productos) y personas (/usuarios).

CRUD completo (GET, POST, PUT, DELETE).

Validación de tokens antes de acceder a las rutas protegidas.

Persistencia en archivos JSON (fs).

💻 Frontend (React + Vite)

Home: página inicial con acceso al login.

CRUD de Productos y Personas:

Crear, listar, editar y eliminar.

Listados en tabla con diseño responsive.

Exportación a PDF (jspdf + jspdf-autotable).

Bootstrap 5 + CSS personalizado para un diseño claro y moderno.

Navegación con React Router DOM.

🧾 Pasos para iniciar el proyecto

Clonar el repositorio

git clone <url-del-repo>


Backend

cd backend
npm install
node server.js


Servidor disponible en: http://localhost:3001

Frontend

cd frontend
npm install
npm run dev


App disponible en: http://localhost:5173

📦 Dependencias utilizadas
Backend

express

cors

bcrypt

jsonwebtoken

fs (módulo nativo)

Frontend

react

react-dom

react-router-dom

axios

bootstrap

jspdf

jspdf-autotable

🖌️ Mejoras recientes
✔️ Se añadió validación de tokens para proteger las rutas.
✔️ Se implementó encriptación de datos sensibles.
✔️ Se incorporó la gestión de roles de usuario (admin/user).
✔️ Se bloquea el acceso a Productos y Personas si el usuario no está logueado.
✔️ Se mejoró la estética usando Bootstrap y CSS personalizado.
✔️ Se agregaron dos versiones del Home: una para usuarios logueados y otra para usuarios no logueados, de modo que al entrar a la página haya una pantalla de bienvenida antes de acceder a las tablas o funcionalidades.
📌 Notas importantes

Siempre se ingresa primero al Home, desde allí se debe iniciar sesión.

Para ver los cambios progresivos, revisar los commits en el historial del repo.

🧑‍💻 Autor

Hecho por [Guillermo Cuello] como parte del Práctico Integrador Fullstack.

🗂️ Licencia

Proyecto de uso académico y personal.