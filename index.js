const contacta = document.getElementById("contacta");

contacta.addEventListener("submit", (e) => {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let celular = document.getElementById("celular").value;
    let mensaje = document.getElementById("mensaje").value;

})

const consulta = document.getElementById("consulta");
consulta.addEventListener("click", () => {
    Swal.fire("Consulta Enviada");

    const nombre = document.getElementById("nombre");
    const celular = document.getElementById("celular");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    const consulta2 = {
        nombre: nombre.value,
        celular: celular.value,
        email: email.value,
        mensaje: mensaje.value,
    }

    localStorage.setItem("consulta2", JSON.stringify(consulta2));
})