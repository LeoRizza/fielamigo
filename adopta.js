const cloudinaryUpURL = 'https://api.cloudinary.com/v1_1/dzrg0m1mc/image/upload';

const autenticar = (event) => {
    event.preventDefault();

    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const nombreUsuario = usuarioInput.value;
    const contrasena = passwordInput.value;

    if (nombreUsuario === "admin" && contrasena === "0000") {
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
            window.location.href = "../html/administrar.html";
        }, 1000);
    } else {
        if (nombreUsuario !== "admin") {
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

//--------------------------------------------------//

window.addEventListener('DOMContentLoaded', () => {
    const listaAnimalesJSON = localStorage.getItem('listaAnimales');
    let listaAnimales = [];

    if (listaAnimalesJSON) {
        listaAnimales = JSON.parse(listaAnimalesJSON);
    }

    const vidrieraMascotas = document.getElementById('vidrieraMascotas');
    const especieSelector = document.getElementById('especie');
    const sexoSelector = document.getElementById('sexo');
    const palabraClaveInput = document.getElementById('palabraClave');
    const btnFiltrar = document.getElementById('btnFiltrar');

    const mostrarMascotas = (mascotas) => {
        vidrieraMascotas.innerHTML = "";

        if (mascotas) {
            mascotas.forEach(mascota => {
                const card = document.createElement('div');

                card.innerHTML = `
                <div class="mascotaCard">
                    <h3 class="numeroID">${mascota.numero}</h3>
                    <img src="${mascota.imagenURL}" alt="${mascota.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${mascota.nombre}</h5>
                        <p class="cardLoca">Especie: ${mascota.especie}.</p>
                        <p class="cardLoca">Edad: ${mascota.edad}.</p>
                        <p class="cardLoca">Sexo: ${mascota.sexo}.</p>
                        <p class="cardLoca">Descripcion: ${mascota.color}.</p>
                    </div>
                </div>
                `;

                vidrieraMascotas.appendChild(card);
            });
        }
    };

    const filtrarMascotas = () => {
        const especie = especieSelector.value;
        const sexo = sexoSelector.value;
        const palabraClave = palabraClaveInput.value.toLowerCase();

        let mascotasFiltradas = listaAnimales;

        if (especie !== 'todos') {
            mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.especie.toLowerCase() === especie.toLowerCase());
        }

        if (sexo !== 'todos') {
            mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.sexo.toLowerCase() === sexo.toLowerCase());
        }

        if (palabraClave.trim() !== '') {
            mascotasFiltradas = mascotasFiltradas.filter(mascota =>
                Object.values(mascota).some(valor => typeof valor === 'string' && valor.toLowerCase().includes(palabraClave))
            );
        }

        mostrarMascotas(mascotasFiltradas);
    };

    btnFiltrar.addEventListener('click', filtrarMascotas);

    mostrarMascotas(listaAnimales);
});

