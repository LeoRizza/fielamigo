window.addEventListener('DOMContentLoaded', () => {
    const listaAnimalesJSON = localStorage.getItem('listaAnimales');
    let listaAnimales = [];

    if (listaAnimalesJSON) {
        listaAnimales = JSON.parse(listaAnimalesJSON);
    }

    console.log(listaAnimales);

    const vidrieraMascotas = document.getElementById('vidrieraMascotas');

    const mostrarMascotas = () => {
        vidrieraMascotas.innerHTML = "";

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

                vidrieraMascotas.appendChild(card);
            });
        }
    };

    mostrarMascotas();
});
