// function nombre(){
//     let nombre = prompt(("Escriba un nombre de usuario:"));
//     if (nombre == nombre) {
//         alert("Bienvenido " + nombre)
//     };
// }

// nombre()

// let edad = parseInt(prompt("Pon tu edad:"))
// do{

//     if (edad >= 18) {
//         alert("Sos mayor de edad. Bienvenido!")
//     }else{
//         alert("Sos menor de edad")
//         edad = parseInt(prompt("Lo siento, tienes que ser mayor de edad. Vuelva a intentarlo"))
//     }
// }
// while( edad < 18)



// flitro de busqueda 


const productsMates = [
    { nombre: "Mate camionero" },
    { nombre: "Mate calabaza" },
    { nombre: "Termo stanley" },
    { nombre: "Mate Argentino" },
    { nombre: "Mate personalizado" },
    { nombre: "Termo contigo" },
    { nombre: "Canasta uruguaya"},
    { nombre: "Mochila matera"},
    { nombre: "Portatermo matero"},

];

const buscadorInput = document.querySelector("#buscadorInput");

const resultadosList = document.querySelector("#resultadosList");

const noResultados = document.querySelector("#noResultados");

const caritoDeCompra = document.querySelector("#carrito");

const modalContainer = document.querySelector("#modalContainer");

const cantidadProducto = document.querySelector("#cantidadProducto");


const handleSearch = () => {
    const buscadorTerm = buscadorInput.value.toLowerCase();
    const filteredMates = productsMates.filter((mates) => mates.nombre.toLowerCase().includes(buscadorTerm));

    resultadosList.innerHTML = "";

    if (filteredMates.length === 0) {
        noResultados.style.display = "block"
    } else {
        filteredMates.forEach((mates) => {
            const li = document.createElement("li");
            li.textContent = mates.nombre;
            resultadosList.appendChild(li);
        });
        noResultados.style.display = "none";
    }


    if (buscadorInput.value === "") {
        resultadosList.innerHTML = ""
    };
};

buscadorInput.addEventListener("input", handleSearch);

//tarjetas de productos hecho en javascript

// la lista de productos
const productoTarjetas = [
    {
        id: "mate-1",
        titulo: "Mate camionero",
        imagen: "./imagenes/img-1.webp",
        descripcion: "Mate Camionero De Vidrio Cuero Vacuno Virola De Aluminio",
        precio: 1000,
        cantidad: 1,
    },
    {
        id: "mate-2",
        titulo: "Mate calabaza",
        imagen: "./imagenes/img-2.jpg",
        descripcion: "Mate Calabaza De Vidrio Cuero Vacuno Virola De Aluminio",
        precio: 3000,
        cantidad: 1,
    },
    {
        id: "mate-3",
        titulo: "Mate argentino",
        imagen: "./imagenes/mate-argentino.jpg",
        descripcion: "Mate argentino De Vidrio Cuero Vacuno Virola De Aluminio",
        precio: 4000,
        cantidad: 1,
    },
    {
        id: "mate-4",
        titulo: "Mate personalizado",
        imagen: "./imagenes/img-1.webp",
        descripcion: "Mate personalizado ipsum dolor sit amet consectetur.",
        precio: 4000,
        cantidad: 1,
    },
    {
        id: "mate-5",
        titulo: "Mate personalizado ",
        imagen: "./imagenes/mate-5.jpg",
        descripcion: "Mate personalizado ipsum dolor sit amet consectetur.",
        precio: 4000,
        cantidad: 1,
    },
    {
        id: "mate-6",
        titulo: "Mate AFA",
        imagen: "./imagenes/mate-6.jpg",
        descripcion: "Mate personalizado ipsum dolor sit amet consectetur.",
        precio: 4000,
        cantidad: 1,
    },

    //termo
    {
        id: "termo-1",
        titulo: "Termo stanley",
        imagen: "./imagenes/termo-1.jpg",
        descripcion: "Termo stanley Lorem ipsum dolor sit amet consectetur.",
        precio: 8000,
        cantidad: 1,
    },
    {
        id: "termo-2",
        titulo: "Termo contigo",
        imagen: "./imagenes/termo-2.jpg",
        descripcion: "Termo contigo Lorem ipsum dolor sit amet consectetur.",
        precio: 10000,
        cantidad: 1,
    },
    {
        id: "termo-3",
        titulo: "Termo contigo",
        imagen: "./imagenes/termo-3.jpg",
        descripcion: "Termo contigo Lorem ipsum dolor sit amet consectetur.",
        precio: 10000,
        cantidad: 1,
    },
    {
        id: "termo-4",
        titulo: "Termo stanley",
        imagen: "./imagenes/termo-4.jpg",
        descripcion: "Termo contigo Lorem ipsum dolor sit amet consectetur.",
        precio: 10000,
        cantidad: 1,
    },
    //materas
    {
        id: "matera-1",
        titulo: "Canasta Uruguaya ",
        imagen: "./imagenes/matera-1.jpg",
        descripcion: "Matera Portatermo Cuero Premium Legítimo. ipsum dolor.",
        precio: 16700
    },
    {
        id: "matera-2",
        titulo: "Mochila matera porta Notebook ",
        imagen: "./imagenes/matera-2.jpg",
        descripcion: "Mochila matera porta Notebook ",
        precio: 14000,
        cantidad: 1,
    },
    {
        id: "matera-3",
        titulo: "Portatermo Matero morral ",
        imagen: "./imagenes/matera-3.jpg",
        descripcion: "TiendaMate cuero Bufalo Premium",
        precio: 28000,
        cantidad: 1,
    }

];


//carrito
let carrito = [];



const contenedorTarjetas = document.querySelector("#contenedorDeTarjetas");

function cargarProductos() {
    productoTarjetas.forEach(tarjeta => {
        //tarjeta de los productos
        const div = document.createElement("div");
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-img img-fluid" src="${tarjeta.imagen}" alt="mate camionero">
            <div class="productos-datos">
                <h3 class="producto-titulo">${tarjeta.titulo}</h3>
                <p class ="descripcionTarjetas">${tarjeta.descripcion} </p>
                <p class="producto-precio">$${tarjeta.precio}</p>
                
            </div>
        `
        contenedorTarjetas.append(div);
        //boton de compra de la tarjeta 
        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";
        comprar.classList.add("producto-agregar");

        div.append(comprar);

        //agregar producto al carrito apretando el boton de compra de la tarjeta y puede aumentar el producto en el modal de compras  
        comprar.addEventListener("click", () => {

            const repeat = carrito.some((repeatProducto) => repeatProducto.id === tarjeta.id);
            
            if (repeat) {
                carrito.map((product) =>{
                    if(product.id === tarjeta.id){
                        product.cantidad++;
                    }
                });

            }else{
                carrito.push({
                    id: tarjeta.id,
                    titulo: tarjeta.titulo,
                    imagen: tarjeta.imagen,
                    precio: tarjeta.precio,
                    cantidad: tarjeta.cantidad,
                });
            }
            console.log(carrito);
            sumaDeCarritoLogo();
        })


    })


};

cargarProductos()



//modal

const contenedorModal = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `

            <h1 class="modal-header-title"> Productos Comprados </h1>
        
        `;
    modalContainer.append(modalHeader);

    const modalBotton = document.createElement("h2");
    modalBotton.innerText = "X";
    modalBotton.className = "modal-header-button";


    modalBotton.addEventListener("click" , () =>{
        modalContainer.style.display = "none"
    })


    modalContainer.append(modalBotton);

    carrito.forEach((tarjeta) => {
        let modalCuerpo = document.createElement("div");
        modalCuerpo.className = "modal-contenido";
        modalCuerpo.innerHTML = `
            <img src="${tarjeta.imagen}">
            <h3> ${tarjeta.titulo}</h3>
            <p> ${tarjeta.precio}$</p>
            <p> Cantidad: ${tarjeta.cantidad}</p>
            <p> Total: ${tarjeta.cantidad * tarjeta.precio}</p> 
        `
        modalContainer.append(modalCuerpo);

        let eliminar = document.createElement("span");
        eliminar.innerHTML = `<i class="bi bi-trash"></i>`
        eliminar.className = "Btn-eliminar";

        modalCuerpo.append(eliminar);


        eliminar.addEventListener("click" , eliminarProducto);
    })

    //suma de los productos

    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad , 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying)

}

caritoDeCompra.addEventListener("click", contenedorModal);

//eliminar productos
const eliminarProducto = () =>{
    const encontrarId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) =>{
        return carritoId !== encontrarId;
    });

    
    contenedorModal();
    sumaDeCarritoLogo();
}; 


const sumaDeCarritoLogo = () =>{
    cantidadProducto.style.display = "block";
    cantidadProducto.innerText = carrito.length;
}














