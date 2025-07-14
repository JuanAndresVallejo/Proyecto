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
