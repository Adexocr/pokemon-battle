Este documento explica un poco lo que se logro durante la primera fase del proyecto Pokemon Battle.

link de github pages: https://adexocr.github.io/pokemon-battle/
link loom explicando proyecto: https://www.loom.com/share/f3073f3daa314ab4a6df7a0a3c5f91cf

El objetivo principal del proyecto es practicar conceptos fundamentales de JavaScript en la construccion de un prototipo de juego.

El proyecto consta de dos etapas, siendo esta primera el inicio y base de la pagina principal. El jugador principal es ya fijo (UMBREON) y puede escogerse cualquier otro Pokemon en tiempo real del sitio de PokeAPI.

Conceptos aplicados

-Se logro hacer peticiones a API a traves de fetch y manejando la respuesta con JSON para trabajarlo como objeto de JS.
-Async/Await con try/catch para manejar errores sin interrumpir la pagina.
-Se utilizo querySelector para manipulacion del DOM y actualizar el contenido directo desde JS.
-Se utilizo Debounce para buscador de oponentes en este caso con una respuesta de 400ms.
-Todo esta separado por diferentes archivos que cumples sus funciones. Si bien el punto del proyecto era JS, tambien gracias a la IA pude hacer y estudiar algunas cosas extra en CSS para darle un toque visual mas potente. Entonces lo principal de casda archivo es:

api.js para hablar con la API - render.js para mostrar el DOM - main.js es el que conecta todo con todo.

Paleta de colores y diseño

El diseño del proyecto está inspirado en los colores de Umbreon — negro profundo (#0d0d0d) como fondo principal, dorado (#f5c842) para bordes, textos y acentos, azul noche (#1a1a2e) para las tarjetas, y morado (#a566e8) exclusivamente para el movimiento definitivo Moonlight Requiem. El VS usa rojo (#e84040) para generar contraste dramático entre los dos lados. Para la Etapa 2 se usó el mismo sistema de colores para mantener consistencia visual entre ambas pantallas.

En la Etapa 2 se practicó el uso de setTimeout recursivo para el loop de batalla en tiempo real, requestAnimationFrame para animaciones de cooldown, y AbortController para cancelar peticiones HTTP en vuelo.

Ataques y movimientos

Los movimientos del jugador se obtienen directamente desde la PokeAPI al cargar el Pokémon en la Etapa 1. Se toman los primeros 4 movimientos disponibles y se guardan en el objeto de estado junto con el resto de los datos. Al pasar a la Etapa 2, estos movimientos se leen desde localStorage y se generan dinámicamente como botones en pantalla — no están escritos en el HTML sino que se crean desde JavaScript en el momento en que inicia la batalla.

Cada ataque usa una fórmula de daño basada en un poder base de 60 más un componente aleatorio, lo que hace que cada golpe sea diferente. Al presionar un botón de ataque, se activa un cooldown de entre 2 y 4 segundos durante el cual no se puede atacar de nuevo. Este cooldown se muestra visualmente como una barra que se vacía, animada con requestAnimationFrame para que la transición sea completamente suave.

El movimiento definitivo, Moonlight Requiem, funciona diferente — está disponible una sola vez por batalla y al usarlo el HP del oponente baja directamente a cero. Se acompaña de una animación especial con una luna que aparece en pantalla y el oponente se desvanece gradualmente. Una vez usado, el botón queda deshabilitado permanentemente para esa batalla.

Para moverse se utilizan las flechas izquierda y derecha del teclado. Para los ataques, se utiliza el mouse y se escoge el ataque deseado. 

Los dos retos más difíciles

1- El primer gran reto fue la gestión del skeleton loading combinado con el AbortController — cuando el usuario escribía rápido, las peticiones canceladas a veces dejaban el DOM en un estado inconsistente, mostrando errores o imágenes incorrectas. Resolverlo requirió entender bien el ciclo de vida de cada petición y cuándo limpiar el estado correctamente.

2- El segundo reto fue el loop de batalla en tiempo real de la Etapa 2 — coordinar el setTimeout recursivo del enemigo, la ventana de esquive de 600ms, el cooldown del jugador con requestAnimationFrame, y las animaciones de los sprites sin que se pisaran entre sí fue el ejercicio más complejo del proyecto. Cualquier error en el orden de las operaciones rompía la lógica completa de la batalla.