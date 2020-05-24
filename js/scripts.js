// cambio

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
for (let i = 0; i < $days.length; i++) {
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
request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=madrid&units=metric&appid=99db4352e0ce75276a335ec68856c395');
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
        const forecastList = data.list; // Array
        // const ahora = new Date(); // crea una instancia de objeto Fecha(Date)

        // Esto es un control para saber los días distintos en el bucle de filtrado
        let actual = null;
        let actualHour = null;

        // .filter() filtra un array generando un nuevo con los elementos que han devuelto 'true'
        // 1. Recibe un callback que expone el elemento de la vuelta actual del bucle
        const filteredForecastList = forecastList.filter(day => {
            const fechaPrediccionActual = new Date(day.dt_txt); // cojo la fecha en String y creo un objeto fecha con ese dato
            const diaDePrediccion = fechaPrediccionActual.getDate();
            const horaDePrediccion = fechaPrediccionActual.getHours();
            // devulve el día del mes y hora

            if ((diaDePrediccion !== actual && horaDePrediccion === actualHour) || (actual === null && actualHour === null)) {
                // Si este día es nuevo, actualizo al actual
                actual = diaDePrediccion;
                actualHour = horaDePrediccion;
                // Y me quedo con esta predicción
                return true;
            }

            // En caso de que la predicciónsea el mismo día que el actual, no me interesa. 
            // Solo quiero días nuevos
            return false;
        });

        pintaDiasPrediccion(filteredForecastList);
    }

    // Función para pintar los datos filtrados
    function pintaDiasPrediccion(listaFiltrada) {
        const traduccionDias = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado'
        ];

        listaFiltrada.forEach((prediccion, index) => {
            const fechaDiaActual = new Date(prediccion.dt_txt);
            // Recojo el día de la semana (0 - 6) de la predicción
            const diaDeLaSemana = fechaDiaActual.getDay();
            // Saco el nombre del día de la semana de mi array por la posición del día de la predicción
            const diaDeLaSemanaActual = traduccionDias[diaDeLaSemana];

            // Monto la url del icono para mostrar
            const icon = prediccion.weather[0].icon;
            const iconoTiempo = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // Pinto en el no TIME dentro del .other-day actual del bucle
            $days[index].querySelector('time').innerText = diaDeLaSemanaActual;
            // Cambio el valor 'src'
            $days[index].querySelector('img').setAttribute('src', iconoTiempo);

            console.log(prediccion);
        });
    }
}

// 0,4,12,20,28,36