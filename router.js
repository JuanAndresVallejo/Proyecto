
document.addEventListener("DOMContentLoaded", () => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (!session) {
    window.location.href = "../index.html";
    return;
  }

  renderNavbar(session);
  routeTo("productos", session.role);

  document.querySelectorAll("[data-route]").forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-route");
      routeTo(view, session.role);
    });
  });

  document.getElementById("session-indicator").textContent = session.name;
});

function routeTo(view, role) {
  switch (view) {
    case "productos":
      renderProducts(role);
      break;
    case "carrito":
      renderCart(role);
      break;
    case "perfil":
      renderProfile(role);
      break;
    case "stock":
      if (role === "A") showStockHistory();
      break;
    default:
      renderProducts(role);
  }
}

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

function logout() {
  localStorage.removeItem("session");
  location.href = "../index.html";
}
