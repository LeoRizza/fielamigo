const cloudinaryUpURL = 'https://api.cloudinary.com/v1_1/dzrg0m1mc/image/upload';

localStorage.clear();
//--------cookies?)---------//

var cookies = document.cookie.split(";");

for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.indexOf(".cloudinary.com") !== -1) {
        var cookieParts = cookie.split("=");

        var cookieName = cookieParts[0];

        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.cloudinary.com; SameSite=None; Secure";
    }
}

//--------cookies?)---------//

window.addEventListener('DOMContentLoaded', () => {
    const listaAnimalesJSON = localStorage.getItem('listaAnimales');
    const listaRescatadosJSON = localStorage.getItem('listaRescatados');

    if (listaAnimalesJSON) {
        listaAnimales = JSON.parse(listaAnimalesJSON);
    }

    if (listaRescatadosJSON) {
        listaRescatados = JSON.parse(listaRescatadosJSON);
    }

    const maxNumero = getMaxNumero(listaAnimales, listaRescatados);
    numeroMascota = listaAnimales.length > 0 || listaRescatados.length > 0 ? maxNumero + 1 : 1;
});

const getMaxNumero = (arr1, arr2) => {
    const numeros = arr1.concat(arr2).map(mascota => mascota.numero);
    return Math.max(...numeros);
};


class Mascota {
    constructor(nombre, especie, edad, sexo, color, numero, imagenURL) {
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.sexo = sexo;
        this.color = color;
        this.numero = numero;
        this.imagenURL = imagenURL;
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
                        const color = opcionSeleccionada === "5" ? inputsContainer.querySelector('input[type="text"]').value : mascotaEncontrada.color;

                        mascotaEncontrada.nombre = nombre;
                        mascotaEncontrada.especie = especie;
                        mascotaEncontrada.edad = edad;
                        mascotaEncontrada.sexo = sexo;
                        mascotaEncontrada.color = color;

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
    const fotoMascotaInput = document.getElementById('fotoMascota');

    const nombre = nombreInput.value.trim();
    const edad = edadInput.value.trim();
    const color = colorInput.value.trim();
    const fotoMascota = fotoMascotaInput.files[0];

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

    const formData = new FormData();
    formData.append('file', fotoMascota);
    formData.append('upload_preset', 'UploadPreset1');

    if (!nombre || !especie || !edad || !sexo || !color || !fotoMascota) {
        Swal.fire("Error", "Por favor, complete todos los campos del formulario y seleccione una foto.", "error");
        return;
    }

    fetch(cloudinaryUpURL, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const imagenURL = data.secure_url;

            const numero = numeroMascota;
            numeroMascota++;

            let nuevaMascota = new Mascota(nombre, especie, edad, sexo, color, numero, imagenURL);
            listaAnimales.push(nuevaMascota);

            nombreInput.value = '';
            edadInput.value = '';
            colorInput.value = '';
            especiePerroInput.checked = false;
            especieGatoInput.checked = false;
            sexoMachoInput.checked = false;
            sexoHembraInput.checked = false;

            agregarImagenMascota(nuevaMascota, imagenURL);

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
        })
        .catch(error => {
            console.error(error);
        });
};

const agregarImagenMascota = (mascota, imagenURL) => {
    mascota.imagenURL = imagenURL;

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

            const imagen = document.createElement('img');
            imagen.src = mascota.imagenURL;
            imagen.alt = mascota.nombre;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const numeroID = document.createElement('h3');
            numeroID.classList.add('numeroID');
            numeroID.textContent = mascota.numero;

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = mascota.nombre;

            const especie = document.createElement('p');
            especie.classList.add('cardLoca');
            especie.textContent = 'Especie: ' + mascota.especie + '.';

            const edad = document.createElement('p');
            edad.classList.add('cardLoca');
            edad.textContent = 'Edad: ' + mascota.edad + '.';

            const sexo = document.createElement('p');
            sexo.classList.add('cardLoca');
            sexo.textContent = 'Sexo: ' + mascota.sexo + '.';

            const descripcion = document.createElement('p');
            descripcion.classList.add('cardLoca');
            descripcion.textContent = 'Descripcion: ' + mascota.color + '.';

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(especie);
            cardBody.appendChild(edad);
            cardBody.appendChild(sexo);
            cardBody.appendChild(descripcion);

            card.appendChild(numeroID);
            card.appendChild(imagen);
            card.appendChild(cardBody);

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