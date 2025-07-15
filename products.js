
function renderProducts(role) {
  const db = JSON.parse(localStorage.getItem("db"));
  const main = document.getElementById("main-content");

  if (!db || !db.products || db.products.length === 0) {
    main.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  main.innerHTML = \`
    <section class="product-section">
      <h2>Productos disponibles</h2>
      <input type="text" id="search" placeholder="Buscar producto...">
      <div id="product-list" class="product-grid"></div>
    </section>
  \`;

  const productList = document.getElementById("product-list");

  db.products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = \`
      <h3>\${product.name}</h3>
      <p>Precio: \$\${product.price}</p>
      <p>Stock: \${product.stock}</p>
      \${role === "U"
        ? \`<input type="number" id="qty-\${product.id}" min="1" max="\${product.stock}" value="1">
           <button onclick="addToCart(\${product.id})">Añadir al carrito</button>\`
        : \`<button onclick="editProduct(\${product.id})">Editar</button>
           <button onclick="deleteProduct(\${product.id})">Eliminar</button>\`}
    \`;
    productList.appendChild(card);
  });
}
