//Archivo que se encarga de recibir objetos con datos y mostrarlos en pantalla. 
//no habla la con la api, solo trabaja con la DOM.

//Recibe los datos de un pokeon y en donde se va a mostrar
//va a haber dos lados: jugador y oponente


export function renderPokemon(datos, lado) {

    //seleccionamos el contenedor del pokemon
    document.querySelector("#" + lado + "-nombre").textContent = datos.nombre;

   // seleccionamos la imagen del pokemon

    document.querySelector("#" + lado + "-imagen").src = datos.imagen;

    //se seleccionan los tipos

    document.querySelector("#" + lado + "-tipos").textContent = datos.tipos.join(" / ");

    //se muestran stats
    document.querySelector("#" + lado + "-hp").textContent = " ❤️HP: " + datos.hp;
    document.querySelector("#" + lado + "-ataque").textContent = " ⚔️Ataque: " + datos.ataque;
    document.querySelector("#" + lado + "-defensa").textContent = " 🛡️Defensa: " + datos.defensa;
    document.querySelector("#" + lado + "-velocidad").textContent = " ⚡Velocidad: " + datos.velocidad;

    //se muestran movimientos
    document.querySelector("#" + lado + "-movimientos").textContent = datos.movimientos.join(", ");

}

//Error si la api falla sin romper pagina

export function renderError(mensaje, lado) {
    document.querySelector("#" + lado + "-nombre").textContent = "Error ❌ " + mensaje;
    document.querySelector("#" + lado + "-imagen").src             = "";
    document.querySelector("#" + lado + "-tipos").textContent      = "";
    document.querySelector("#" + lado + "-hp").textContent         = "";
    document.querySelector("#" + lado + "-ataque").textContent     = "";
    document.querySelector("#" + lado + "-defensa").textContent    = "";
    document.querySelector("#" + lado + "-velocidad").textContent  = "";
    document.querySelector("#" + lado + "-movimientos").textContent = "";

}

// Mientras se espera la respuesta de la api, se muestra un mensaje de cargando

export function renderLoading(lado) {
    document.querySelector("#" + lado + "-nombre").textContent = "Cargando...";
    document.querySelector("#" + lado + "-imagen").src =  " ";
    document.querySelector("#" + lado + "-tipos").textContent = "?";
    document.querySelector("#" + lado + "-hp").textContent = "❤️?";
    document.querySelector("#" + lado + "-ataque").textContent = "⚔️?";
    document.querySelector("#" + lado + "-defensa").textContent = "🛡️?";
    document.querySelector("#" + lado + "-velocidad").textContent = "⚡?";
    document.querySelector("#" + lado + "-movimientos").textContent = "❓";
}

