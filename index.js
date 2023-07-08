function nombre(){
    let nombre = prompt(("Escriba un nombre de usuario:"));
    if (nombre == nombre) {
        alert("Bienvenido " + nombre)
    };
}

nombre()

let edad = parseInt(prompt("Pon tu edad:"))
do{
    
    if (edad >= 18) {
        alert("Sos mayor de edad. Bienvenido!")
    }else{
        alert("Sos menor de edad")
        edad = parseInt(prompt("Lo siento, tienes que ser mayor de edad. Vuelva a intentarlo"))
    }
}
while( edad < 18)



// flitro de busqueda 


const productsMates = [
    {nombre: "mate camionero"},
    {nombre: "mate calabaza"},
    {nombre: "Termo stanley"},
    {nombre: "mate Argentino"}, 
    {nombre: "mate personalizado"}, 
    {nombre: "termo contigo"},

];

const buscadorInput = document.querySelector("#buscadorInput");

const resultadosList = document.querySelector("#resultadosList");

const noResultados = document.querySelector("#noResultados");


const handleSearch = () => {
    const buscadorTerm = buscadorInput.value.toLowerCase();
    const filteredMates = productsMates.filter((mates) => mates.nombre.toLowerCase().includes(buscadorTerm));

    resultadosList.innerHTML = "";

    if (filteredMates.length === 0) {
        noResultados.style.display = "block" 
    }else{
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



