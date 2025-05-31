document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");
  const menuToggle = menu.querySelector(".menu-toggle");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const content = document.getElementById("content");

  // Alternar menú en móvile
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  function highlightText(text) {
    // Eliminar resaltados previos
    document.querySelectorAll(".highlight").forEach((el) => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });

    if (text === "") return;

    const regex = new RegExp(
      text.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"),
      "gi"
    );
    const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      if (regex.test(node.nodeValue)) {
        const span = document.createElement("span");
        span.className = "highlight";
        span.innerHTML = node.nodeValue.replace(regex, "<mark>$1</mark>");
        node.parentNode.replaceChild(span, node);
      }
    });
  }

  function executeSearch() {
    const texto = searchInput.value.trim().toLowerCase();
    const productos = document.querySelectorAll(".producto");

    productos.forEach((producto) => {
      const nombre = producto.querySelector("h4").textContent.toLowerCase();
      if (nombre.includes(texto)) {
        producto.style.display = "flex";
      } else {
        producto.style.display = "none";
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", executeSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        executeSearch();
      }
    });
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioNombre");
  localStorage.removeItem("usuarioCorreo");

  alert("Sesión cerrada.");
  window.location.href = "index.html";
}

// Función para mostrar el carrito
document.addEventListener("DOMContentLoaded", function () {
  const botonesCarrito = document.querySelectorAll(".producto .carrito");

  botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      e.stopPropagation(); // evitar abrir detalles
      const producto = this.closest(".producto");
      const nombre = producto.querySelector("h4").textContent;
      const precio = parseInt(producto.getAttribute("data-precio"));
      const imagen = producto.querySelector("img").getAttribute("src");

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push({ nombre, precio, imagen });

      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert("Producto agregado al carrito.");
    });
  });
});

// Función para mostrar la configuración
function mostrarConfiguracion() {
  console.log("Mostrando configuración...");
  const nombre = localStorage.getItem("usuarioNombre") || "No disponible";
  const correo = localStorage.getItem("usuarioCorreo") || "No disponible";

  document.getElementById("nombreUsuarioConfiguracion").textContent = nombre;
  document.getElementById("correoUsuario").textContent = correo;

  document.getElementById("configuracion").style.display = "block";
  document.getElementById("paginaBusqueda").style.display = "block";
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

//Contador
let tiempoRestante = 0;
let intervaloContador;

// Función para generar horas aleatorias entre 1 y 72
function generarNuevaDuracion() {
  const horas = Math.floor(Math.random() * 72) + 1; // entre 1 y 72
  return horas * 3600; // convertir a segundos
}

// Función para iniciar o reiniciar el contador
function iniciarContador() {
  tiempoRestante = generarNuevaDuracion();

  if (intervaloContador) clearInterval(intervaloContador);

  intervaloContador = setInterval(() => {
    const horas = Math.floor(tiempoRestante / 3600);
    const minutos = Math.floor((tiempoRestante % 3600) / 60);
    const segundos = tiempoRestante % 60;

    document.getElementById("contadorPromocion").textContent = `${String(
      horas
    ).padStart(2, "0")} : ${String(minutos).padStart(2, "0")} : ${String(
      segundos
    ).padStart(2, "0")}`;

    if (tiempoRestante > 0) {
      tiempoRestante--;
    } else {
      clearInterval(intervaloContador);

      // Se queda en 00:00:00 por 20 segundos
      setTimeout(() => {
        iniciarContador(); // Vuelve a empezar con nueva duración
      }, 20000);
    }
  }, 1000);
}
// Llamamos a iniciar el contador apenas carga
document.addEventListener("DOMContentLoaded", iniciarContador);

// Función para manejar el toggle de las categorías
document.addEventListener("DOMContentLoaded", function () {
  // Filtrar productos según selecciones
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"], input[type="radio"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filtrarProductos);
  });

  // Toggle para expandir/colapsar categorías
  const categoriaHeaders = document.querySelectorAll(".categoria strong");
  categoriaHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const categoriaContent =
        this.parentElement.querySelectorAll("label, div, a");
      let isVisible = false;

      categoriaContent.forEach((element) => {
        if (
          element.style.display === "none" ||
          getComputedStyle(element).display === "none"
        ) {
          element.style.display = element.tagName === "DIV" ? "flex" : "block";
          isVisible = true;
        } else {
          element.style.display = "none";
          isVisible = false;
        }
      });

      // Cambiar el símbolo + o - según estado
      if (isVisible) {
        this.style.setProperty("--symbol", '"−"');
      } else {
        this.style.setProperty("--symbol", '"+"');
      }
    });
  });

  // Mostrar/ocultar opciones adicionales
  document.querySelectorAll(".categoria a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const hiddenOptions = this.parentElement.querySelectorAll(
        "label:nth-child(n+7)"
      );
      hiddenOptions.forEach((option) => {
        option.style.display =
          option.style.display === "none" ||
          getComputedStyle(option).display === "none"
            ? "block"
            : "none";
      });
      this.textContent =
        this.textContent === "Mostrar más" ? "Mostrar menos" : "Mostrar más";
    });
  });
});

function filtrarProductos() {
  const marcasSeleccionadas = Array.from(
    document.querySelectorAll('input[name="marca"]:checked')
  ).map((cb) => cb.value.toLowerCase());

  const precioSeleccionado = document.querySelector(
    'input[name="precio"]:checked'
  )?.value;

  // Captura mínimo y máximo
  let precioMin = document.getElementById("precioMinimo").value;
  let precioMax = document.getElementById("precioMaximo").value;

  const precioMinimo = precioMin !== "" ? parseInt(precioMin) : 0;
  const precioMaximo = precioMax !== "" ? parseInt(precioMax) : Infinity;

  const productos = document.querySelectorAll(".producto");

  productos.forEach((producto) => {
    const marca = producto.getAttribute("data-marca").toLowerCase();
    const precio = parseInt(producto.getAttribute("data-precio"));

    const porMarca =
      marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(marca);

    const porMinMax = precio >= precioMinimo && precio <= precioMaximo;

    let porRadio = true;
    if (precioSeleccionado) {
      switch (precioSeleccionado) {
        case "1":
          porRadio = precio < 1499;
          break;
        case "2":
          porRadio = precio >= 1500 && precio <= 5499;
          break;
        case "3":
          porRadio = precio >= 5500 && precio <= 10499;
          break;
        case "4":
          porRadio = precio >= 10500 && precio <= 16499;
          break;
        case "5":
          porRadio = precio > 16500;
          break;
      }
    }

    const mostrar = porMarca && porMinMax && porRadio;

    producto.style.display = mostrar ? "flex" : "none";
  });
}

function irADetalleProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (producto)
    localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
  window.location.href = "detalle.html" || 24999;
}

// Datos de productos
const productos = [
  {
    id: 1,
    nombre: "Realme GT 7 Pro",
    precio: 30000,
    imagen: "realme gt 7.jpg",
    video: "",
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
      "Sistema Operativo: Realme UI 6.0, Android 15",
    ],
  },
  {
    id: 2,
    nombre: "Honor Magic 7 Pro",
    precio: 29999,
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
      "Sistema Operativo: MagicOS 9.0, Android 15",
    ],
  },
  {
    id: 3,
    nombre: "Samsung s25 Ultra",
    precio: 32999,
    imagen: "Samsung s25 Ultra.jpg",
    imagenes: ["Samsung s25 Ultra.jpg", "s25 de lado.jpg", "s25 ultra de atras.jpg"],
    video: "s25 ultra.mp4",
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
      "Extras: S Pen, Wi-Fi 7, BT 5.4",
    ],
  },
  {
    id: 4,
    nombre: "Iphone 16 Pro Max",
    precio: 25999,
    imagen: "iphone 16 pro max.jpg",
    caracteristicas: [
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
      "Otros: boton de control de la camara, Apple intelligence, compatibilidad con redes 5G, wi-fi 7 y bluetooth 5.3",
    ],
  },
  {
    id: 5,
    nombre: "Xiaomi 14 Ultra",
    precio: 24999,
    imagen: "xiaomi 14 ultra.jpg",
    imagenes: ["xiaomi 14 ultra.jpg", "xiaomi 14 u. de lado.jpg"],
    video: "xiaomi 14 ultra.mp4",
    caracteristicas: [
      "Pantalla: AMOLED LTPO 6.73, WQHD+ 120 Hz, 3000 nits",
      "Procesador: Snapdragon 8 Gen 3",
      "Memoria: 12/16GB RAM, 256/512GB/1TB de almacenamiento",
      "Principal: 50 MP Sony LYT-900 OIS",
      "Ultra Gran Angular: 50 MP IMX858 f/1.8",
      "Telefoto: 50 MP, zoom óptico 3.2x, OIS",
      "Periscopio: 50 MP, zoom óptico 5x, OIS",
      "Frontal: 32 MP f/2.0",
      "Batería: 5300 mAh, carga 90W, inalámbrica 80W",
      "Sistema Operativo: HyperOS, android 14",
      "Extras: 5G, Wi-Fi 7, BT 5.4, NFC",
    ],
  },
  {
    id: 6,
    nombre: "Huawei Pura 70 Ultra",
    precio: 30999,
    imagen: "huawei pura70.jpg",
    imagenes: [
      "huawei pura70 de frente.jpg",
      "huawei p70 ultra de lado.jpg",
      "huawei pura70.jpg",
    ],
    video: "huawei pura 70 ultra.mp4",
    caracteristicas: [
      "Pantalla: OLED de 6.8 pulgadas con resolucion 1,5K, 2844 x 1260 pixeles, 120 Hz, 2500 nits",
      "Procesador: HiSilicon Kirin 9010",
      "Memoria: 16GB RAM, 512GB/1TB de almacenamiento",
      "Trasera: Triple con sensor principal retractil de 50 MP (1 pulgada, apertura variable f/1.6-f/4.0, OIS)",
      "Ultra Gran Angular: 40 MP (f/2.2)",
      "Telefoto Macro: 50 MP (f/2.1, OIS, zoom optico 3.5x)",
      "Frontal: 13 MP (f/2.4) con autoenfoque",
      "Batería: 5200 mAh, carga 100W, inalámbrica 80W, inalambrica inversa 20W",
      "Sistema Operativo: HarmonyOS 4.2.",
      "Otros: certificion IP68, cencetividad satelital, bluetooth 5.2, NFC y sensor de huellas en pantalla",
    ],
  },
  {
    id: 7,
    nombre: "Asus Rog Phone 9 Pro",
    precio: 26999,
    imagen: "asus rog.jpg",
    imagenes: [
      "asus rog.jpg",
      "asus rog 9 de lado.jpg",
      "asus rog 9 de atras.jpg",
    ],
    video: "asus rog phone 9 pro.mp4",
    caracteristicas: [
      "Pantalla: AMOLED LTPO 6.78 pulgadas con resolucion Full HD+, 2400 x 1080 pixeles, 185 Hz, 2500 nits",
      "Procesador: Snapdragon 8 Elite",
      "Memoria: 16/24GB RAM, 512GB/1TB de almacenamiento",
      "Trasera: Triple sensor principal de 50 MP (OIS)",
      "Ultra Gran Angular: 13 MP ",
      "Telefoto: 32 MP (zoom optico 3x)",
      "Frontal: 32 MP ",
      "Batería: 5800 mAh, carga 65W, inalámbrica 15W",
      "Sistema Operativo: ROG UI, android 15",
      "Extras: certificacion IP68, parlantes estereo, lectores de huellas en pantalla y resistencia al agua",
    ],
  },
  {
    id: 8,
    nombre: "Google Pxel 9 Pro",
    precio: 24999,
    imagen: "google pixel 9.jpg",
    imagenes: [
      "google pixel 9.jpg",
      "google pixel9 de lado.jpg",
      "google pixel9 de costado.jpg",
      "google pixel9 de atras.jpg",
    ],
    video: "google pixel9 pro.mp4",
    caracteristicas: [
      "Pantalla: OLED 6.34 pulgadas, 2856 x 1280 pixeles, 120 Hz, 3000 nits",
      "Procesador: Google Tensor G4",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera:Triple con sensor principal de 50 MP (f/1.68,OIS) ",
      "Ultra Gran Angular: 48 MP (f/1.7, macro, 123°)",
      "Telefoto: 48 MP (f/2.8, zoom optico 5x, OIS)",
      "Frontal: 42 MP (f/2.2, 103°)",
      "Batería: 4,700 mAh, carga 45W, inalambrica 23W",
      "Sistema Operativo: Pixel UI, android 14",
      "Otros: resistencia IP68, Gorilla Glass Victus 2, lector de huellas ultrasonico bajo pantalla y altavoces estereo ",
    ],
  },
  {
    id: 9,
    nombre: "Oppo Find X8 Pro",
    precio: 18999,
    imagen: "oppo find x8.jpg",
    video: "oppo find x8.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2780 x 1264 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Principal: 50 MP",
      "Ultra Gran Angular: 50 MP",
      "Teleobjetivo: 50 MP",
      "Frontal: 32 MP",
      "Batería: 5,910 mAh, carga 80W",
      "Sistema Operativo: ColorOS 15, android 15",
      "Otros: certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor de infrarrojos, lector de huellas dactiles de bajo de la pantalla y reconocimiento facial para mayor seguridad",
    ],
  },
  {
    id: 10,
    nombre: "Vivo X200 Pro",
    precio: 27899,
    imagen: "vivo x200 pro.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 11,
    nombre: "OnePlus 13",
    precio: 22799,
    imagen: "oneplus 13.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 12,
    nombre: "Nubia Z70 Ultra",
    precio: 16999,
    imagen: "nubia z70.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 13,
    nombre: "Nubia Redmagic 10 Pro",
    precio: 24999,
    imagen: "redmagic 10.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 14,
    nombre: "Samsung S25 Plus",
    precio: 20999,
    imagen: "s25+.jpg",
    video: "samsung s25 plus.mp4",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 15,
    nombre: "Samsung S24 Ultra",
    precio: 22999,
    imagen: "s24 ultra.jpg",
    imagenes: [
      "s24 ultra.jpg",
      "s24 ultra de lado.jpg",
      "s24 ultra de atras.jpg",
    ],
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 16,
    nombre: "Poco F7 Pro",
    precio: 10999,
    imagen: "poco f7 pro.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 17,
    nombre: "Iphone 15 Pro Max",
    precio: 27999,
    imagen: "iphone 15 pro max.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 18,
    nombre: "Nubia Z60 Ultra",
    precio: 14999,
    imagen: "z60 ultra.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 19,
    nombre: "Realme Neo 7",
    precio: 7999,
    imagen: "realme neo7.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 20,
    nombre: "Xiaomi MI 15 Ultra",
    precio: 34999,
    imagen: "xiaomi 15.jpg",
    video: "xiaomi mi 15.mp4",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 21,
    nombre: "Realme 14 Pro Plus",
    precio: 9999,
    imagen: "realme 14 pro+.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 22,
    nombre: "Huawei Mate XT Ultimate Design",
    precio: 69999,
    imagen: "huawei mate xt.jpg",
    video: "huawei mate xt.mp4",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 23,
    nombre: "Realme Note 50",
    precio: 2999,
    imagen: "realme note 50.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 24,
    nombre: "Samsung Galaxy Z Fold 6",
    precio: 42999,
    imagen: "z fold 6.jpg",
    video: "samsung z fold 6.mp4",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 25,
    nombre: "Vivo X100 Pro Plus",
    precio: 19999,
    imagen: "vivo x100 pro+.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 26,
    nombre: "Asus Rog Phone 8 Pro",
    precio: 21999,
    imagen: "asus rog phone 8 pro.jpg",
    video: "asus rog phone 8.mp4",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 27,
    nombre: "OnePlus 12 Pro",
    precio: 17499,
    imagen: "oneplus 12.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 28,
    nombre: "Asus Zenfone 11 Ultra",
    precio: 25599,
    imagen: "asus zenfone 11.jpg",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
  },
  {
    id: 29,
    nombre: "Xiaomi Mix Fold 4",
    precio: 38999,
    imagen: "xiaomi mix fold 4.jpg",
    video: ".mp4",
    caracteristicas: [
      "Pantalla: AMOLED 6.78 pulgadas, 2800 x 1260 pixeles, 120 Hz, 4500 nits",
      "Procesador: MediaTek Dimensity 9400",
      "Memoria: 16 de RAM, 256/512GB/1TB de almacenamiento",
      "Trasera: 50 MP con apertura f/1.57 y estabilizacion optica (OIS)",
      "Ultra Gran Angular: 50 MP",
      "Periscopio: 200 MP con apertura f/2.67 y zoom optico 3.5x",
      "Frontal: 32 MP",
      "Batería: 6,000 mAh, carga 90W, inalambrica 30W",
      "Sistema Operativo: Funtouch OS 15, android 15",
      "Otros:  certificacion IP68, red 5G, WI-FI 7, bluetooth 5.4, NFC, GPS de doble banda, sensor infrarrojos, altavoces duales, lector de huellas dactiles bajo la pantalla y chip de seguridad para proteccion de datos ",
    ],
    precio: {
      "128 GB": 500,
      "256 GB": 600,
      "512 GB": 700,
    },
  },
];

// Mostrar promociones al hacer clic
document.getElementById("btnPromociones").addEventListener("click", () => {
  document.getElementById("promocionesProductos").style.display = "block";

  const contenedor = document.getElementById("contenedorPromociones");
  contenedor.innerHTML = ""; // Limpiar

  promociones.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.setAttribute("data-marca", producto.marca);
    div.setAttribute("data-precio", producto.precio);

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
      <div class="botones">
        <button class="carrito" onclick="agregarAlCarrito(${
          producto.id
        })">Agregar al carrito</button>
        <button class="comprar" onclick="irADetalleProducto(${
          producto.id
        })">Comprar</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
});

// Mostrar datos en el modal
function mostrarDatosCelular() {
  document.getElementById("nombre-celular").textContent = celular.nombre;

  const lista = document.getElementById("lista-caracteristicas");
  lista.innerHTML = "";
  celular.caracteristicas.forEach((carac) => {
    const li = document.createElement("li");
    li.textContent = carac;
    lista.appendChild(li);
  });

  const select = document.getElementById("almacenamiento");
  select.innerHTML = "";
  for (let option in celular.precio) {
    const option = document.createElement("option");
    option.value = celular.precio[option];
    option.textContent = "${option} - $${celular.precio[option]}";
    select.appendChild(option);
  }

  document.getElementById("precio").textContent = select.value;
}

// Evento para cambiar precio al seleccionar almacenamiento
document
  .getElementById("almacenamiento")
  .addEventListener("change", function () {
    document.getElementById("precio").textContent = this.value;
  });

// Modal dinámico
function abrirModal(idProducto) {
  const producto = productos.find((p) => p.id === idProducto);
  document.getElementById("imagenProducto").src = producto.imagen;
  document.getElementById("nombreProducto").textContent = producto.nombre;

  const caracteristicasList = document.getElementById(
    "caracteristicasProducto"
  );
  caracteristicasList.innerHTML = "";
  producto.caracteristicas.forEach((caracteristica) => {
    const li = document.createElement("li");
    li.textContent = caracteristica;
    caracteristicasList.appendChild(li);
  });


  document.getElementById("modalProducto").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalProducto").style.display = "none";
}
// inspeeccion fina