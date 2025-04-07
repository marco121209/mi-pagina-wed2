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
            "Pantalla: 6.9 pulgadas AMOLED, 3120 x 1440 pixeles, 120 Hz, 2600 nits",
            "Procesador: Qualcomm Snapdragon 8 Elite",
            "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB de almacenamiento",
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
        caracteristicas:[
             "Pantalla: Super Retina XDR OLED de 6.9 pulgadas, 2868 x 1320 pixeles, 120 Hz HDR, 2800 nits", 
             "Procesador: A18 pro", 
             "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB de almacenamiento",
             "Sensor Principal: 48 MP con estabilizacion optica de imagen (OIS)",
             "Sensor principal: 48 MP con estabilizacion de imagen optica de imagen (OIS)",
             "Ultra gran angular: 48 MP",
             "Teleobjetivo: 12 MP y zoom optico de 5x",
             "Camara frontal: 12 MP f/2.2",
             "Video: grabacion en 4K Dolby Vision a 120 cps, ofreciendo una calidad cinematografica",
             "Batería y Carga: 4,685 mAh, Carga rápida de 35W y inalambrica de 15W",
             "Dimensiones: 163 x 77.6 x 8.25mm, fabricado con titanio de grado 5, ofreciendo una combinacion de resistencia y ligereza",
             "Sistema Operativo: IOS 18",
             "Otros: boton de control de la camara, Apple intelligence, compatibilidad con redes 5G, wi-fi 7 y bluetooth 5.3",] 
    },
    {
        id: 5,
        nombre: "Xiaomi 14 Ultra",
        imagen: "xiaomi 14 ultra.jpg",
        caracteristicas: [ 
            "Pantalla: AMOLED LTPO 6.73”, WQHD+ 120 Hz, 3000 nits",
            "Procesador: Snapdragon 8 Gen 3",
            "Memoria: 12/16GB RAM, 256/512GB/1TB de almacenamiento",
            "Principal: 50 MP Sony LYT-900 OIS",
            "Ultra Gran Angular: 50 MP IMX858 f/1.8",
            "Telefoto: 50 MP, zoom óptico 3.2x, OIS",
            "Periscopio: 50 MP, zoom óptico 5x, OIS",
            "Frontal: 32 MP f/2.0",
            "Batería: 5300 mAh, carga 90W, inalámbrica 80W",
            "Sistema Operativo: HyperOS, android 14",
            "Extras: 5G, Wi-Fi 7, BT 5.4, NFC" ]
    },
    {
        id: 6,
        nombre: "Huawei Pura 70 Ultra",
        imagen: "huawei pura 70.jpg",
        caracteristicas: [ 
            "Pantalla: OLED de 6.8 pulgadas con resolucion 1,5K”, 2844 x 1260 pixeles, 120 Hz, 2500 nits",
            "Procesador: HiSilicon Kirin 9010",
            "Memoria: 16GB RAM, 512GB/1TB de almacenamiento",
            "Trasera: Triple con sensor principal retractil de 50 MP (1 pulgada, apertura variable f/1.6-f/4.0, OIS)",
            "Ultra Gran Angular: 40 MP (f/2.2)",
            "Telefoto Macro: 50 MP (f/2.1, OIS, zoom optico 3.5x)",
            "Frontal: 13 MP (f/2.4) con autoenfoque",
            "Batería: 5200 mAh, carga 100W, inalámbrica 80W, inalambrica inversa 20W",
            "Sistema Operativo: HarmonyOS 4.2.",
            "Otros: certificion IP68, cencetividad satelital, bluetooth 5.2, NFC y sensor de huellas en pantalla" ]
    },
    {
        id: 7,
        nombre: "Asus Rog Phone 9 Pro",
        imagen: "asus rog.jpg",
        caracteristicas: [ 
            "Pantalla: AMOLED LTPO 6.78 pulgadas con resolucion Full HD+”, 2400 x 1080 pixeles, 185 Hz, 2500 nits",
            "Procesador: Snapdragon 8 Elite",
            "Memoria: 16/24GB RAM, 512GB/1TB de almacenamiento",
            "Trasera: Triple sensor principal de 50 MP (OIS)",
            "Ultra Gran Angular: 13 MP ",
            "Telefoto: 32 MP (zoom optico 3x)",
            "Frontal: 32 MP ",
            "Batería: 5800 mAh, carga 65W, inalámbrica 15W",
            "Sistema Operativo: ROG UI, android 15",
            "Extras: certificacion IP68, parlantes estereo, lectores de huellas en pantalla y resistencia al agua" ]
    },
    {
        id: 8,
        nombre: "Google Pxel 9 Pro",
        imagen: "google pixel9.jpg",
        caracteristicas: [ 
            "Pantalla: OLED 6.34 pulgadas”, 2856 x 1280 pixeles, 120 Hz, 3000 nits",
            "Procesador: Google Tensor G4",
            "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
            "Trasera:Triple con sensor principal de 50 MP (f/1.68,OIS) ",
            "Ultra Gran Angular: 48 MP (f/1.7, macro, 123°)",
            "Telefoto: 48 MP (f/2.8, zoom optico 5x, OIS)",
            "Frontal: 42 MP (f/2.2, 103°)",
            "Batería: 4,700 mAh, carga 45W, inalambrica 23W",
            "Sistema Operativo: Pixel UI, android 14",
            "Otros: resistencia IP68, Gorilla Glass Victus 2, lector de huellas ultrasonico bajo pantalla y altavoces estereo " ]
    },
    {
        id: 9,
        nombre: "Oppo Find X8 Pro",
        imagen: "oppo find x8.jpg",
        caracteristicas: [ 
            "Pantalla: AMOLED 6.78 pulgadas”, 2780 x 1264 pixeles, 120 Hz, 4500 nits",
            "Procesador: MediaTek Dimensity 9400",
            "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
            "Principal: 50 MP",
            "Ultra Gran Angular: 50 MP",
            "Teleobjetivo: 50 MP",
            "Frontal: 32 MP",
            "Batería: 5,910 mAh, carga 80W",
            "Sistema Operativo: ColorOS 15, android 15",
            "Otros: certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor de infrarrojos, lector de huellas dactiles de bajo de la pantalla y reconocimiento facial para mayor seguridad" ]
    },
    {
        id: 10,
        nombre: "Vivo X200 Pro",
        imagen: "vivo x200 pro.jpg",
        caracteristicas: [ 
            "Pantalla: AMOLED 6.78 pulgadas”, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
            "Procesador: MediaTek Dimensity 9400",
            "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
            "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
            "Ultra Gran Angular: 50 MP",
            "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
            "Frontal: 32 MP",
            "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
            "Sistema Operativo: Funtouch OS 15, android 15",
            "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos " ]
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
