// admin.js

// Esta función puede llamarse cuando se cree, edite o elimine un producto
function logStockAction(action, productName, adminName) {
const db = JSON.parse(localStorage.getItem("db"));
const logEntry = {
    action, // 'crear', 'editar', 'eliminar'
    productName,
    adminName,
    date: new Date().toLocaleString()
};
db.stockHistory.push(logEntry);
localStorage.setItem("db", JSON.stringify(db));
}

// Esta función se puede usar para visualizar el historial desde el perfil de admin si se desea
function showStockHistory() {
const db = JSON.parse(localStorage.getItem("db"));
const content = document.getElementById("main-content");

const historyHTML = db.stockHistory.map(entry => `
    <li>
    <strong>${entry.action.toUpperCase()}</strong> el producto <em>${entry.productName}</em>
    por <strong>${entry.adminName}</strong> el ${entry.date}
    </li>
`).join("");

content.innerHTML = `
    <section>
    <h2>Historial de Stock</h2>
    <ul>${historyHTML || "<p>No hay historial aún.</p>"}</ul>
    </section>
`;
}
