// Referencia de elementos del DOM
const $hero = document.getElementById('hero'); 
const $days = document.querySelectorAll('.other-day');


// For necesita
//  1. Variable de iteración (índice)
//  2. Condición para seguir dando vueltas (lenght=> total de elementos)
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



/**********************
 * 
 * A J A X
 * 
 *********************/

 // Objeto de petición => constructor (new)
const request = new XMLHttpRequest();
// Abrir la petición (prepararla)
//  1. Verbo (método) de petición HTTP
//  2. Url a la que se hace el envío
request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=madrid&appid=a7e8255c1e50964ec4c60b7907e9af7f');
//Antes de hacer el envío suscribimos eventos
request.addEventListener('load', dataReceived);
// envía la petición
request.send();

// callback de petición
function dataReceived() {
    // comprobamos que la petición sea exitosa => 200
    if (request.status === 200) {
        // Parseamos la respuesta para que sea JSON
        const data = JSON.parse(request.response);
        // Hacemos uso de los nodos que queramos
        console.log(data);
        console.log(data.list[0].main);
        console.log(data.list[4].main);
    
        
        // TODO: extraer las predicciones de los días que necesitamos (vienen varias por día)
        // TODO: extraer la info que necesitamos
        // TODO: Sacar el icono del tiempo
        
    }
}

// 0,4,12,20,28,36