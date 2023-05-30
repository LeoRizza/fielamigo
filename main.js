window.addEventListener('DOMContentLoaded', () => {
    const listaAnimalesJSON = localStorage.getItem('listaAnimales');
    if (listaAnimalesJSON) {
        listaAnimales = JSON.parse(listaAnimalesJSON);
        numeroMascota = listaAnimales.length + 1;
    }
});

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

let listaRescatados = [];

let listaAnimales = [];

let numeroMascota = 1;

const modificarMascota = (event) => {
    event.preventDefault();

    const numeroInput = document.getElementById("ModificaInput");
    const numero = parseInt(numeroInput.value);

    let mascotaEncontrada = null;

    for (let i = 0; i < listaAnimales.length; i++) {
        if (listaAnimales[i].numero === numero) {
            mascotaEncontrada = listaAnimales[i];
            break;
        }
    }

    if (mascotaEncontrada) {
        const inputsContainer = document.createElement("div");

        Swal.fire({
            title: "Ingrese el número de la opción que desea modificar:",
            input: "select",
            inputOptions: {
                "1": "Nombre",
                "2": "Especie",
                "3": "Edad",
                "4": "Sexo",
                "5": "Descripcion"
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Modificar",
            showLoaderOnConfirm: true,
            preConfirm: (opcion) => {
                if (!opcion) {
                    Swal.showValidationMessage("Debe seleccionar una opción");
                }
                return opcion;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const opcionSeleccionada = result.value;
                switch (opcionSeleccionada) {
                    case "1":
                        const nombreInput = document.createElement("input");
                        nombreInput.type = "text";
                        nombreInput.value = mascotaEncontrada.nombre;
                        inputsContainer.appendChild(nombreInput);
                        break;

                    case "2":
                        const especieInput = document.createElement("input");
                        especieInput.type = "text";
                        especieInput.value = mascotaEncontrada.especie;
                        inputsContainer.appendChild(especieInput);
                        break;

                    case "3":
                        const edadInput = document.createElement("input");
                        edadInput.type = "number";
                        edadInput.value = mascotaEncontrada.edad;
                        inputsContainer.appendChild(edadInput);
                        break;

                    case "4":
                        const sexoSelect = document.createElement("select");
                        sexoSelect.innerHTML = `
                        <option value="Macho" ${mascotaEncontrada.sexo === "Macho" ? "selected" : ""}>Macho</option>
                        <option value="Hembra" ${mascotaEncontrada.sexo === "Hembra" ? "selected" : ""}>Hembra</option>
                        <option value="Otro" ${mascotaEncontrada.sexo === "Otro" ? "selected" : ""}>Otro</option>
                        `;
                        inputsContainer.appendChild(sexoSelect);
                        break;

                    case "5":
                        const colorInput = document.createElement("input");
                        colorInput.type = "text";
                        colorInput.value = mascotaEncontrada.color;
                        inputsContainer.appendChild(colorInput);
                        break;

                    default:
                        Swal.fire("Oops...", "Opción inválida", "error");
                        break;
                }

                Swal.fire({
                    title: "Ingrese los nuevos valores:",
                    html: inputsContainer,
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Modificar",
                    preConfirm: () => {
                        const nombre = opcionSeleccionada === "1" ? inputsContainer.querySelector('input[type="text"]').value : mascotaEncontrada.nombre;
                        const especie = opcionSeleccionada === "2" ? inputsContainer.querySelector('input[type="text"]').value : mascotaEncontrada.especie;
                        const edad = opcionSeleccionada === "3" ? parseInt(inputsContainer.querySelector('input[type="number"]').value) : mascotaEncontrada.edad;
                        const sexo = opcionSeleccionada === "4" ? inputsContainer.querySelector('select').value : mascotaEncontrada.sexo;
                        const descripcion = opcionSeleccionada === "5" ? inputsContainer.querySelector('input[type="text"]').value : mascotaEncontrada.descripcion;

                        mascotaEncontrada.nombre = nombre;
                        mascotaEncontrada.especie = especie;
                        mascotaEncontrada.edad = edad;
                        mascotaEncontrada.sexo = sexo;
                        mascotaEncontrada.descripcion = descripcion;

                        Swal.fire("¡Éxito!", "La mascota se ha modificado correctamente", "success");
                    }
                });
            }
        });
    } else {
        Swal.fire("Oops...", "No se encontró ninguna mascota con ese número", "error");
    }
};

document.getElementById("modificarMascota").addEventListener("click", modificarMascota);

const mascotaRescatada = () => {
    const rescatadoInput = document.getElementById("rescatadoInput");
    const numero = parseInt(rescatadoInput.value);
    let finder = false;
    for (let i = 0; i < listaAnimales.length; i++) {
        if (listaAnimales[i].numero === numero) {
            const mascotaRescatada = listaAnimales.splice(i, 1)[0];
            listaRescatados.push(mascotaRescatada);

            const listaRescatadosJSON = localStorage.getItem('listaRescatados');
            let listaRescatadosExisting = [];
            if (listaRescatadosJSON) {
                listaRescatadosExisting = JSON.parse(listaRescatadosJSON);
            }

            listaRescatadosExisting.push(mascotaRescatada);

            const listaRescatadosUpdatedJSON = JSON.stringify(listaRescatadosExisting);
            localStorage.setItem('listaRescatados', listaRescatadosUpdatedJSON);

            Swal.fire("Registro actualizado", "Mascota con Hogar!", "success");
            finder = true;
            break;
        }
    }
    if (!finder) {
        Swal.fire("Oops...", "No se encontró esa mascota", "error");
    }
    const listaAnimalesJSON = JSON.stringify(listaAnimales);
    localStorage.setItem('listaAnimales', listaAnimalesJSON);
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
    const edadInput = document.getElementById('edadMascota');
    const colorInput = document.getElementById('colorMascota');
    const especiePerroInput = document.getElementById('especiePerro');
    const especieGatoInput = document.getElementById('especieGato');
    const sexoMachoInput = document.getElementById('sexoMacho');
    const sexoHembraInput = document.getElementById('sexoHembra');

    const nombre = nombreInput.value.trim();
    const edad = edadInput.value.trim();
    const color = colorInput.value.trim();

    let especie = '';
    if (especiePerroInput.checked) {
        especie = especiePerroInput.value;
    } else if (especieGatoInput.checked) {
        especie = especieGatoInput.value;
    }

    let sexo = '';
    if (sexoMachoInput.checked) {
        sexo = sexoMachoInput.value;
    } else if (sexoHembraInput.checked) {
        sexo = sexoHembraInput.value;
    }

    if (!nombre || !especie || !edad || !sexo || !color) {
        alert('Por favor, complete todos los campos del formulario.');
        return;
    }

    const numero = numeroMascota;

    numeroMascota++;

    let nuevaMascota = new Mascota(nombre, especie, edad, sexo, color, numero);
    listaAnimales.push(nuevaMascota);

    nombreInput.value = '';
    edadInput.value = '';
    colorInput.value = '';
    especiePerroInput.checked = false;
    especieGatoInput.checked = false;
    sexoMachoInput.checked = false;
    sexoHembraInput.checked = false;

    const listaAnimalesJSON = JSON.stringify(listaAnimales);
    localStorage.setItem('listaAnimales', listaAnimalesJSON);

    Swal.fire({
        icon: 'success',
        title: 'Mascota agregada con éxito.',
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

    mostrarMascotas();
};



const listaMascotasDiv = document.getElementById('listaMascotasDiv');

const mostrarMascotas = () => {
    listaMascotasDiv.innerHTML = "";

    const mascotas = listaAnimales;

    if (mascotas) {
        mascotas.forEach(mascota => {
            const card = document.createElement('div');
            card.classList.add('mascotaCard');

            card.innerHTML = `
            <div class="card">
                <h3 class="numeroID">${mascota.numero}</h3>
                <img src="../img/pexels-dominika-roseclay-2023384.jpg" class="card-img-top" alt="${mascota.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${mascota.nombre}</h5>
                    <p class="cardLoca">Especie: ${mascota.especie}.</p>
                    <p class="cardLoca">Edad: ${mascota.edad}.</p>
                    <p class="cardLoca">Sexo: ${mascota.sexo}.</p>
                    <p class="cardLoca">Descripcion: ${mascota.color}.</p>
                </div>
            </div>
        `;

            listaMascotasDiv.appendChild(card);
        });
    }
};

mostrarMascotas();

const cerrarSesion = () => {
    Swal.fire({
        icon: "success",
        title: "Sesión cerrada.",
    });

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 600);
};