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


// -----function constructor------

// function Producto(marca, color, precio){
//     this.marca = marca;
//     this.color = color;
//     this.precio= precio;
// }

// const mateCamionero = new Producto ("Mate camionero" , "marron", 1000)
// const mateCalabaza = new Producto ("Mate calabaza" , "Marron oscuro", 3000)

// console.log(mateCamionero)
// console.log(mateCalabaza)

