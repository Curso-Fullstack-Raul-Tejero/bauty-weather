// referencio del DOM
const $days = document.querySelectorAll('.other-day');

/**
 * EVENTOS
 */

// forEach es un 'for' escrito más corto. Itera sobre la posición de forma transparente
// Da vueltas por una lista y llama a un callback por cada vuelta
//  1. El elemento
//  2. El índice (se declara solo)
$days.forEach(($day) => {
    $day.addEventListener('click', changePosition);
});


/**
 * FUNCIONES
 */

 function changePosition(ev) {
     // QUitamos la clase 'hero' a todos los días
    $days.forEach(($day) => {
        $day.classList.remove('hero')
    });

    // seleccionamos el pulsado
    const $currentTarget = ev.currentTarget;
    // añadimos la clase 'hero' al pulsado
    $currentTarget.classList.add('hero');
 }

//  function changePosition() {
//      // Quitamos 'hero' al que lo tenga y al que no se lo pone
//     $days.forEach(($day) => {
//         $day.classList.toggle('hero')
//     });
//  }