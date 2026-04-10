// Archivo que se encarga de toda la comunicacion con pokeapi. Busca datos sin tocar la DOM.

var BASE_URL = "https://pokeapi.co/api/v2/pokemon/";


//Funcion principal que recibe el id o nombre pokemon y trae el objeto con datos limpios

export async function getPokemonData(nombre) {


    //fetch a la api, devuelve un objeto con toda la info del pokemon
    var respuesta = await fetch(BASE_URL + nombre, { signal: signal });

    // Si el pokemo no existe se devuelve error

    if (!respuesta.ok) {
        throw new Error("No hay registros del Pokemon " + nombre); 
    }

    //la respuesta se convierte a json
    var datos = await respuesta.json();

    // devolvemos solo lo que se necesita
    return {
        nombre: datos.name,
        imagen: datos.sprites.front_default,
        imagenEspalda: datos.sprites.back_default,
        tipos: datos.types.map(function(t) { return t.type.name; }),
        hp: datos.stats[0].base_stat,
        ataque: datos.stats[1].base_stat,
        defensa: datos.stats[2].base_stat,
        velocidad: datos.stats[5].base_stat,
        movimientos: datos.moves.slice(0, 4).map(function(m) { return m.move.name; })
    };

}
