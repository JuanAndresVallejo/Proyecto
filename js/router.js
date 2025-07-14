// router.js

const session = JSON.parse(localStorage.getItem("session"));
if (!session) {
window.location.href = "../index.html";
}

// Mostrar nombre del usuario en navbar
document.getElementById("user-name").textContent = session.name;

// Botón cerrar sesión
document.getElementById("logout-btn").addEventListener("click", () => {
localStorage.removeItem("session");
alert("Sesión cerrada.");
window.location.href = "../index.html";
});

// Control de navegación SPA
const content = document.getElementById("main-content");
const buttons = document.querySelectorAll("nav button");

buttons.forEach(btn => {
btn.addEventListener("click", () => {
    const page = btn.getAttribute("data-page");
    loadPage(page);
});
});

// Cargar página inicial
loadPage("products");

function loadPage(page) {
switch (page) {
    case "products":
    renderProducts(session.role);
    break;
    case "cart":
    renderCart(session.role);
    break;
    case "profile":
    renderProfile(session.role);
    break;
}
}
