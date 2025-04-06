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
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const captcha = document.getElementById("captcha").checked;

    if (!correo || !contrasena || !nombreUsuario || !captcha) {
        alert("Por favor completa todos los campos y marca el captcha.");
        return;
    }

    // Oculta página de inicio
    document.getElementById("paginaInicio").style.display = "none";
    
    // Muestra página de búsqueda completa
    document.getElementById("paginaBusqueda").style.display = "block";

    // Actualiza nombre y correo en configuración
    document.getElementById("correoUsuario").innerText = correo;
    document.getElementById("nombreUsuarioConfiguracion").innerText = nombreUsuario;
}

// Función para cerrar sesión
function cerrarSesion() {
    document.getElementById("paginaInicio").style.display = "block";
    document.getElementById("paginaBusqueda").style.display = "none";
    vaciarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    console.log("Mostrando el carrito...");
    document.getElementById("Carrito").style.display = "block";
    document.getElementById("paginaBusqueda").style.display = "none";
}

// Función para mostrar la configuración
function mostrarConfiguracion() {
    console.log("Mostrando configuración...");
    document.getElementById("configuracion").style.display = "block";
    document.getElementById("paginaBusqueda").style.display = "none";
}

// Función para regresar a la página de búsqueda desde el carrito
function regresarBusqueda() {
    document.getElementById("Carrito").style.display = "none";
    document.getElementById("paginaBusqueda").style.display = "block";
}

// Función para regresar desde configuración
function regresarBusquedaDesdeConfiguracion() {
    document.getElementById("configuracion").style.display = "none";
    document.getElementById("paginaBusqueda").style.display = "block";
}

// Carrito de compras
var carrito = [];

function agregarCarrito(nombreProducto, precio) {
    carrito.push({ nombre: nombreProducto, precio: precio });
    document.getElementById("cartCount").textContent = carrito.length;
    actualizarCarrito();
}

function actualizarCarrito() {
    var productosCarrito = document.getElementById("productosCarrito");
    var totalCarrito = document.getElementById("totalCarrito");
    productosCarrito.innerHTML = "";

    var total = 0;
    carrito.forEach(function (producto) {
        var productoDiv = document.createElement("div");
        productoDiv.textContent = producto.nombre + " - $" + producto.precio;
        productosCarrito.appendChild(productoDiv);
        total += producto.precio;
    });

    totalCarrito.textContent = total;
}

function vaciarCarrito() {
    carrito = [];
    document.getElementById("cartCount").textContent = "0";
    actualizarCarrito();
}

function realizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. No puedes realizar la compra.");
    } else {
        alert("Compra realizada con éxito.");
        vaciarCarrito();
        regresarBusqueda();
    }
}

// Filtro de búsqueda
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

        var cumpleMarca = filtroMarca === "" || marca.includes(filtroMarca);
        var cumplePrecio = false;

        if (filtroPrecio === "bajo" && precio < 20000) cumplePrecio = true;
        else if (filtroPrecio === "medio" && precio >= 20000 && precio <= 30000) cumplePrecio = true;
        else if (filtroPrecio === "alto" && precio > 30000) cumplePrecio = true;

        if (cumpleMarca && cumplePrecio && nombre.includes(searchInput)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    }
}

// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Realme GT 7 Pro",
        imagen: "fondo.JPG",
        caracteristicas: [
            "Pantalla: 6.78 pulgadas AMOLED con tecnología OLED Plus, 2780 x 1264 píxeles (1,5k), 120 Hz, HDR10+, 6500 nits",
            "Procesador: Qualcomm Snapdragon 8 Elite",
            "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB de almacenamiento",
            "Cámara Principal: 50 MP con apertura f/1.8 y estabilización óptica (OIS)",
            "Teleobjetivo periscópico: 50 MP con apertura f/2.65",
            "Ultra gran angular: 8 MP con apertura f/2.2",
            "Cámara Frontal: 16 MP con apertura f/2.45",
            "Batería y Carga rápida: 6500 mAh, Carga rápida de 120W",
            "Dimensiones: 162.5 x 76.9 x 8.6 mm, IP69, inmersión hasta 2m por 30 min",
            "Sistema Operativo: Realme UI 6.0, Android 15"
        ]
    },
    {
        id: 2,
        nombre: "Honor Magic 7 Pro",
        imagen: "honor magic7.jpg",
        caracteristicas: [
            "Pantalla: 6.8 pulgadas OLED, 2800 x 1800 píxeles, 120 Hz, 5000 nits",
            "Procesador: Qualcomm Snapdragon 8 Elite",
            "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB de almacenamiento",
            "Cámara Principal: 50 MP con apertura f/1.4 y f/2.0",
            "Teleobjetivo periscópico: 200 MP con apertura f/2.6 y zoom óptico 3x",
            "Ultra gran angular: 50 MP con apertura f/2.0",
            "Cámara Frontal: 50 MP + sensor ToF 3D",
            "Batería: 5270 mAh, Carga rápida 100W, inalámbrica 80W",
            "Dimensiones: 162.7 x 77.1 x 8.8 mm, IP69",
            "Sistema Operativo: MagicOS 9.0, Android 15"
        ]
    },
    {
        id: 3,
        nombre: "Samsung s25 Ultra",
        imagen: "producto 3.jpg",
        caracteristicas: [
            "Pantalla: 6.9 pulgadas AMOLED, 3120 x 1440, 120 Hz, 2600 nits",
            "Procesador: Qualcomm Snapdragon 8 Elite",
            "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB",
            "Sensor principal: 200 MP f/1.7 OIS",
            "Periscopio: 50 MP f/3.4 OIS, zoom 3x",
            "Ultra gran angular: 50 MP f/2.0",
            "Telefoto: 10 MP f/2.4 OIS",
            "Frontal: 12 MP f/2.2, video 4K 60fps",
            "Batería: 5000 mAh, carga 45W + inalámbrica 15W",
            "Dimensiones: 162.8 x 77.6 x 8.2 mm, IP69",
            "Sistema Operativo: One UI 7.1, Android 15",
            "Extras: S Pen, Wi-Fi 7, BT 5.4"
        ]
    },
    {
        id: 4,
        nombre: "Iphone 16 Pro Max",
        imagen: "iphone 16 pro max.jpg",
        caracteristicas: [
            "Pantalla: Super Retina XDR OLED 6.9”, 2868 x 1320, 120 Hz, 2800 nits",
            "Procesador: A18 Pro",
            "Memoria: 12GB/16GB RAM, 256GB/512GB/1TB",
            "Sensor principal: 48 MP OIS",
            "Ultra gran angular: 48 MP",
            "Teleobjetivo: 12 MP, zoom óptico 5x",
            "Frontal: 12 MP f/2.2",
            "Video: 4K Dolby Vision a 120fps",
            "Batería: 4685 mAh, carga 35W, inalámbrica 15W",
            "Dimensiones: 163 x 77.6 x 8.25 mm, titanio",
            "Sistema Operativo: iOS 18",
            "Extras: Apple Intelligence, Wi-Fi 7, BT 5.3"
        ]
    },
    {
        id: 5,
        nombre: "Xiaomi 14 Ultra",
        imagen: "xiaomi 14 ultra.jpg",
        caracteristicas: [
            "Pantalla: AMOLED LTPO 6.73”, WQHD+ 120 Hz, 3000 nits",
            "Procesador: Snapdragon 8 Gen 3",
            "Memoria: 12/16GB RAM, 256/512GB/1TB",
            "Principal: 50 MP Sony LYT-900 OIS",
            "Ultra Gran Angular: 50 MP IMX858 f/1.8",
            "Telefoto: 50 MP, zoom óptico 3.2x, OIS",
            "Periscopio: 50 MP, zoom óptico 5x, OIS",
            "Frontal: 32 MP f/2.0",
            "Batería: 5300 mAh, carga 90W, inalámbrica 80W",
            "Sistema Operativo: HyperOS basado en Android 14",
            "Extras: 5G, Wi-Fi 7, BT 5.4, NFC"
        ]
    }
];

// Modal dinámico
function abrirModal(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    document.getElementById('imagenProducto').src = producto.imagen;
    document.getElementById('nombreProducto').textContent = producto.nombre;

    const caracteristicasList = document.getElementById('caracteristicasProducto');
    caracteristicasList.innerHTML = '';
    producto.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.textContent = caracteristica;
        caracteristicasList.appendChild(li);
    });

    document.getElementById('modalProducto').style.display = "flex";
}

function cerrarModal() {
    document.getElementById('modalProducto').style.display = "none";
}
