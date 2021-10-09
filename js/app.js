const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', validarFormulario);
});

function validarFormulario(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // Validar
    if(ciudad === '' || pais === ''){
        return mostrarError('Todos los campos son obligatorios');
    }

    // Consultar a la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const divError = document.createElement('div');
        divError.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        divError.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(divError);

        setTimeout(()=>{
            divError.remove();
        }, 4000);
    }
}

function consultarAPI(ciudad, pais){
    const apiKey = 'e282188bbf4fe4811b251d457750b9c5';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

    Spinner();

    axios.get(url)
        .then(respuesta => respuesta.data)
        .then( datos => {
            limpiarHTML();

            if(datos.cod === '404'){
                return mostrarError('La ciudad no se encontró');
            }

            mostrarClima(datos);
        })
        .catch( error => console.log(error));
}

function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max =  kelvinACentigrados(temp_max);
    const min =  kelvinACentigrados(temp_min);

    const ciudad = document.createElement('p');
    ciudad.classList.add('font-bold', 'text-2xl');
    ciudad.innerHTML = `Clima en ${name}`;

    const actual = document.createElement('p');
    actual.classList.add('font-bold', 'text-6xl');
    actual.innerHTML = `${centigrados} &#8451`;

    const tempMax = document.createElement('p');
    tempMax.classList.add('text-xl');
    tempMax.innerHTML = `Max: ${max} &#8451`;

    const tempMin = document.createElement('p');
    tempMin.classList.add('text-xl');
    tempMin.innerHTML = `Min: ${min} &#8451`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = kelvin => parseInt(kelvin - 273.15);

function limpiarHTML(){ 
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}