// Solo muestra el DOM a partir del estado. No tiene logica de la batalla solo de visualizacion

// Render principal

export function render(estado) {

  var btnMovimientos = document.querySelectorAll('.btn-movimiento');
btnMovimientos.forEach(function(btn) {
  btn.disabled = estado.attackOnCooldown || estado.phase === 'ended';
});

    //HP Jugador
var jugadorPct = (estado.jugadorHP / estado.jugadorHPMax) * 100;
document.querySelector("#jugador-hp-fill").style.width = jugadorPct + '%';
document.querySelector("#jugador-hp-texto").textContent = 
    estado.jugadorHP + ' / ' + estado.jugadorHPMax;

// Color de la barra segun el HP restante

if (jugadorPct > 50) {
    document.querySelector('#jugador-hp-fill').style.background = '#42c97a'; // verde
  } else if (jugadorPct > 25) {
    document.querySelector('#jugador-hp-fill').style.background = '#f5c842'; // amarillo
  } else {
    document.querySelector('#jugador-hp-fill').style.background = '#e84040'; // rojo
  }

//HP Oponente
var oponentePct = (estado.oponenteHP / estado.oponenteHPMax) * 100;
  document.querySelector('#oponente-hp-fill').style.width = oponentePct + '%';
  document.querySelector('#oponente-hp-texto').textContent =
    estado.oponenteHP + ' / ' + estado.oponenteHPMax;

  if (oponentePct > 50) {
    document.querySelector('#oponente-hp-fill').style.background = '#42c97a';
  } else if (oponentePct > 25) {
    document.querySelector('#oponente-hp-fill').style.background = '#f5c842';
  } else {
    document.querySelector('#oponente-hp-fill').style.background = '#e84040';
  }


// La arena
//Se limpia todas las celdas del jugador primero
  for (var i = 1; i <= 3; i++) {
    var celdaJugador = document.querySelector('#jugador-celda-' + i);
    celdaJugador.textContent = '';
    celdaJugador.className = 'arena-celda';

    // Marcamos la celda donde está el jugador
    if (i === estado.jugadorPosicion) {
      celdaJugador.textContent = '🟡';
      celdaJugador.classList.add('celda-jugador');
    }

    // Marcar la celda del ataque entrante
    if (i === estado.incomingAttack) {
      celdaJugador.classList.add('celda-peligro');
    }
  }

  //Botones
  var btnDefinitivo = document.querySelector('#btn-definitivo');

  

  // El definitivo se deshabilita después de usarlo una vez
  btnDefinitivo.disabled = estado.definitiveUsed || estado.phase === 'ended';

  // Log
  var logContenido = document.querySelector('#log-contenido');
  logContenido.innerHTML = '';

  // Mostramos los últimos 5 eventos del log
  var ultimos = estado.log.slice(-5);
  ultimos.forEach(function(mensaje) {
    var p = document.createElement('p');
    p.textContent = mensaje;
    logContenido.appendChild(p);
  });

  // Auto-scroll al último mensaje
  logContenido.scrollTop = logContenido.scrollHeight;

  //Pantalla de fin
  if (estado.phase === 'ended') {
    var pantallaFin = document.querySelector('#pantalla-fin');
    var mensajeFin  = document.querySelector('#mensaje-fin');

    if (estado.jugadorHP <= 0) {
      mensajeFin.textContent = '💀 ' + estado.oponente.nombre + ' ganó...';
    } else {
      mensajeFin.textContent = '🏆 ¡' + estado.jugador.nombre + ' ganó!';
    }

    pantallaFin.classList.remove('oculto');
  }
}

// Render inicial
export function renderInicial(estado) {

    //Jugador
    document.querySelector('#jugador-nombre').textContent = estado.jugador.nombre;
    document.querySelector('#jugador-imagen').src = estado.jugador.imagenEspalda || estado.jugador.imagen;

    //Oponente
    document.querySelector('#oponente-nombre').textContent = estado.oponente.nombre;
  document.querySelector('#oponente-imagen').src = estado.oponente.imagen;

  // los botones de movimiento. 
  var container = document.querySelector('#movimientos-container');
  container.innerHTML = '';

  estado.jugador.movimientos.forEach(function(movimiento, index) {
    var btn = document.createElement('button');
    btn.textContent = '⚔️ ' + movimiento;
    btn.className = 'btn-movimiento';
    btn.id = 'btn-movimiento-' + index;
    btn.disabled = true; // empieza deshabilitado
    container.appendChild(btn);
  });
}

//Cooldown con animacion suave
export function startCooldown(duracionMs, onComplete) {
  var inicio = performance.now();
  var barra  = document.querySelector('#cooldown-fill');

  function tick(ahora) {
    var transcurrido = ahora - inicio;
    var pct = Math.min(transcurrido / duracionMs, 1);

    // La barra se vacía de izquierda a derecha
    barra.style.width = ((1 - pct) * 100) + '%';

    if (pct < 1) {
      requestAnimationFrame(tick);
    } else {
      // Cooldown terminado — avisamos a battle.js
      onComplete();
    }
  }

  requestAnimationFrame(tick);
}

export function animarAtaque() {
  var imgJugador  = document.querySelector('#jugador-imagen');
  var imgOponente = document.querySelector('#oponente-imagen');

  imgJugador.classList.add('jugador-atacando');
  imgOponente.classList.add('oponente-golpeado');

  setTimeout(function() {
    imgJugador.classList.remove('jugador-atacando');
    imgOponente.classList.remove('oponente-golpeado');
  }, 400);
}