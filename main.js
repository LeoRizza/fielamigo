const autenticar = (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const nombreUsuario = usuarioInput.value;
    const contrasena = passwordInput.value;

    if (nombreUsuario === "Admin89" && contrasena === "pass999") {
        Swal.fire({
            icon: 'success',
            title: '¡Ingreso exitoso!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        setTimeout(() => {
            window.location.href = "./html/administrar.html";
        }, 1000);
    } else {
        if (nombreUsuario !== "Admin89") {
            Swal.fire({
                icon: "error",
                title: "Usuario inexistente.",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Contraseña incorrecta.",
            });
        }
    }
};

const ingresoForm = document.getElementById('ingreso');
if (ingresoForm) {
    ingresoForm.addEventListener('submit', autenticar);
}

const autenticarBtn = document.getElementById('autenticarBtn');
const formularioIngreso = document.getElementById('formularioIngreso');

if (autenticarBtn && formularioIngreso) {
    autenticarBtn.addEventListener('click', (event) => {
        event.preventDefault();
        formularioIngreso.style.display = 'block';
    });
}

const cerrarBtn = document.getElementById('cerrarBtn');
if (cerrarBtn && formularioIngreso) {
    cerrarBtn.addEventListener('click', () => {
        formularioIngreso.style.display = 'none';
    });
}

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

const mascotaRescatada = () => {
    let numero = prompt("Ingrese el número de Mascota rescatada: ");
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
        alert("No se encontró ninguna Mascota con ese número.");
    }
    console.log(listaRescatados);
};

const modificarMascota = () => {
    let numero = prompt("Ingrese el número de Mascota a modificar:");
    let finder = false;
    for (let i = 0; i < listaAnimales.length; i++) {
        if (listaAnimales[i].numero == numero) {
            let opcion = prompt(`Ingrese el número de la opción que desea modificar:\n 1-Nombre \n 2-Especie \n 3-Edad \n 4-Sexo \n 5-Color`);
            switch (opcion) {
                case '1':
                    listaAnimales[i].nombre = prompt("Ingrese el nuevo nombre:");
                    break;
                case '2':
                    listaAnimales[i].especie = prompt("Ingrese la nueva especie:");
                    break;
                case '3':
                    listaAnimales[i].edad = prompt("Ingrese la nueva edad:");
                    break;
                case '4':
                    listaAnimales[i].sexo = prompt("Ingrese el nuevo sexo:");
                    break;
                case '5':
                    listaAnimales[i].color = prompt("Ingrese el nuevo color:");
                    break;
                default:
                    alert("Opción inválida");
                    break;
            }
            finder = true;
            break;
        }
    }
    if (!finder) {
        alert("No se encontró ninguna Mascota con ese número.");
    }
};

const agregarMascotaFromForm = () => {
    const nombreInput = document.getElementById('nombreMascota');
    const especieInput = document.getElementById('especieMascota');
    const edadInput = document.getElementById('edadMascota');
    const sexoInput = document.getElementById('sexoMascota');
    const colorInput = document.getElementById('colorMascota');

    const nombre = nombreInput.value;
    const especie = especieInput.value;
    const edad = edadInput.value;
    const sexo = sexoInput.value;
    const color = colorInput.value;
    const numero = numeroMascota;

    numeroMascota++; // suma un número para la siguiente mascota.

    let nuevaMascota = new Mascota(nombre, especie, edad, sexo, color, numero);
    listaAnimales.push(nuevaMascota);

    // Restablecer los valores del formulario
    nombreInput.value = '';
    especieInput.value = '';
    edadInput.value = '';
    sexoInput.value = '';
    colorInput.value = '';

    Swal.fire({
        icon: 'success',
        title: 'Mascota agregada con éxito.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const listaAnimalesJSON = JSON.stringify(listaAnimales)

    localStorage.setItem("porRescatar", listaAnimalesJSON)
};

function agregarMascotaMostrar() {
    var form = document.getElementById('agregarMascotaForm');
    form.style.display = 'block';
}


const cerrarSesion = () => {
    Swal.fire({
        icon: "success",
        title: "Sesión cerrada.",
    });

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1000);
};

const formularioContacta = document.getElementById('contacta');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const celularInput = document.getElementById('celular');
const mensajeInput = document.getElementById('mensaje');
const enviarBtn = document.getElementById('consulta');

const obtenerConsultasLocalStorage = () => {
    const consultasJSON = localStorage.getItem('consultas');

    if (consultasJSON) {
        return JSON.parse(consultasJSON);
    } else {
        return [];
    }
};

const guardarConsultasLocalStorage = (consultas) => {
    const consultasJSON = JSON.stringify(consultas);

    localStorage.setItem('consultas', consultasJSON);
};

const enviarConsulta = (event) => {
    event.preventDefault();

    const consultas = obtenerConsultasLocalStorage();

    const nuevoConsulta = {
        nombre: nombreInput.value,
        email: emailInput.value,
        celular: celularInput.value,
        mensaje: mensajeInput.value,
    };

    consultas.push(nuevoConsulta);

    guardarConsultasLocalStorage(consultas);

    nombreInput.value = '';
    emailInput.value = '';
    celularInput.value = '';
    mensajeInput.value = '';

    Swal.fire({
        icon: "success",
        title: "Consulta recibida.",
    });
};


if (formularioContacta) {
    formularioContacta.addEventListener('submit', enviarConsulta);
}
