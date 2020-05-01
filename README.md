# Beauty Weather
> Proyecto de estudio de desarrollo de aplicación web con Javascript usando la api [metaweather](https://openweathermap.org) Requiere autenticación para crear API Key Para iconos será esta URL [iconos](https://openweathermap.org/weather-conditions)

## Diseño

Trabajamos sin diseño marcado, aunque tomamos como referencia una app existente, cuya imagen a conseguir (con distancias) sería ![guia-app](https://media.istockphoto.com/vectors/weather-forecast-app-vector-weather-icons-set-blue-background-mobile-vector-id869665184)

## Características

- El contenido grande muestra el tiempo de hoy:

- El resto de días de la semana van en los cuadros azules

- Al pulsar un cuadro azul, la info ocupa el cuadro verde, intercambiándose
con el azul

- Selección de ciudad (input de texto)

- Pantalla para cuando no hay resultados para esa ciudad

- [Eventos DOM](https://developer.mozilla.org/es/docs/Web/Events) 

### Temas vistos
- Loops básicos
- Eventos DOM
- [Asincronía](#asincronía)

#### Asincronía

```js
 // Síncrono (secuencial)
 // Asícnrono (paralelo)

const suma = 3 + 4;


setTimeout(() => {
    // 4
    console.log('Otro Resultado', suma);
}, 5000);

setTimeout(() => {
    // 3
    console.log('Resultado', suma);
}, 0);


(() => {
    // 1
    console.log('inmediato')
})();

// 2
console.log('Calculando...');
```