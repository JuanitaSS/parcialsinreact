//aplicacion integradora

document.getElementById('button_search').addEventListener('click', () => {
    const inputTexto = document.getElementById('input_personaje');
    const valor = inputTexto.value.trim();
    if (valor) {
        peticionApiPorApodo(valor);
    } else {
        alert('Por favor, ingresa el apodo de un personaje.');
    }
});

const peticionApiPorApodo = (apodo) => {
    const baseUrl = 'https://harry-potter-api.onrender.com/personajes';
    const url = `${baseUrl}?apodo=${encodeURIComponent(apodo)}`;

    console.log(`Fetching URL: ${url}`); 

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data); 
            printData(data);
        })
        .catch(err => {
            console.error('Error:', err);
            document.getElementById('show-info').innerHTML = 'Hubo un error al buscar el personaje.';
        });
}

const printData = (data) => {
    const respuesta = document.getElementById('show-info');
    if (data && data.length > 0) {
        const character = data[0];
        respuesta.innerHTML = `
            <img src="${character.imagen || 'https://via.placeholder.com/150'}" alt="${character.personaje}">
            <p><strong>Nombre:</strong> ${character.personaje}</p>
            <p><strong>Casa:</strong> ${character.casaDeHogwarts}</p>
            <p><strong>Estudiante de Hogwarts:</strong> ${character.estudianteDeHogwarts ? 'Sí' : 'No'}</p>
            <p><strong>Interpretado por:</strong> ${character.interpretado_por || 'No disponible'}</p>
            <p><strong>Hijos:</strong> ${character.hijos.length > 0 ? character.hijos.join(', ') : 'No disponible'}</p>

           
        `;
    } else {
        respuesta.innerHTML = 'No se encontraron datos para el apodo solicitado.';
    }
}