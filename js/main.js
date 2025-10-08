//array de productos
const productos = [
    { id: 1, nombre: "sandia", precio: 10, ruta_img: "img/sandia.jpg" },
    { id: 2, nombre: "pomelo rojo", precio: 30, ruta_img: "img/pomelo-rojo.jpg" },
    { id: 3, nombre: "pomelo amarillo", precio: 50, ruta_img: "img/pomelo-amarillo.jpg" },
    { id: 4, nombre: "pera", precio: 70, ruta_img: "img/pera.jpg" },
    { id: 5, nombre: "naranja", precio: 20, ruta_img: "img/naranja.jpg" },
    { id: 6, nombre: "manzana", precio: 15, ruta_img: "img/manzana.jpg" },
    { id: 7, nombre: "mandarina", precio: 10, ruta_img: "img/mandarina.jpg" },
    { id: 8, nombre: "kiwi", precio: 30, ruta_img: "img/kiwi.jpg" },
    { id: 9, nombre: "frutilla", precio: 50, ruta_img: "img/frutilla.jpg" },
    { id: 10, nombre: "frambuesa", precio: 70, ruta_img: "img/frambuesa.png" },
    { id: 11, nombre: "banana", precio: 20, ruta_img: "img/banana.jpg" },
    { id: 12, nombre: "arandano", precio: 15, ruta_img: "img/arandano.jpg" },
    { id: 13, nombre: "ananá", precio: 15, ruta_img: "img/anana.jpg" }
];

//son const porque siempre van a referirse al mismo elemento
const contenedorProductos = document.querySelector("#contenedorProductos");
const contenedorCarrito = document.querySelector("#contenedorCarrito");
const barraBusqueda = document.querySelector("#barraBusqueda");
const nombreApellido = document.querySelector('#nombreApellido');
const ordNombre = document.querySelector('#ordNombre');
const ordPrecio = document.querySelector('#ordPrecio');

const contadorCarrito = document.querySelector('#contadorCarrito')

//Mis datos
//const porque son cosas que no van a cambiar
const alumno = {
    dni: 43448408,
    nombre: 'Daniel Ignacio',
    apellido: 'Ceriana'
}


//intento darle el valor que este en el localStorage, si no hay, lo declara vacio ([])
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Ejercicio 4
function mostrarProductos(productos) {
    //declara un auxiliar para despues reemplazar en el html
    let cartaProducto = "";
    productos.forEach((item) => {
        cartaProducto += `
              <div class="card-producto">
                  <img src="${item.ruta_img}" alt="${item.nombre}" />
                  <h3>${item.nombre}</h3>
                  <p>$ ${item.precio}</p>
                  <button onclick="agregarACarrito(${item.id})">Agregar al carrito</button>
              </div> `;
    });
    contenedorProductos.innerHTML = cartaProducto;
}


// EJERCICIO 4
// agrega un event listener para cuando se levanta una tecla del teclado
barraBusqueda.addEventListener("keyup", () => {
    filtrarProductos();
});
//filtra los productos segun lo que esta escrito en la barra de busqueda
function filtrarProductos() {
    let valorBusqueda = barraBusqueda.value;
    let productosFiltrados = productos.filter(f => f.nombre.includes(valorBusqueda));
    mostrarProductos(productosFiltrados);
}


//EJERCICIO 6
function mostrarCarrito() {
    //si no hay carrito, directamente no muestra el apartado
    if (carrito.length == 0) {
        contenedorCarrito.innerHTML = "";
    } else {
        let cartaCarrito = `
        <h3>Carrito</h3>    
        <ul>`;
        carrito.forEach((item, indice) => {
            cartaCarrito +=
                `<li class="bloque-item">
                <p class="nombre-item">${item.nombre} - $ ${item.precio}</p>
                <button class="boton-eliminar" onclick="eliminarItem(${indice})">Eliminar</button>
            </li>`

        });
        cartaCarrito += `</ul>
        <section class="abajoCarrito">        
        <button onclick='vaciarCarrito()'> Vaciar carrito </button>
        <p>Total:${carrito.reduce((total,a)=>total + a.precio,0)}</p>
        </section>
`;      //Arriba use un reduce para calcular el total deprecio en el carrito. 
//Se va actualizando cada vez que se llama a esta funcion, por lo que siempre tiene el precio actualizado
        //actualiza lo que se ve del carrito
        contenedorCarrito.innerHTML = cartaCarrito;

        console.log(carrito);
    }

    //actualiza el nav con la cantidad de productos
    contadorCarrito.textContent = `Carrito: ${carrito.length} Productos`
    //se muestra si o si, por lo que esta afuera del if
}

//#region localStorage y carrito
//CRUD de localStorage y carrito
//estas funciones manejan tanto el carrito como el localStorage
//cada vez que se modifica algo, se vuelve a mostrar el cambio en pantalla
//al mismo tiempo se actualizan ambas cosas


function agregarACarrito(id) {
    let itemSeleccionado = productos.find(f => f.id === id);
    carrito.push(itemSeleccionado);

    actualizarLocalStorage();
    mostrarCarrito();
}

//EJERCICIO 6
function eliminarItem(indice) {
    //segun el indice a borrar, borra 1
    carrito.splice(indice, 1);
    //vuelve a mostrar el carrito
    //Y actualiza el localStorage cada vez que se modifica algo
    mostrarCarrito();
    actualizarLocalStorage();
}
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito(); //Ya esta en la logica de la funcion, que si no hay nada, no se muestre el apartado carrito
    actualizarLocalStorage();
}
//(por lo general no pongo tildes porque queda incomodo en el teclado pero aca quedaba raro sino)
//usé esta funcion para evitar repetir el llamado a la funcion setItem que tiene dos parametros, me parece mas limpio
function actualizarLocalStorage() {
    //si el carrito es inexistente, lo elimina del localStorage
    //para evitar guardar informacion innecesaria (una vez declarado en el local storage, quedaria 
    //un carrito = [])
    if (carrito.length === 0) {
        localStorage.removeItem("carrito");
    } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}
//#endregion

function imprimirDatosAlumno() {
    //imprime en consola mis datos
    console.log(`Nombre y apellido: ${alumno.nombre} ${alumno.apellido}, DNI:${alumno.dni}`);
    //muestra en el nav mi nombre y apellido (directamente modifica el texto)
    nombreApellido.textContent = `${alumno.nombre} ${alumno.apellido}`;
}

function init() {
    imprimirDatosAlumno();
    mostrarProductos(productos);
    //en caso de haber carrito, ya lo estaria mostrando
    mostrarCarrito();
}

init();



//Ejercicio 8

ordNombre.addEventListener('click', ordenarNombre);
ordPrecio.addEventListener('click', ordenarPrecio);

function ordenarNombre() {
    //use function en vez de flecha por comodidad, iban a ser varias lineas
    productos.sort(function (a, b) {
        //a, b se refieren a dos items distintos que va a ir comparando
        //los paso a lowerCase en caso de que alguno tenga mayus
        //despues comparo cual es mas grande y segun eso cambio el return
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            ;
            return -1;
        }
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            ;
            return 1;
        }
        //si son iguales el orden se queda como esta
        return 0;
    });
    //actualiza lo que se muestra
    mostrarProductos(productos);
}
function ordenarPrecio() {
    //si la resta da positivo, lo toma como el 1 de arriba
    //negativo como el -1
    //y si es 0, 0
    productos.sort((a, b) => { return a.precio - b.precio });
    mostrarProductos(productos);
}

