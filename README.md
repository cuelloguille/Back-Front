
# 🛠️ Práctico Integrador Fullstack - Productos y Personas

Este proyecto es un CRUD completo desarrollado con **React (Vite)** en el frontend y **Node.js + Express** en el backend, con persistencia de datos en archivos `.json` utilizando `fs`. Incluye funcionalidades de exportación a PDF y estilos con Bootstrap.

---

## 📁 Estructura general del proyecto

```
/backend
│   ├── server.js
│   ├── /routes
│   │    ├── productosRoutes.js
│   │    └── usuariosRoutes.js
│   └── /controllers
│        ├── productosController.js
│        └── usuariosController.js

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
│   │    └── index.css
│   └── vite.config.js
```

---

## 🚀 ¿Qué hace este proyecto?

### 🔧 Backend (Node.js + Express)
- Rutas para productos (`/productos`) y personas (`/usuarios`)
- Operaciones CRUD completas (GET, POST, PUT, DELETE)
- Persistencia en archivos JSON usando `fs`
- Middleware `cors` y `express.json()`
- Controladores separados por entidad

### 💻 Frontend (React)
- CRUD de Productos:
  - Formulario para crear y editar
  - Listado en tabla
  - Botones de eliminar y editar
  - Exportación a PDF con `jsPDF` + `autoTable`

- CRUD de Personas:
  - Formulario para crear y editar
  - Listado en tabla
  - Botones de eliminar y editar
  - Exportación a PDF

- Navegación con React Router DOM
- Estilos con **Bootstrap 5** (modo claro)
- Interfaz ordenada con pestañas (`NavLink`) para alternar entre productos y personas
- Diseño responsive y centrado

---

## 🧾 Funcionalidades destacadas

### ✅ CRUD completo
Ambas entidades (productos y personas) se pueden:
- Crear
- Leer
- Editar
- Eliminar

### ✅ Exportación a PDF
- Botón para descargar los listados como archivos PDF.
- Implementado con las librerías:
  - [`jspdf`](https://www.npmjs.com/package/jspdf)
  - [`jspdf-autotable`](https://www.npmjs.com/package/jspdf-autotable)

### 🎨 Estilos
- Bootstrap integrado vía `import 'bootstrap/dist/css/bootstrap.min.css';`
- Navegación en pestañas (`NavTabs`) con estilo activo
- Formularios y tablas bien distribuidos y centrados

---

## ▶️ Cómo ejecutar el proyecto

### Backend


cd backend
npm install
node server.js

Servidor corriendo en `http://localhost:3001`

### Frontend


cd frontend
npm install
npm run dev


App React corriendo en `http://localhost:5173`

---

## 📦 Dependencias utilizadas

### Backend:
- express
- cors
- fs (módulo nativo)

### Frontend:
- react
- react-dom
- react-router-dom
- axios
- bootstrap
- jspdf
- jspdf-autotable

---

## 🧑‍💻 Autor

Hecho por [Guillermo Cuello] como parte del práctico integrador Fullstack.

---

## 🗂️ Licencia

Este proyecto es de uso académico y personal.

actualizaciones de proyecto 

se añadio la validacion para tokens y encriptar los datos sensibles se pide token para crear objetos (persona y productos )

tambien se mejoro la esteticamente con boobstrap y css 

