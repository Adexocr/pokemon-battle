//Archivo que se encarga de recibir objetos con datos y mostrarlos en pantalla. 
//no habla la con la api, solo trabaja con la DOM.

//Recibe los datos de un pokeon y en donde se va a mostrar
//va a haber dos lados: jugador y oponente


export function renderPokemon(datos, lado) {

    // Se quita el skeleton de la imagen y se muestra la real
  var skImg = document.querySelector("#" + lado + "-sk-imagen");
  if (skImg) skImg.style.display = "none";
  document.querySelector("#" + lado + "-imagen").style.display = "block";

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

/*export function renderLoading(lado) {
    document.querySelector("#" + lado + "-nombre").textContent = "Cargando...";
    document.querySelector("#" + lado + "-imagen").src = " ";
    document.querySelector("#" + lado + "-tipos").textContent = "?";
    document.querySelector("#" + lado + "-hp").textContent = "❤️?";
    document.querySelector("#" + lado + "-ataque").textContent = "⚔️?";
    document.querySelector("#" + lado + "-defensa").textContent = "🛡️?";
    document.querySelector("#" + lado + "-velocidad").textContent = "⚡?";
    document.querySelector("#" + lado + "-movimientos").textContent = "❓";
}
*/
// Prueba para skeleton loading, se muestra un esqueleto mientras se espera la respuesta de la api, en vez de un mensaje de cargando.
export function renderLoading(lado) {
 // Imagen — skeleton cuadrado
  document.querySelector("#" + lado + "-imagen").src = "";
  document.querySelector("#" + lado + "-imagen").style.display = "none";

  // Nombre
  document.querySelector("#" + lado + "-nombre").innerHTML =
    '<span class="skeleton sk-nombre"></span>';

  // Tipos
  document.querySelector("#" + lado + "-tipos").innerHTML =
    '<span class="skeleton sk-tipo"></span>';

  // Stats
  document.querySelector("#" + lado + "-hp").innerHTML =
    '<span class="skeleton sk-stat"></span>';
  document.querySelector("#" + lado + "-ataque").innerHTML =
    '<span class="skeleton sk-stat"></span>';
  document.querySelector("#" + lado + "-defensa").innerHTML =
    '<span class="skeleton sk-stat"></span>';
  document.querySelector("#" + lado + "-velocidad").innerHTML =
    '<span class="skeleton sk-stat"></span>';

  // Movimientos
  document.querySelector("#" + lado + "-movimientos").innerHTML =
    '<span class="skeleton sk-ataques"></span>';

  // Skeleton para la imagen
  var imgContainer = document.querySelector("#" + lado + "-imagen").parentElement;
  var skImg = document.querySelector("#" + lado + "-sk-imagen");
  if (!skImg) {
    skImg = document.createElement("span");
    skImg.id = lado + "-sk-imagen";
    skImg.className = "skeleton sk-imagen";
    imgContainer.insertBefore(skImg, document.querySelector("#" + lado + "-imagen"));
  }
  skImg.style.display = "block";
}