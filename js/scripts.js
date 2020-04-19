// Referencia de elementos del DOM
const $hero = document.getElementById('hero');
const $days = document.querySelectorAll('.other-day');


// For necesita
//  1. Variable de iteración (índice)
//  2. Condición para seguir dando vueltas
//  3. Incrementar el índice
// const numeros = [1,2,3,4];
// for(let i = 0; i < numeros.length; i++) {
    //     console.log(i, numeros[i]);
    // }
    
    
// Eventos
for(let i = 0; i < $days.length; i++) {
    const $currentDay = $days[i];
    
    // addEventListener escucha señales (eventos) de un elemento DOM
    //  1. El evento a escuchar
    //  2. La función que se ejecuta cuando suceda (callback)
    $currentDay.addEventListener('click', clickDay);
}


/**
 * FUNCIONES
 * 
 * uso de 'hoisting' => funciones tradicionales son reubicadas al comienzo del script por el intérprete
 */

// Callback para click en other-days
function clickDay(event) {
    // Los callbacks reciben siempre el evento que lo llamó
    // Los eventos, entre otras, tienen 'target' => el elemento que ha sido víctima de la acción
    // También existe el 'currentTarget' => el elemento que estaba escuchando el evento
    // Los evento tienen "burbujas" (bubbles) => un hijo que no tiene evento puede emitir el mismo evento (click) y sube (burbujea) hasta que un padre dispare el listener

    // Recojo el elemento que ha sido pulsado
    const $clickedDay = event.currentTarget;
    const $dayContent = $clickedDay.innerHTML;
    // Referencio el contenido del Hero
    const $heroContent = $hero.innerHTML;
    
    // Intercambio contenidos
    $clickedDay.innerHTML = $heroContent;
    $hero.innerHTML = $dayContent;
}