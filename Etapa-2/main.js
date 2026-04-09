// Conecta todo importa battle.js y render js, ademas registra listeners y llama batalla.

import { 
    estado, 
    iniciarBatalla,
    scheduleNextAttack,
    jugadorAtaca,
    jugadorDefinitivo,
    checkBattleEnd,
    limpiarTimers
} from './battle.js';

import { 
    render,
    renderInicial,
    startCooldown
} from './render.js';

import TRAINER  from '../trainer.config.js';

// Cuando el DOM esté listo, iniciamos la batalla
document.addEventListener('DOMContentLoaded', function() {

        // Se inicia batalla con render y checkEnd para que battle.js no toque el DOM

    iniciarBatalla(render, function(estado) {
        checkBattleEnd(estado, render);
    });

    renderInicial(estado);


    
// Teclado, se registra el listener una sola vez

function onKeyDown(e) {

    // Si la batalla terminó, no hace nada
    if (estado.phase !== 'fighting') return;

    // Si esta bloqueado ignoramos el movimiento

    if (estado.locked) return;

     if (e.key === 'ArrowLeft' && estado.jugadorPosicion > 1) {
      estado.jugadorPosicion--;
      render(estado);
    }

    if (e.key === 'ArrowRight' && estado.jugadorPosicion < 3) {
      estado.jugadorPosicion++;
      render(estado);
    }
  }

  document.addEventListener('keydown', onKeyDown);

// Listener para cada botón de movimiento
document.querySelector('#movimientos-container').addEventListener('click', function(e) {
  if (!e.target.classList.contains('btn-movimiento')) return;

  // Obtener el índice del movimiento clickeado
  var index = Array.from(
    document.querySelectorAll('.btn-movimiento')
  ).indexOf(e.target);

  jugadorAtaca(render, function(estado) {
    checkBattleEnd(estado, render);
  }, startCooldown, index);
});

  // ── BOTÓN DEFINITIVO 
  document.querySelector('#btn-definitivo').addEventListener('click', function() {
    jugadorDefinitivo(render, function(estado) {
      checkBattleEnd(estado, render);
    });
  });

  // ── BOTÓN REINICIAR 
  // Resetea todo el estado sin recargar la página
  document.querySelector('#btn-reiniciar').addEventListener('click', function() {

    // Oculta la pantalla de fin
    document.querySelector('#pantalla-fin').classList.add('oculto');

    // Limpia los timers activos
    limpiarTimers();

    // Remueve el listener del teclado
    document.removeEventListener('keydown', onKeyDown);

    // Re-registra el listener
    document.addEventListener('keydown', onKeyDown);

    // Reinicia la batalla
    iniciarBatalla(render, function(estado) {
      checkBattleEnd(estado, render);
    });
  });

});