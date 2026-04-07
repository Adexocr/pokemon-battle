Este documento explica un poco lo que se logro durante la primera fase del proyecto Pokemon Battle.

El objetivo principal del proyecto es practicar conceptos fundamentales de JavaScript en la construccion de un prototipo de juego.

El proyecto consta de dos etapas, siendo esta primera el inicio y base de la pagina principal. El jugador principal es ya fijo (UMBREON) y puede escogerse cualquier otro Pokemon en tiempo real del sitio de PokeAPI.

Conceptos aplicados: Se logro hacer peticiones a API a traves de fetch y manejando la respuesta con JSON para trabajarlo como objeto de JS.

Async/Await con try/catch para manejar errores sin interrumpir la pagina.

Se utilizo querySelector para manipulacion del DOM y actualizar el contenido directo desde JS.

Se utilizo Debounce para buscador de oponentes en este caso con una respuesta de 400ms.

Todo esta separado por diferentes archivos que cumples sus funciones. Si bien el punto del proyecto era JS, tambien gracias a la IA pude hacer y estudiar algunas cosas extra en CSS para darle un toque visual mas potente. Entonces lo principal de casda archivo es;

api.js para hablar con la API - render.js para mostrar el DOM - main.js es el que conecta todo con todo.

Como se dijo anteriormente este seria la primer etapa del proyecto. En la segunda etapa se busca hacer una interfaz mas dinamica y practicar un poco mas de los conceptos ya utilizados.
