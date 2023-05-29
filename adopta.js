window.addEventListener('DOMContentLoaded', () => {
    const listaAnimalesJSON = localStorage.getItem('listaAnimales');
    if (listaAnimalesJSON) {
        listaAnimales = JSON.parse(listaAnimalesJSON);
    }
});