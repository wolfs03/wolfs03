// script.js

// Variables del carrito (carga inicial desde localStorage)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un avión al carrito
function agregarAlCarrito(avion, precio) {
    carrito.push({ nombre: avion, precio: precio });
    actualizarCarrito();
    guardarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    const totalElement = document.getElementById('total');

    // Limpiar lista del carrito
    cartList.innerHTML = '';

    // Mostrar los elementos del carrito
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Eliminar';
        removeBtn.onclick = () => eliminarDelCarrito(index);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    // Actualizar el contador del carrito
    cartCount.textContent = carrito.length;

    // Calcular y mostrar el total
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    totalElement.textContent = `Total: $${total.toLocaleString()}`;
}

// Función para eliminar un elemento del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el elemento por su índice
    actualizarCarrito(); // Actualizar el carrito
    guardarCarrito(); // Guardar el carrito actualizado en localStorage
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        const total = carrito.reduce((sum, item) => sum + item.precio, 0);
        alert(`Gracias por tu compra de: ${carrito.map(item => item.nombre).join(', ')} por un total de $${total.toLocaleString()}`);
        carrito = []; // Vaciar el carrito después de la compra
        actualizarCarrito();
        guardarCarrito(); // Limpiar el localStorage
    }
}

// Validación básica del formulario
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre === '' || email === '' || mensaje === '') {
        alert("Por favor, completa todos los campos.");
        return false;
    }

    alert("Formulario enviado correctamente.");
    return true;
}

// Inicialización del carrito al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    actualizarCarrito();
});
