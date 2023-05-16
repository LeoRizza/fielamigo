/* const contacta = document.getElementById("contacta");

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
 */

//-------------------------------------------------//

/* const listaAnimalesJSON = JSON.stringify(listaAnimales)

localStorage.setItem("porRescatar", listaAnimalesJSON)

const listaAnimalesLocalStorage = localStorage.getItem("porRescatar")

const listaAnimalesparseado = JSON.parse(listaAnimalesLocalStorage) */

//-------------------------------------------------//

const autenticar = () => {
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const nombreUsuario = usuarioInput.value;
    const contrasena = passwordInput.value;

    if (nombreUsuario === "Admin89") {
        if (contrasena === "pass999") {
            Swal.fire({
                icon: 'success',
                title: '¡Ingreso exitoso!',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Contraseña incorrecta.",
            });
            return false;
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Usuario inexistente.",
        });
        return false;
    }
};

const ingreso = document.getElementById('ingreso');
ingreso.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario k se recargue la pag
    if (autenticar()) {
        mostrarMenu();
    }
});

const rescatadosBtn = document.getElementById('rescatadosBtn');
rescatadosBtn.addEventListener('click', () => {
    console.log(listaAnimalesparseado);
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
};

const mostrarFormularioAgregarMascota = () => {
    const agregarMascotaForm = document.getElementById('agregarMascotaForm');
    agregarMascotaForm.style.display = 'block';
};


/* const agregarMascota = () => {
    let nombre = prompt("Ingrese el nombre de la Mascota:");
    let especie = prompt("Ingrese la especie de la Mascota:");
    let edad = prompt("Ingrese la edad de la Mascota:");
    let sexo = prompt("Ingrese el sexo de la Mascota: (M o H)");
    let color = prompt("Ingrese el color:");
    let numero = numeroMascota;
    numeroMascota++; // suma un numero para la siguiente mascota.
    let nuevaMascota = new Mascota(nombre, especie, edad, sexo, color, numero);
    listaAnimales.push(nuevaMascota);
};
 */
const modificarMascota = () => {
    let numero = prompt("Ingrese el numero de Mascota a modificar:");
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
        alert("No se encontró ninguna Mascota con ese numero.");
    }
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
    const ingresoForm = document.getElementById('ingreso');
    ingresoForm.innerHTML = `
        <div class="menu">
            <button class="menuBtn" onclick="mostrarFormularioAgregarMascota()">Agregar Mascota</button>
            <button class="menuBtn" onclick="mascotaRescatada()">Fue rescatado</button>
            <button class="menuBtn" onclick="modificarMascota()">Modificar Mascota</button>
            <button class="menuBtn" onclick="mostrarMascotas()">lista de Mascotas</button>
            <button class="menuBtn" onclick="cerrarSesion()">Salir</button>
        </div>
    `;
};

const cerrarSesion = () => {
    Swal.fire({
        icon: "success",
        title: "Sesion cerrada.",
    });
    location.reload();
};