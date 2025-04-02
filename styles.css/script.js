
// Función para mostrar el formulario de inicio de sesión
function mostrarFormulario() {
    document.getElementById("formularioRegistro").style.display = "block";
}

// Función para cerrar el formulario de inicio de sesión
function cerrarFormulario() {
    document.getElementById("formularioRegistro").style.display = "none";
}

// Función para iniciar sesión
function iniciarSesion() {
    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena").value;
    var nombreUsuario = document.getElementById("nombreUsuario").value;
    var captcha = document.getElementById("captcha").checked;

    // Validación de campos
    if (correo === "" || contrasena === "" || nombreUsuario === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (!captcha) {
        alert("Debes confirmar que no eres un robot.");
        return;
    }

    // Simulación de inicio de sesión exitoso
    alert("¡Bienvenido, " + nombreUsuario + "! Has iniciado sesión correctamente.");

    // Cerrar el formulario y mostrar la página de búsqueda
    cerrarFormulario();
    document.getElementById("paginaInicio").style.display = "none";
    document.getElementById("paginaBusqueda").style.display = "block";
}

// Función para cerrar sesión
function cerrarSesion() {
    // Mostrar la página de inicio y ocultar la página de búsqueda
    document.getElementById("paginaInicio").style.display = "block";
    document.getElementById("paginaBusqueda").style.display = "none";

    // Limpiar el carrito y los productos seleccionados
    vaciarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    // Asegurarse de que no haya errores en la consola
    console.log("Mostrando el carrito...");
    document.getElementById("Carrito").style.display = "block";
    document.getElementById("paginaBusqueda").style.display = "none";
}

// Función para mostrar la configuración
function mostrarConfiguracion() {
    // Asegurarse de que no haya errores en la consola
    console.log("Mostrando configuración...");
    document.getElementById("configuracion").style.display = "block";
    document.getElementById("paginaBusqueda").style.display = "none";
}

// Función para regresar a la página de búsqueda desde el carrito
function regresarBusqueda() {
    document.getElementById("Carrito").style.display = "none";
    document.getElementById("paginaBusqueda").style.display = "block";
}

// Función para regresar a la página de búsqueda desde la configuración
function regresarBusquedaDesdeConfiguracion() {
    document.getElementById("configuracion").style.display = "none";
    document.getElementById("paginaBusqueda").style.display = "block";
}

// Función para agregar productos al carrito
var carrito = [];
function agregarCarrito(nombreProducto, precio) {
    // Agregar el producto al carrito
    carrito.push({ nombre: nombreProducto, precio: precio });

    // Mostrar la cantidad de productos en el carrito
    document.getElementById("cartCount").textContent = carrito.length;

    // Actualizar el carrito
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    var productosCarrito = document.getElementById("productosCarrito");
    var totalCarrito = document.getElementById("totalCarrito");
    productosCarrito.innerHTML = ""; // Limpiar el carrito antes de agregar los productos

    var total = 0;
    carrito.forEach(function (producto) {
        var productoDiv = document.createElement("div");
        productoDiv.textContent = producto.nombre + " - $" + producto.precio;
        productosCarrito.appendChild(productoDiv);
        total += producto.precio;
    });

    // Actualizar el total
    totalCarrito.textContent = total;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    document.getElementById("cartCount").textContent = "0"; // Restablecer contador del carrito
    actualizarCarrito(); // Actualizar la vista del carrito
}

// Función para realizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. No puedes realizar la compra.");
    } else {
        alert("Compra realizada con éxito.");
        vaciarCarrito(); // Limpiar el carrito después de la compra
        regresarBusqueda(); // Regresar a la página de búsqueda
    }
}

// Función para filtrar la búsqueda
function filtrarBusqueda() {
    var filtroMarca = document.getElementById("filtroMarca").value.toLowerCase();
    var filtroPrecio = document.getElementById("filtroPrecio").value;
    var searchInput = document.getElementById("searchInput").value.toLowerCase();

    var productos = document.getElementsByClassName("producto");

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        var marca = producto.getAttribute("data-marca").toLowerCase();
        var precio = parseInt(producto.getAttribute("data-precio"));
        var nombre = producto.querySelector("h4").textContent.toLowerCase();

        // Verificar si el producto cumple con los filtros
        var cumpleFiltroMarca = filtroMarca === "" || marca.includes(filtroMarca);
        var cumpleFiltroPrecio = false;

        if (filtroPrecio === "bajo" && precio < 20000) {
            cumpleFiltroPrecio = true;
        } else if (filtroPrecio === "medio" && precio >= 20000 && precio <= 30000) {
            cumpleFiltroPrecio = true;
        } else if (filtroPrecio === "alto" && precio > 30000) {
            cumpleFiltroPrecio = true;
        }

        // Mostrar u ocultar el producto dependiendo de los filtros
        if (cumpleFiltroMarca && cumpleFiltroPrecio && nombre.includes(searchInput)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    }
}

// Mostrar la ventana emergente (modal) para el Producto 1
function mostrarModal() {
    document.getElementById("myModal").style.display = "flex";
}

// Cerrar la ventana emergente
function cerrarModal() {
    document.getElementById("myModal").style.display = "none";
}

// Función para agregar al carrito (dentro del modal del Producto 1)
function agregarCarrito() {
    alert("Producto agregado al carrito.");
}

// Función para realizar la compra
function realizarCompra() {
    alert("Compra realizada.");
}