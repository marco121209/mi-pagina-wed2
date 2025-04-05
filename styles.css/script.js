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

// Datos de los productos 
const productos = [
    {
        id: 1,
        nombre: "Realme GT 7 Pro",
        imagen: "fondo.JPG",
        caracteristicas: ["Pantalla: 6.78 pulgadas AMOLED con tecnología OLED Plus, 2780 x 1264 píxeles (1,5k), 120 Hz, HDR10+, 6500 nits\"",
             "Procesador:  Qualcomm Snapdragon 8 Elite",
             "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB de almacenamiento",
            "Cámara Principal: 50 MP con apertura f/1.8 y estabilización óptica (OIS)",
            "Teleobjetivo periscópico: 50 MP con apertura f/2.65",
            "Ultra gran angular: 8 MP con apertura f/2.2",
            "Cámara Frontal: 16 MP con apertura f/2.45",
            "Bateria y Carga rapida: 6500 mAh, Carga rápida de 120W", 
            "Dimensiones y Cracteristicas:162.5 x 76.9 x 8.6 mm, Resistencia al agua y polvo: certificación IP69; permitiendo inmersión hasta 2 metros durante 30 minutos",
            "Sistema Operativo:Realme UI 6.0, Android 15",]
    },
    {
        id: 2,
        nombre: "Honor Magic 7 Pro",
        imagen: "honor magic7.jpg",
        caracteristicas: ["Pantalla: 6.8 pulgadas OLED, 2800 x 1800 píxeles, 120 Hz, 5000 nits",
             "Procesador:Qualcomm Snapdragon 8 Elite", 
             "Memoria: 12GB/16GB de RAM, 256GB/Procesador:Qualcomm Snapdragon 8 Elite512GB/1TB de almacenamiento",
             "Cámara Principal: 50 MP con apertura (f/1.4 y f/2.0)",
             "Teleobjetivo periscópico: 200 MP con apertura f/2.6 y zoom optico de 3x",
             "Ultra gran angular: 50 MP con apertura f/2.0",
             "Cámara Frontal: 50 MP acompañada de un sensor Tof 3D para desbloqueo facial 3D y selfies de alta calidad",
             "Batería y Carga: 5,270 mAh, Carga rápida de 100W y inalambrica de 80W",
             "Dimensiones y Resistencia: 162.7 x 77.1 x 8.8 mm, Resistencia al polvo y agua: certificación IP69 e IP69",
             "Sistema Operativo: MagicOS 9.0, Android 15",]
    },
    {
        id: 3,
        nombre: "Samsung s25 Ultra",
        imagen: "producto 3.jpg",
        caracteristicas: ["6.9 pulgadas AMOLED, 3120 x 1440 píxeles, 120 Hz, 2600 nits, Porteccion Corning Gorilla Glass Amor 2", 
             "Qualcomm Snapdragon 8 Elite", 
             "Memoria: 12GB/16GB de RAM, 256GB/512GB/1TB de almacenamiento",
             "Sensor principal: 200 MP con apertura f/1.7, enfoque automatico multidirrecional y establizacion optica de imagen (OIS)",
             "Lente periscopica telefoto: 50 MP con apertura f/3.4 (OIS) y zoom optico de 3x",
             "Ultra gran angular: 50 MP con apertura f/2.0",
             "Telefoto: 10 MP f/2.4 (OIS) y zoom optico de 3x",
             "Camara frontal:12 MP f/2.2 y enfoque automatico, capaz de grabar video en 4K a 30/60 fps",
             "Batería y Carga: 5,000 mAh, Carga rápida de 45W y inalambrica de 15W",
             "Dimensiones y Resistencia: 162.8 x 77.6 x 8.2 mm, Resistencia al polvo y agua: certificación IP69 e IP69, Construccion premium con marco de titanio de grado 5 y proteccion Gorilla Glass Victus 2 en la parte posterior",
             "Sistema Operativo: One UI 7.1, Android 15",
             "Otros:Incorpora el S pen, Sensor de huellas dactiles ultrasonico integrado en la pantalla, compatibilidad con redes 5G, wi-fi 7 y bluetooth 5.4",]
    },
    {
        id: 4,
        nombre: "Iphone 16 Pro Max",
        imagen: "iphone 16 pro max.jpg",
        caracteristicas:["Pantalla: Super Retina XDR OLED de 6.9 pulgadas, 2868 x 1320 pixeles, 120 Hz HDR, 2800 nits", 
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
             "Otros: boton de control de la camara, Apple intelligence, compatibilidad con redes 5G, wi-fi 7 y bluetooth 5.3",] ["Pantalla AMOLED", "Cámara de 108MP", "Cargador rápido incluido"]
    },
    {
        id: 5,
        nombre: "Xiaomi 14 Ultra",
        imagen: "xiaomi 14 ultra.jpg",
        caracteristicas: ["Pantalla: AMOLED LTPO de 6.73 pulgadas, WQHD+(3200 x 1440), 120 Hz, 3000 nits, Xiaomi Shield Glass",
             "Procesador: Qualcomm Snapdragon 8 Gen 3", 
             "Memoria: 12/16GB de RAM, 256/512GB/1TB de almacenamiento",
             "Camara Principal: 50 MP, sensor Sony LYT-900, apertura variable f/1.6-f/4.0, estabilizacion optica (OIS)",
             "Ultra Gran Angular: 50 MP, sensor Sony IMX858, campo de vsion de 122°, apertura f/1.8",
             "Telefoto: 50 MP, sensor Sony IMX858, zoom optico 3.2x, apertura f/1.8, (OIS)",
             "Super Telefoto Periscopio: 50 MP, sensor Sony IMX858, zoom optico 5x, apertura f/2.5, (OIS)",
             "Frontal: 32 MP, apertura f/2.0",
             "Bateria y Carga: 5,300 mAh, carga rapida de 90W, carga inalambrica 80W, carga inalambrica inversa 10W",
             "Sistema Operativo: HyperOS basado en android 14",
             "Otros: red 5G, WI-FI 7, Bluetooth 5.4, Altavoces duales con Dolby Atmos",
             "NFC: si"]
    },
];

// Función para abrir el modal con la información del producto seleccionado
function abrirModal(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    
    // Actualizar contenido del modal
    document.getElementById('imagenProducto').src = producto.imagen;
    document.getElementById('nombreProducto').textContent = producto.nombre;
    const caracteristicasList = document.getElementById('caracteristicasProducto');
    caracteristicasList.innerHTML = ''; // Limpiar lista anterior
    producto.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.textContent = caracteristica;
        caracteristicasList.appendChild(li);
    });

    // Mostrar el modal
    document.getElementById('modalProducto').style.display = "flex";
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modalProducto').style.display = "none";
}