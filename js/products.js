// products.js

function renderProducts(role) {
const content = document.getElementById("main-content");
const db = JSON.parse(localStorage.getItem("db"));

content.innerHTML = `
    <section class="product-section">
    <h2>Productos disponibles</h2>
    <input type="text" id="search" placeholder="Buscar producto..." />
    <div id="product-list" class="grid"></div>
    </section>
`;

const productList = document.getElementById("product-list");

const renderList = (products) => {
    productList.innerHTML = "";
    products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <p>En stock: ${product.stock}</p>
        <div class="actions">
        ${
            role === "U" ? `
            <input type="number" min="1" max="${product.stock}" value="1" id="qty-${product.id}">
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            ` : `
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
            `
        }
        </div>
    `;

    productList.appendChild(card);
    });
};

renderList(db.products);

// Búsqueda simple
document.getElementById("search").addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = db.products.filter(p => p.name.toLowerCase().includes(query));
    renderList(filtered);
});
}

// Función para añadir al carrito
function addToCart(productId) {
const db = JSON.parse(localStorage.getItem("db"));
const session = JSON.parse(localStorage.getItem("session"));
const qtyInput = document.getElementById(`qty-${productId}`);
const quantity = parseInt(qtyInput.value);

const product = db.products.find(p => p.id === productId);
if (!product || product.stock < quantity) {
    alert("No hay suficiente stock.");
    return;
}

product.stock -= quantity;

if (!session.cart) session.cart = [];
const existing = session.cart.find(p => p.id === productId);
if (existing) {
    existing.quantity += quantity;
} else {
    session.cart.push({ id: product.id, name: product.name, price: product.price, quantity });
}

localStorage.setItem("session", JSON.stringify(session));
localStorage.setItem("db", JSON.stringify(db));
alert("Producto añadido al carrito.");
}

// FUNCIONES ADMIN: editar y eliminar producto (placeholder)
function editProduct(id) {
alert("Función de editar producto aún no implementada (aquí irá el modal o formulario).");
}

function deleteProduct(id) {
let db = JSON.parse(localStorage.getItem("db"));
db.products = db.products.filter(p => p.id !== id);
localStorage.setItem("db", JSON.stringify(db));
renderProducts("A");
}
