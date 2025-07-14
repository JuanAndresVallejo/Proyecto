// cart.js

function renderCart(role) {
const content = document.getElementById("main-content");
const db = JSON.parse(localStorage.getItem("db"));
const session = JSON.parse(localStorage.getItem("session"));

if (role === "U") {
    const cart = session.cart || [];
    let total = 0;

    const cartHTML = cart.map(item => {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    return `
        <li>
        ${item.name} — ${item.quantity} x $${item.price} = $${subtotal}
        </li>`;
    }).join("");

    content.innerHTML = `
    <section>
        <h2>Tu carrito</h2>
        <ul>${cartHTML}</ul>
        <p><strong>Total:</strong> $${total}</p>
        <button id="checkout-btn">Comprar</button>
    </section>
    `;

    document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const newPurchase = {
        userId: session.id,
        name: session.name,
        items: [...cart],
        total,
        date: new Date().toLocaleString()
    };

    db.purchases.push(newPurchase);
    session.cart = [];

    localStorage.setItem("db", JSON.stringify(db));
    localStorage.setItem("session", JSON.stringify(session));

    alert("Compra exitosa.");
    renderCart("U");
    });

} else if (role === "A") {
    const purchases = db.purchases;

    const adminHTML = purchases.map(p => {
    const itemsHTML = p.items.map(i => `
        <li>${i.name} — ${i.quantity} x $${i.price}</li>
    `).join("");

    return `
        <details>
        <summary><strong>${p.name}</strong> — Total: $${p.total} — ${p.date}</summary>
        <ul>${itemsHTML}</ul>
        </details>
    `;
    }).join("");

    content.innerHTML = `
    <section>
        <h2>Historial de compras</h2>
        ${adminHTML || "<p>No hay compras aún.</p>"}
    </section>
    `;
}
}
