window.addEventListener('DOMContentLoaded', () => {
    const listaAnimalesJSON = localStorage.getItem('listaAnimales');
    if (listaAnimalesJSON) {
        listaAnimales = JSON.parse(listaAnimalesJSON);
        numeroMascota = listaAnimales.length + 1;
    }
});

const autenticar = (event) => {
    event.preventDefault();

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

const listaMascotasDiv = document.getElementById('listaMascotasDiv');
const mascotas = JSON.parse(localStorage.getItem('listaAnimales'));

if (mascotas) {
    mascotas.forEach(Mascota => {
        const card = document.createElement('div');
        card.classList.add('mascotaCard');

        card.innerHTML = `
        <div class="card">
            <h3 class="numeroID">${Mascota.numero}</h3>
            <img src="../img/pexels-dominika-roseclay-2023384.jpg" class="card-img-top" alt="${Mascota.nombre}">
            <div class="card-body">
                <h5 class="card-title">${Mascota.nombre}</h5>
                <p class="cardLoca">Especie: ${Mascota.especie}.</p>
                <p class="cardLoca">Edad: ${Mascota.edad}.</p>
                <p class="cardLoca">Sexo: ${Mascota.sexo}.</p>
                <p class="cardLoca">Descripcion: ${Mascota.color}.</p>
            </div>
        </div>
    `;

        listaMascotasDiv.appendChild(card);
    });
}

const mostrarMascotas = () => {
    listaMascotasDiv.innerHTML = "";

    const mascotas = JSON.parse(localStorage.getItem('listaAnimales'));

    if (mascotas) {
        mascotas.forEach(Mascota => {
            const card = document.createElement('div');
            card.classList.add('mascotaCard');

            card.innerHTML = `
            <div class="card">
                <h3 class="numeroID">${Mascota.numero}</h3>
                <img src="../img/pexels-dominika-roseclay-2023384.jpg" class="card-img-top" alt="${Mascota.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${Mascota.nombre}</h5>
                    <p class="cardLoca">Especie: ${Mascota.especie}.</p>
                    <p class="cardLoca">Edad: ${Mascota.edad}.</p>
                    <p class="cardLoca">Sexo: ${Mascota.sexo}.</p>
                    <p class="cardLoca">Descripcion: ${Mascota.color}.</p>
                </div>
            </div>
        `;

            listaMascotasDiv.appendChild(card);
        });
    }
};

const modificarMascota = () => {
    const numeroInput = document.getElementById('ModificaInput');
    const numero = parseInt(numeroInput.value);

    let mascotaEncontrada = null;

    for (let i = 0; i < listaAnimales.length; i++) {
        if (listaAnimales[i].numero === numero) {
            mascotaEncontrada = listaAnimales[i];
            break;
        }
    }

    if (mascotaEncontrada) {
        let opcion = prompt(`Ingrese el número de la opción que desea modificar:\n 1-Nombre \n 2-Especie \n 3-Edad \n 4-Sexo \n 5-Color`);
        switch (opcion) {
            case '1':
                mascotaEncontrada.nombre = prompt("Ingrese nuevo nombre:");
                break;
            case '2':
                mascotaEncontrada.especie = prompt("Ingrese especie:");
                break;
            case '3':
                mascotaEncontrada.edad = prompt("Ingrese edad:");
                break;
            case '4':
                mascotaEncontrada.sexo = prompt("Ingrese sexo:");
                break;
            case '5':
                mascotaEncontrada.color = prompt("Ingrese descripcion:");
                break;
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Opción inválida',
                });
                return;
        }

        const listaAnimalesJSON = JSON.stringify(listaAnimales);
        localStorage.setItem('listaAnimales', listaAnimalesJSON);

        mostrarMascotas();

        Swal.fire({
            icon: 'success',
            title: 'Mascota modificada con éxito.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "No se encontró ninguna Mascota con ese número.",
        });
    }
};

document.getElementById('modificarMascota').addEventListener('click', modificarMascota);

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

const mostrarDiv = (divId) => {
    const divs = document.getElementsByClassName("menuDiv");
    const divSeleccionado = document.getElementById(divId);

    if (divSeleccionado.style.display === "flex") {
        divSeleccionado.style.display = "none";
    } else {
        for (let i = 0; i < divs.length; i++) {
            const div = divs[i];
            if (div.id === divId) {
                div.style.display = "flex";
            } else {
                div.style.display = "none";
            }
        }
    }
};

const agregarMascotaFromForm = () => {
    const nombreInput = document.getElementById('nombreMascota');
    const especieInput = document.getElementById('especieMascota');
    const edadInput = document.getElementById('edadMascota');
    const sexoInput = document.getElementById('sexoMascota');
    const colorInput = document.getElementById('colorMascota');

    const nombre = nombreInput.value.trim();
    const especie = especieInput.value.trim();
    const edad = edadInput.value.trim();
    const sexo = sexoInput.value.trim();
    const color = colorInput.value.trim();

    if (!nombre || !especie || !edad || !sexo || !color) {
        alert('Por favor, complete todos los campos del formulario.');
        return;
    }

    const numero = numeroMascota;

    numeroMascota++;

    let nuevaMascota = new Mascota(nombre, especie, edad, sexo, color, numero);
    listaAnimales.push(nuevaMascota);

    nombreInput.value = '';
    especieInput.value = '';
    edadInput.value = '';
    sexoInput.value = '';
    colorInput.value = '';

    const listaAnimalesJSON = JSON.stringify(listaAnimales);
    localStorage.setItem('listaAnimales', listaAnimalesJSON);

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
        },
    });

    mostrarMascotas();
};



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
