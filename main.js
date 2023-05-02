const autenticar = () => {
    let nombreUsuario = prompt("Ingrese su nombre de usuario:");
    if (nombreUsuario === "Admin89") {
        let contrasena = prompt("Ingrese su contraseña:");
        if (contrasena === "pass999") {
            return true;
        } else {
            alert("Contraseña incorrecta.");
            return false;
        }
    } else {
        alert("Usuario inexistente.");
        return false;
    }
};

const autenticarBtn = document.getElementById('autenticarBtn');
autenticarBtn.addEventListener('click', () => {
    if (autenticar()) {
        return mostrarMenu();
    }
});

const rescatadosBtn = document.getElementById('rescatadosBtn');
rescatadosBtn.addEventListener('click', () => {
  console.log(listaRescatados);
});

let listaRescatados = [];

class Mascota {
    constructor(nombre, especie, edad, sexo, color, numero) {
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.sexo = sexo;
        this.color = color;
        this.numero = numero;
    }
}

let listaAnimales = [];

let numeroMascota = 1;

const agregarMascota = () => {
    let nombre = prompt("Ingrese el nombre de la Mascota:");
    let especie = prompt("Ingrese la especie de la Mascota:");
    let edad = prompt("Ingrese la edad de la Mascota:");
    let sexo = prompt("Ingrese el sexo de la Mascota: (M o H)");
    let color = prompt("Ingrese el color:");
    let numero = numeroMascota;
    numeroMascota++; // sumamos un numero para la siguiente mascota.
    let nuevaMascota = new Mascota(nombre, especie, edad, sexo, color, numero);
    listaAnimales.push(nuevaMascota);
};


const mascotaRescatada = () => {
    let numero = prompt("Ingrese el numero de Mascota rescatada:");
    let finder = false;
    for (let i = 0; i < listaAnimales.length; i++) {
        if (listaAnimales[i].numero == numero) {
            const mascotaRescatada = listaAnimales.splice(i, 1)[0];
            listaRescatados.push(mascotaRescatada);
            finder = true;
            break;
        }
    }
    if (!finder) {
        alert("No se encontró ninguna Mascota con ese numero.");
    }
    console.log(listaRescatados)
};

const mostrarMascotas = () => {
    let mensaje = "\nLista de Mascotas:\n\n";
    for (let i = 0; i < listaAnimales.length; i++) {
        mensaje += `Nombre: ${listaAnimales[i].nombre}\n`;
        mensaje += `Edad: ${listaAnimales[i].edad}\n`;
        mensaje += `Especie: ${listaAnimales[i].especie}\n`;
        mensaje += `Sexo: ${listaAnimales[i].sexo}\n`;
        mensaje += `Color: ${listaAnimales[i].color}\n`;
        mensaje += `Número: ${listaAnimales[i].numero}\n\n`;
    }
    alert(mensaje);
};

const mostrarMenu = () => {
    let opcion = "";
    while (opcion !== "4") {
        opcion = prompt(`Escriba el numero de la opcion a elegir:
      1. Agregar Mascota
      2. A lista de Rescatado
      3. Mostrar lista de Mascotas
      4. Salir`);
        switch (opcion) {
            case "1":
                agregarMascota();
                break;
            case "2":
                mascotaRescatada();
                break;
            case "3":
                mostrarMascotas();
                break;
            case "4":
                alert("Sesion cerrada");
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    }
};