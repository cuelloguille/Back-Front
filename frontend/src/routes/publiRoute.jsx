// Componente para rutas públicas
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  // Si el usuario está logueado, lo redirige al home privado
  return token ? <Navigate to="/homeLogueado" replace /> : children;
}
