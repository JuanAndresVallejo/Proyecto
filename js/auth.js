// auth.js

const db = JSON.parse(localStorage.getItem("db")) || {
users: [
    { id: 1, name: "Admin 1", email: "admin1@nana.com", password: "admin123", role: "A" },
    { id: 2, name: "Admin 2", email: "admin2@nana.com", password: "admin123", role: "A" },
    { id: 3, name: "Usuario 1", email: "u1@nana.com", password: "user123", role: "U" },
    { id: 4, name: "Usuario 2", email: "u2@nana.com", password: "user123", role: "U" },
    { id: 5, name: "Usuario 3", email: "u3@nana.com", password: "user123", role: "U" },
    { id: 6, name: "Usuario 4", email: "u4@nana.com", password: "user123", role: "U" },
    { id: 7, name: "Usuario 5", email: "u5@nana.com", password: "user123", role: "U" }
],
products: [],
purchases: [],
stockHistory: []
};

localStorage.setItem("db", JSON.stringify(db));

// Mostrar formularios
document.getElementById("show-register").addEventListener("click", () => {
document.getElementById("login-section").style.display = "none";
document.getElementById("register-section").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", () => {
document.getElementById("login-section").style.display = "block";
document.getElementById("register-section").style.display = "none";
});

// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
e.preventDefault();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const user = db.users.find(u => u.email === email && u.password === password);

if (user) {
    localStorage.setItem("session", JSON.stringify(user));
    window.location.href = "pages/app.html";
} else {
    alert("Correo o contraseña incorrectos.");
}
});

// Registro
document.getElementById("register-form").addEventListener("submit", function (e) {
e.preventDefault();
const name = document.getElementById("reg-name").value.trim();
const email = document.getElementById("reg-email").value.trim();
const password = document.getElementById("reg-password").value.trim();

const exists = db.users.find(u => u.email === email);
if (exists) return alert("Ese correo ya está registrado.");

const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: "U"
};

db.users.push(newUser);
localStorage.setItem("db", JSON.stringify(db));
alert("Registro exitoso. Inicia sesión.");
document.getElementById("show-login").click();
});
