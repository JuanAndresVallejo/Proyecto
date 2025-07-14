JSON.parse(localStorage.getItem("db")).products

[] o undefined


localStorage.setItem("db", JSON.stringify({
  users: [],
  products: [
    { id: 1, name: "Tomate", price: 2000, stock: 15 },
    { id: 2, name: "Papa", price: 1800, stock: 10 },
    { id: 3, name: "Cebolla", price: 2200, stock: 12 }
  ],
  purchases: [],
  stockHistory: []
}));



JSON.parse(localStorage.getItem("session")).role


https://github.com/angelicacvo/rutaViva


router.js:35 Uncaught ReferenceError: renderProducts is not defined
    at loadPage (router.js:35:5)
    at router.js:30:1


<!-- 👇 Estas líneas DEBEN estar justo antes de </body> -->
<script src="../js/auth.js"></script>
<script src="../js/products.js"></script> <!-- OBLIGATORIO -->
<script src="../js/cart.js"></script>
<script src="../js/profile.js"></script>
<script src="../js/admin.js"></script>
<script src="../js/router.js"></script> <!-- SIEMPRE AL FINAL -->
</body>

loadPage("productos"); // ❌ Esto da error si no existe la función
routeTo("productos", session.role);

function renderProducts(role) {
  // Aquí va todo tu renderizado de productos
}

document.addEventListener("DOMContentLoaded", () => {
  function renderProducts() { ... } // ❌ Esta versión no será global
});

html
<div id="navbar"></div>
<div id="main-content"></div>


<div id="app-container">
  <nav id="sidebar"></nav>
  <main id="main-content"></main>
</div>

css

/* Layout general */
#app-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar vertical */
#sidebar {
  width: 220px;
  background-color: #e5f5e0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', sans-serif;
}

/* Botones del sidebar */
#sidebar button {
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  text-align: left;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

#sidebar button:hover {
  background-color: #cde8cc;
}

/* Contenido principal */
#main-content {
  flex-grow: 1;
  padding: 30px;
  background-color: #fdfdfd;
  overflow-y: auto;
}

/* Logo o título */
#sidebar .logo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #3b7d3b;
}

/* Indicador de sesión */
#session-indicator {
  margin-top: auto;
  font-size: 14px;
  color: #666;
}

/* Responsive */
@media screen and (max-width: 768px) {
  #app-container {
    flex-direction: column;
  }

  #sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: none;
    border-bottom: 1px solid #ccc;
  }

  #sidebar button {
    padding: 10px 5px;
    font-size: 14px;
  }

  #main-content {
    padding: 15px;
  }
}

router
function renderNavbar(session) {
  const nav = document.getElementById("sidebar");
  nav.innerHTML = `
    <div class="logo">🥦 Donde Nana</div>
    <button data-route="productos">🧺 Productos</button>
    <button data-route="carrito">🛒 Carrito</button>
    <button data-route="perfil">${session.name}</button>
    ${session.role === "A" ? `<button data-route="stock">📦 Historial</button>` : ""}
    <button onclick="logout()">🚪 Cerrar sesión</button>
    <span id="session-indicator">🔒 Sesión activa</span>
  `;
}
