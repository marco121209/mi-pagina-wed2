let carrito = [];
let total = 0;

// Mostrar formulario
function mostrarFormulario() {
    document.getElementById('formularioRegistro').style.display = 'block';
}

// Cerrar formulario
function cerrarFormulario() {
    document.getElementById('formularioRegistro').style.display = 'none';
}

// Iniciar sesión
function iniciarSesion() {
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const nombreUsuario = document.getElementById('nombreUsuario').value;

    if (correo && contrasena && nombreUsuario) {
        alert(`Bienvenido, ${nombreUsuario}`);
        cerrarFormulario();
        mostrarPaginaBusqueda();
    } else {
        alert("Por favor complete todos los campos.");
    }
}

// Mostrar página de búsqueda
function mostrarPaginaBusqueda() {
    document.getElementById('paginaInicio').style.display = 'none';
    document.getElementById('paginaBusqueda').style.display = 'block';
}

// Cerrar sesión
function cerrarSesion() {
    alert('Sesión cerrada');
    document.getElementById('paginaBusqueda').style.display = 'none';
    document.getElementById('paginaInicio').style.display = 'block';
}

// Mostrar carrito
function mostrarCarrito() {
    document.getElementById('paginaBusqueda').style.display = 'none';
    document.getElementById('carrito').style.display = 'block';
}

// Agregar productos al carrito
function agregarCarrito(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;
    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    let productosHTML = '';
    carrito.forEach(item => {
        productosHTML += `<p>${item.producto} - $${item.precio}</p>`;
    });
    document.getElementById('productosCarrito').innerHTML = productosHTML;
    document.getElementById('totalCarrito').innerText = total;
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

// Realizar compra
function realizarCompra() {
    if (carrito.length > 0) {
        alert('Compra realizada con éxito!');
        vaciarCarrito();
    } else {
        alert('Tu carrito está vacío.');
    }
}

// Regresar a la página de búsqueda
function regresarBusqueda() {
    document.getElementById('carrito').style.display = 'none';
    document.getElementById('paginaBusqueda').style.display = 'block';
}
