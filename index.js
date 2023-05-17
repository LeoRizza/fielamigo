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

formularioContacta.addEventListener('submit', enviarConsulta);