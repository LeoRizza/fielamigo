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