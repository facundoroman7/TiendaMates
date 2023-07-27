// function nombre() {
//     let nombre = prompt(("Escriba un nombre de usuario:"));
//     if (nombre) {
//         alert("Bienvenido " + nombre)
//     };
// }

// nombre()

// let edad = parseInt(prompt("Pon tu edad:"))
// do {

//     if (edad >= 18) {
//         alert("Sos mayor de edad. Bienvenido a TiendaMates!")
//     } else {
//         alert("Sos menor de edad")
//         edad = parseInt(prompt("Lo siento, tienes que ser mayor de edad. Vuelva a intentarlo"))
//     }
// }
// while (edad < 18)



// flitro de busqueda 
const contenedorTarjetas = document.querySelector("#contenedorDeTarjetas");

const buscadorInput = document.querySelector("#buscadorInput");

const resultadosList = document.querySelector("#resultadosList");

const noResultados = document.querySelector("#noResultados");

const caritoDeCompra = document.querySelector("#carrito");

const modalContainer = document.querySelector("#modalContainer");

const cantidadProducto = document.querySelector("#cantidadProducto");


const productsMates = [
    { nombre: "Mate camionero" },
    { nombre: "Mate calabaza" },
    { nombre: "Termo stanley" },
    { nombre: "Mate Argentino" },
    { nombre: "Mate personalizado" },
    { nombre: "Termo contigo" },
    { nombre: "Canasta uruguaya" },
    { nombre: "Mochila matera" },
    { nombre: "Portatermo matero" },

];


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


//tarjetas de productos y modal hecho en javascript

// la lista de productos
// const productoTarjetas = [];


//carrito
let carrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];

// Funcion para aprecer las tarjetas (productos) y tambien con la fucion de fetch y usando el async, await

const getProductos = async () => {
    const response = await fetch("productos.json");
    const data = await response.json();
    
        data.forEach(tarjeta => {
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
    
                Toastify({
                    text: "Se agreado el producto al carrito",
                    className: "info",
                    position: "right",
                    style: {
                        background: "#22ab37",
                        color: "white"
                    }
                }).showToast();
    
                const repeat = carrito.some((repeatProducto) => repeatProducto.id === tarjeta.id);
    
                if (repeat) {
                    carrito.map((product) => {
                        if (product.id === tarjeta.id) {
                            product.cantidad++;
                        }
                    });
    
                } else {
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
                saveStorage();
            }) 
        });
};

getProductos()




//localStorage

const saveStorage = () => {
    localStorage.setItem("productoCarrito", JSON.stringify(carrito));
}





//modal

const contenedorModal = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    //Header del modal
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `

            <h1 class="modal-header-title"> Productos Comprados </h1>
        
        `;
    modalContainer.append(modalHeader);
    //Boton del header para salir del modal
    const modalBotton = document.createElement("h2");
    modalBotton.innerText = "X";
    modalBotton.className = "modal-header-button";


    modalBotton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })


    modalContainer.append(modalBotton);
    //Cuerpo del modal y tambien los productos que se agregen 
    carrito.forEach((tarjeta) => {
        let modalCuerpo = document.createElement("div");
        modalCuerpo.className = "modal-contenido";
        modalCuerpo.innerHTML = `
            <img src="${tarjeta.imagen}">
            <h3> ${tarjeta.titulo}</h3>
            <p> ${tarjeta.precio}$</p>
            <span class="resta"> <i class="bi bi-dash-circle"></i> </span>
            <p> Cantidad: ${tarjeta.cantidad}</p>
            <span class="sumar"> <i class="bi bi-plus-circle"> </i> </span>
            <p> Total: ${tarjeta.cantidad * tarjeta.precio}</p> 
        `
        modalContainer.append(modalCuerpo);

        // sumar y restar productos en el modal del carrito
        let restar = modalCuerpo.querySelector(".resta");

        restar.addEventListener("click", () => {
            if (tarjeta.cantidad !== 1) {
                tarjeta.cantidad--;
                contenedorModal();
                saveStorage();
            }
        })

        let sumar = modalCuerpo.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            tarjeta.cantidad++
            contenedorModal();
            saveStorage();
        })


        // boton para eliminar -> (tacho)
        let eliminar = document.createElement("span");
        eliminar.innerHTML = `<i class="bi bi-trash"></i>`
        eliminar.className = "Btn-eliminar";

        modalCuerpo.append(eliminar);


        eliminar.addEventListener("click", eliminarProducto);
    })

    //suma de los productos

    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying)

}

caritoDeCompra.addEventListener("click", contenedorModal);

//funcion eliminar productos
const eliminarProducto = () => {
    const encontrarId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== encontrarId;
    });


    contenedorModal();
    saveStorage();
    sumaDeCarritoLogo();
};

// Suma la cantidad de productos y te lo muestra en el carrito 

const sumaDeCarritoLogo = () => {
    cantidadProducto.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadProducto.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

sumaDeCarritoLogo();














