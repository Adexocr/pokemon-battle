// Archivo principal de la batalla, el estado todo en tiempo real. No toca el DOM solo modifica el estado
// y llama a render

import TRAINER from "../trainer.config.js";

// Estado - UN objeto que representa todo lo que pasa en la batalla. 

export var estado = {
    jugador:            null, //datos del pokemon propio
    oponente:           null, //datos del pokemon rival
    jugadorHP:          0, 
    oponenteHP:         0,
    jugadorHPMax:       0, //calcula el porcentaje de la barra
    oponenteHPMax:      0,
    jugadorPosicion:    2,
    incomingAttack:     null, //ataque que viene del oponente
    locked:             false, 
    definitiveUsed:     false, //si se usó el movimiento definitivo
    attackOnCooldown:    false, //si el movimiento está en cooldown
    phase:              'fighting',
    log:               [], //historial de acciones

};

// Timer para guardar referencia

var attackTimeout = null;

// Calculos de HP
// Se hace asi redondeado hacia abajo
function calcularHP(baseHP) {
    return Math.floor(baseHP * 2.5); 
}

// Daño al jugador  movepower  x 0.3 random hasta movepower x 0.4

function calcularDañojugador(movepower) {
    var power = movepower || 60; //si no tiene movepower se le asigna 60 por defecto
    return Math.floor(power * 0.3) + Math.floor(Math.random() * power * 0.4);
    
}

// Daño al oponente attackStat x 0.4 + random hasta 20

function calcularDañoOponente(attackStat) {
    return Math.floor(attackStat * 0.4) + Math.floor(Math.random() * 20);
}
// Esperar por milisegundos
//funcion aux para hacer pausar con await

function wait(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
    }


// Inicio de la batalla, carga los datos desde localStorage y prepara el estado
export function iniciarBatalla(renderFunc, checkEndFunc) {

    //Se leen los datos que se guardaron en la etapa 1
    var jugadorData = JSON.parse(localStorage.getItem('jugador'));
    var oponenteData = JSON.parse(localStorage.getItem('oponente'));

// Si no hay datos se redirige a la etapa 1
    if (!jugadorData || !oponenteData) {
        window.location.href = "../Etapa-1/index.html";
        return;
    }

// Calculo de HP Real
    var jugadorHP = calcularHP(jugadorData.hp);
    var oponenteHP = calcularHP(oponenteData.hp);

//Inicializacion del estado

    estado.jugador = jugadorData;
    estado.oponente = oponenteData;
    estado.jugadorHP = jugadorHP;
    estado.oponenteHP = oponenteHP;
    estado.jugadorHPMax = jugadorHP;
    estado.oponenteHPMax = oponenteHP;
    estado.jugadorPosicion = 2;
    estado.incomingAttack = null;
    estado.locked = false;
    estado.definitiveUsed = false;
    estado.attackOnCooldown = false;
    estado.phase = 'fighting';
    estado.log = [];

    // Se muestra el estado inicial
    renderFunc(estado);

    // Se inicia el turno del oponente
    scheduleNextAttack(renderFunc, checkEndFunc);
}

// Loop del enemigo. Usa setTimeout recursivo. Cada ataque se
//programa al finalizar el anterior, con un tiempo aleatorio

export function scheduleNextAttack(renderFunc, checkEndFunc) {

    //delay aleatrio 
    var delay = ( 3 + Math.random() * 7) * 1000; //entre 3 y 10 segundos 

    attackTimeout = setTimeout(async function() {

        // si la batalla termino no se hace nada
        if (estado.phase !== 'fighting') return;

        await resolverAtaqueEnemigo(renderFunc, checkEndFunc);

        //Si la batalla sigue se programa el siguiente ataque
        if (estado.phase === 'fighting') {
            scheduleNextAttack(renderFunc, checkEndFunc);
        }

    }, delay);
}

// Resolver ataque enemigo
async function resolverAtaqueEnemigo(renderFunc, checkEndFunc) {

    //el enemigo elige un ataque aleatorio a cualquier ade las celdas

    var celdaObjetivo = Math.floor(Math.random() * 3) + 1;
    
    //Se muestra advertencia
    estado.incomingAttack = celdaObjetivo;
    estado.locked = false;
    agregarLog('¡Ataque enemigo en la celda ' + celdaObjetivo + '!');
    renderFunc(estado);

    //Ventana de advertencia de  600ms para moverse
    await wait(600);

    //se bloquea el movimiento
    estado.locked = true;
    renderFunc(estado);

    //Se resuelve el ataque y daño
    if (estado.jugadorPosicion === celdaObjetivo) {
        var daño = calcularDañoOponente(estado.oponente.ataque);
        estado.jugadorHP = Math.max(0, estado.jugadorHP - daño);
        agregarLog('¡Has sido golpeado por el ataque enemigo! Daño recibido: ' + daño);
             // Animación de golpe recibido
        var imgJugador = document.querySelector('#jugador-imagen');
        imgJugador.classList.add('jugador-golpeado');
        setTimeout(function() {
            imgJugador.classList.remove('jugador-golpeado');
        }, 400);
    } else {
        agregarLog('¡Has esquivado el ataque enemigo!');
    }



    //Se limpia el ataque entrante
    estado.incomingAttack = null;
    estado.locked = false;

    // Se verifica si la batalle termino
    checkEndFunc(estado);
    renderFunc(estado);

}

// Ataque del jugador 
export function jugadorAtaca(renderFunc, checkEndFunc, startCooldownFunc, index) {
    if (estado.attackOnCooldown) return; //si el ataque está en cooldown no se puede usar
    if (estado.phase !== 'fighting') return; //si la batalla terminó no se puede atacar

    // Se usa el primer movimiento y poder
    var movePower = 60;
    var daño = calcularDañojugador(movePower);

    estado.oponenteHP = Math.max(0, estado.oponenteHP - daño);

    //Variable que muestra el movimiento. 
    var nombreMovimiento = estado.jugador.movimientos[index] || 'ataque';
    agregarLog('⚔️ ¡Usaste ' + nombreMovimiento + '! Daño: ' + daño);

    // Se verifica si la batalla terminó
    checkEndFunc(estado);
    renderFunc(estado);

    // Se activa el cooldown del ataque
    estado.attackOnCooldown = true;
    renderFunc(estado);
    var cooldownMs = (2 + Math.random() *2) * 1000; //entre 2 y 4 segundos
    startCooldownFunc(cooldownMs, function() {
        estado.attackOnCooldown = false;
        renderFunc(estado);
    });
}


// Movimiento definitivo
export function jugadorDefinitivo(renderFunc, checkEndFunc) {
    if (estado.definitiveUsed) return;
    if (estado.phase !== 'fighting') return;

    estado.oponenteHP = 0;
    estado.definitiveUsed = true;

    // Mensaje especial en el log y animacion del definitivo
    var luna = document.querySelector('#luna-definitivo');
    var mensaje = document.querySelector('#mensaje-definitivo');
    mensaje.textContent = TRAINER.definitiveMoveName;
    luna.classList.add('activa');
    mensaje.classList.add('activo');


    // Animación del definitivo
    var imgJugador  = document.querySelector('#jugador-imagen');
    var imgOponente = document.querySelector('#oponente-imagen');
    imgJugador.classList.add('definitivo-jugador');

    setTimeout(function() {
        imgOponente.classList.add('definitivo-oponente');
    }, 300);

    setTimeout(function() {
        //se limpian las animaciones
        imgJugador.classList.remove('definitivo-jugador');

        luna.classList.remove('activa');
        mensaje.classList.remove('activo');

        // mensaje en el log
        agregarLog('🌙 ¡' + TRAINER.definitiveMoveName + ' usado!');
        agregarLog('✨ ' + TRAINER.definitiveMoveFlavor);
        agregarLog('💫 ¡KO instantáneo! ' + TRAINER.winMessage);

        checkEndFunc(estado);
        renderFunc(estado);
    }, 1000);
}

// Verificar el fin de la batalla
export function checkBattleEnd(estado, renderFunc) {

  if (estado.jugadorHP <= 0) {
    estado.phase = 'ended';
    agregarLog('💀 ' + TRAINER.loseMessage);
    clearTimeout(attackTimeout);
    return true;
}

  if (estado.oponenteHP <= 0) {
    estado.phase = 'ended';
    agregarLog('🏆 ' + TRAINER.winMessage);
    clearTimeout(attackTimeout);
    return true;
}

  return false;
}

// Se agrega al log
export function agregarLog(mensaje) {
    estado.log.push(mensaje);

}

// Limpiar timers
export function limpiarTimers() {
    clearTimeout(attackTimeout);
}

