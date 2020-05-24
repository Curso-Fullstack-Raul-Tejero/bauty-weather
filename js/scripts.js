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
request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=madrid&appid=99db4352e0ce75276a335ec68856c395');
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
        
        
        // .filter() filtra un array generando un nuevo con los elementos que han devuelto 'true'
        // 1. Recibe un callback que expone el elemento de la vuelta actual del bucle
            const filteredForecastList = forecastList.filter(day => {
            const fechaPrediccionActual = new Date(day.dt_txt); // cojo la fecha en    String y creo un objeto 
            
            const diaDePrediccion = fechaPrediccionActual.getDate();
            const horaDePrediccion = fechaPrediccionActual.getHours();
            // devulve el día del mes y hora
                            
            if (diaDePrediccion !== actual && horaDePrediccion !== actual) {
                // Si este día es nuevo, actualizo al actual
                actual = diaDePrediccion;
                // Y me quedo con esta predicción
                return true;
            }

            // En caso de que la predicciónsea el mismo día que el actual, no me interesa. 
            // Solo quiero días nuevos
            return false;
        });


        const   dateHero = filteredForecastList[0];
        const   hourDateHero = dateHero.dt_txt;
        const   dateHeroActual = dateHero.main;        
        // const   dataHeroSplice = dateHero.main.splice(0);
        const   dateHeroDay = new Date (hourDateHero);
        console.log(dateHeroDay);

        const   $heroTime = $hero.querySelector(".hero--date"),
                $heroIndex = $hero.querySelector(".item.index"),
                $heroMax = $hero.querySelector(".item.max"),
                $heroMin = $hero.querySelector(".item.min"),
                $heroHumidity = $hero.querySelector(".item.humidity");

        
        $heroTime.innerText = dateHeroDay.toDateString();
        $heroIndex.innerText = dateHeroActual.temp + "actual";
        $heroMax.innerText = dateHeroActual.temp_max +" max." ;
        $heroMin.innerText = dateHeroActual.temp_min + " min.";
        $heroHumidity.innerText = dateHeroActual.humidity + " % humidity";
        
        const   $secondDayTime = document.querySelector(".second-day-time"),
                $thirdDayTime = document.querySelector(".third-day-time"),
                $fourthDayTime = document.querySelector(".fourth-day-time"),
                $fifthDayTime = document.querySelector(".fifth-day-time");
        
        
        const traducctionDay = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "jueves",
            "Viernes"
        ];

        const dateSecondDay = new Date (filteredForecastList[1].dt_txt);
        const dateThirdDay = new Date (filteredForecastList[2].dt_txt);
        const dateFourthDay = new Date (filteredForecastList[3].dt_txt);
        const dateFifthDAy = new Date (filteredForecastList[4].dt_txt);

        $secondDayTime.innerText = dateSecondDay.toDateString();
        $thirdDayTime.innerText =  dateThirdDay.toDateString();
        $fourthDayTime.innerText = dateFourthDay.toDateString();
        $fifthDayTime.innerText =  dateFifthDAy.toDateString();

        function writeApiIcon(icon) {
                return ("http://openweathermap.org/img/wn/"+icon+"@2x.png");
        }
        
        const   $forecastImg = document.querySelector(".forecast-img"),
                $seconDayImg = document.querySelector(".second-day-img"),
                $thirdDayImg = document.querySelector(".third-day-img"),
                $fourthDayImg = document.querySelector(".fourth-day-img"),
                $fifthDayImg = document.querySelector(".fifth-day-img");

        $forecastImg.src = writeApiIcon(filteredForecastList[0].weather[0].icon);
        $seconDayImg.src = writeApiIcon(filteredForecastList[1].weather[0].icon);
        $thirdDayImg.src = writeApiIcon(filteredForecastList[2].weather[0].icon);
        $fourthDayImg.src = writeApiIcon(filteredForecastList[3].weather[0].icon);
        $fifthDayImg.src = writeApiIcon(filteredForecastList[4].weather[0].icon);

        console.log(filteredForecastList);
    }
    
}








