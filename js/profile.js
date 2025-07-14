// profile.js

function renderProfile(role) {
const content = document.getElementById("main-content");
const db = JSON.parse(localStorage.getItem("db"));
const session = JSON.parse(localStorage.getItem("session"));

if (role === "U") {
    const myPurchases = db.purchases.filter(p => p.userId === session.id);

    const purchaseHTML = myPurchases.map(p => {
    const itemsHTML = p.items.map(i => `<li>${i.name} — ${i.quantity} x $${i.price}</li>`).join("");
    return `
        <details>
        <summary><strong>Total:</strong> $${p.total} — ${p.date}</summary>
        <ul>${itemsHTML}</ul>
        </details>
    `;
    }).join("");

    content.innerHTML = `
    <section>
        <h2>Mi perfil</h2>
        <p><strong>Nombre:</strong> ${session.name}</p>
        <p><strong>Correo:</strong> ${session.email}</p>
        <button onclick="showEditForm()">Editar mis datos</button>
        <h3>Mis compras</h3>
        ${purchaseHTML || "<p>No has hecho compras todavía.</p>"}
        <div id="edit-form" style="display:none; margin-top:1rem;">
        <input type="email" id="edit-email" placeholder="Nuevo correo" />
        <input type="password" id="edit-pass" placeholder="Nueva contraseña" />
        <button onclick="saveProfileChanges()">Guardar cambios</button>
        </div>
    </section>
    `;
}

if (role === "A") {
    const userHTML = db.users.map(u => {
    const userPurchases = db.purchases.filter(p => p.userId === u.id);
    const purchaseHTML = userPurchases.map(p => {
        const items = p.items.map(i => `<li>${i.name} — ${i.quantity} x $${i.price}</li>`).join("");
        return `
        <details>
            <summary>Total: $${p.total} — ${p.date}</summary>
            <ul>${items}</ul>
        </details>
        `;
    }).join("");

    return `
        <div class="admin-user-box">
        <h4>${u.name} (${u.role === "A" ? "Admin" : "Usuario"})</h4>
        <p><strong>Email:</strong> ${u.email}</p>
        <button onclick="editUser(${u.id})">Editar</button>
        <button onclick="deleteUser(${u.id})">Eliminar</button>
        <div>${purchaseHTML || "<em>Sin compras.</em>"}</div>
        </div>
    `;
    }).join("");

    content.innerHTML = `
    <section>
        <h2>Gestión de usuarios</h2>
        ${userHTML}
    </section>
    `;
}
}

function showEditForm() {
document.getElementById("edit-form").style.display = "block";
}

function saveProfileChanges() {
const email = document.getElementById("edit-email").value.trim();
const password = document.getElementById("edit-pass").value.trim();

const db = JSON.parse(localStorage.getItem("db"));
let session = JSON.parse(localStorage.getItem("session"));

if (email) session.email = email;
if (password) session.password = password;

const index = db.users.findIndex(u => u.id === session.id);
db.users[index] = session;

localStorage.setItem("db", JSON.stringify(db));
localStorage.setItem("session", JSON.stringify(session));

alert("Datos actualizados.");
renderProfile(session.role);
}

function editUser(id) {
alert("Función de edición avanzada aún no implementada.");
}

function deleteUser(id) {
const db = JSON.parse(localStorage.getItem("db"));
db.users = db.users.filter(u => u.id !== id);
localStorage.setItem("db", JSON.stringify(db));
renderProfile("A");
}
