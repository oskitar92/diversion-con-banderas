document.addEventListener('DOMContentLoaded', iniciar);

async function iniciar() {
    const paises = await obtenerPaises();
    const paisesOrdenados = ordenarPaisesAlfabeticamente(paises);
    mostrarPaises(paisesOrdenados);
}

async function obtenerPaises() {
    try {
        const respuesta = await fetch('https://restcountries.com/v3/all');
        const paises = await respuesta.json();
        return paises;
    } catch (error) {
        console.error('Error al obtener los países:', error);
        return [];
    }
}

function ordenarPaisesAlfabeticamente(paises) {
    
    return paises.sort((a, b) => a.name.common > b.name.common ? 1 : -1);
}

function mostrarPaises(paises) {
    const listaPaises = document.getElementById('countries-list');
    paises.forEach(pais => {
        const elementoPais = document.createElement('div');
        elementoPais.classList.add('country');

        
        const elementoBandera = document.createElement('img');
        elementoBandera.src = pais.flags.svg;
        elementoBandera.alt = `Bandera de ${pais.name.common}`;
        elementoBandera.addEventListener('click', () => mostrarDetallesPais(pais));

        const elementoNombre = document.createElement('p');
        elementoNombre.textContent = pais.name.common;

        elementoPais.appendChild(elementoBandera);
        elementoPais.appendChild(elementoNombre);
        listaPaises.appendChild(elementoPais);
    });
}

function mostrarDetallesPais(pais) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const contenidoModal = document.createElement('div');
    contenidoModal.classList.add('modal-content');

    
    const botonCerrar = document.createElement('span');
    botonCerrar.classList.add('close-button');
    botonCerrar.textContent = '×';
    botonCerrar.addEventListener('click', () => modal.remove());

    const elementoBandera = document.createElement('img');
    elementoBandera.src = pais.flags.svg;
    elementoBandera.alt = `Bandera de ${pais.name.common}`;

    const elementoCapital = document.createElement('p');
    
    elementoCapital.textContent = `Capital: ${pais.capital ? pais.capital[0] : 'N/A'}`;

    const elementoPoblacion = document.createElement('p');
    
    elementoPoblacion.textContent = `Población: ${pais.population.toLocaleString()}`;

    const elementoLadoCarretera = document.createElement('p');
   
    elementoLadoCarretera.textContent = `Se conduce por: ${pais.car.side}`;

    contenidoModal.appendChild(botonCerrar);
    contenidoModal.appendChild(elementoBandera);
    contenidoModal.appendChild(elementoCapital);
    contenidoModal.appendChild(elementoPoblacion);
    contenidoModal.appendChild(elementoLadoCarretera);
    modal.appendChild(contenidoModal);
    document.body.appendChild(modal);
}
