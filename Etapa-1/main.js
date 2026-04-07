//Archivo que conecta todo: la API, el render y los eventos. Es el cerebro del programa.

import TRAINER from "../trainer.config.js";
import { getPokemonData } from "./api.js";
import { renderPokemon, renderError, renderLoading } from "./render.js";

//ESTADO
//objeto que guarda el estado de la aplicacion, en este caso los pokemones seleccionados

var estado = {
    jugador: null, //umbreon
    oponente: null // datos del oponente
}

//TRAINER CARD
// se muestra la informacion del entrenador desde config

document.querySelector("#trainer-nombre").textContent = TRAINER.name;
document.querySelector("#trainer-hometown").textContent = TRAINER.hometown;
document.querySelector("#trainer-catchphrase").textContent = TRAINER.catchphrase;

// CARGA JUGADOR

async function cargarJugador() {

    renderLoading("jugador");

    try {
        // Buscamos los datos del pokemon favorito del entrenador en la API
        var datos = await getPokemonData(TRAINER.favoritePokemon);

        // Guardamos los datos en el estado
        estado.jugador = datos;

        // Mostramos los datos en pantalla
        renderPokemon(datos, "jugador");

        //Revisamos si el boton se puede activar
        verificarBoton();

    } catch (error) {
        // Si hay un error, lo mostramos en pantalla
        renderError(error.message, "jugador");

    }
}

//BUSCAR OPONENTE
//Aca se llama lo que el usuario escribio en el input

async function buscarOponente(nombre) {

    //si el input esta vacio, no hacemos nada
    if (nombre.trim() === "") {
        estado.oponente = null; //limpiamos el oponente anterior
        renderLoading("oponente"); //mostramos cargando mientras buscamos
        verificarBoton(); //desactivamos el boton mientras buscamos
        return; //salimos de la funcion
}
    renderLoading("oponente");

    try {
        // Buscamos los datos del pokemon oponente en la API
        var datos = await getPokemonData(nombre);

        // Guardamos los datos en el estado
        estado.oponente = datos;

        // Mostramos los datos en pantalla
        renderPokemon(datos, "oponente");

        //se guarda el nombre en el LOCALSTORAGE para que se pueda usar en la proxima etapa

        localStorage.setItem("ultimo-oponente", nombre);

        //Revisamos si el boton se puede activar
        verificarBoton();

    } catch (error) {
        // Si hay un error, lo mostramos en pantalla
        estado.oponente = null; //limpiamos el oponente
        renderError(error.message, "oponente");
        verificarBoton();
    }
}

//DEBOUNCE 
//Vamos a usarlo en 400 ms antes de llamar buscarOponente

var timeout;

function debounce(func, wait) {
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

//LISTENER DEL BUSCADOR
var inputOponente = document.querySelector("#input-oponente");

//DEBOUNCE A LA FUNCION DE BUSQUEDA
var buscarDebounced = debounce(function() {
    buscarOponente(inputOponente.value);
}, 400);

//Escuchamos cuando el usuario escribe
inputOponente.addEventListener("input", buscarDebounced);

//Verificar el boton
function verificarBoton() {
    var btn = document.querySelector("#btn-batalla");

    if (estado.jugador && estado.oponente) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

//Boton ir a batalla

document.querySelector("#btn-batalla").addEventListener("click", function() {

    // Guardamos los datos del jugador y oponente en el localStorage para usarlos en la proxima etapa
    localStorage.setItem("jugador", JSON.stringify(estado.jugador));
    localStorage.setItem("oponente", JSON.stringify(estado.oponente));

    // Redirigimos a la pagina de batalla
    window.location.href ="../etapa-2/index.html";
});
    //prerellenar ultimo oponente

    var ultimoOponente = localStorage.getItem("ultimo-oponente");
    if (ultimoOponente) {
        inputOponente.value = ultimoOponente;
    }

    // Carga Umbreon apenas se abre la pagina

cargarJugador();