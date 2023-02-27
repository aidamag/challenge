# Challenge

## Development server

Para arrancar este proyecto hay que ejecutar `npm run start` en la raíz.
Una vez arrancado, navegar a `http://localhost:4200/`.

## API

La API está mockeada en `https://apimocha.com/challenge-rooms/rooms`. Devuelve un JSON con dos plantas y sus respectivas salas.

## Decisiones

Con la imagen recibida en el email, he identificado varios componentes reutilizables:

- Select
- Text Input
- Button
- Card
- Dialog (para añadir salas y el filtrado)

Las carpetas se dividen como se describen a continuación:

- Carpeta `shared` para implementar estos componentes e utilizarlos en las diferentes vistas.
- Carpeta `services` con un servicio para tratar la API con los datos de las plantas y las salas.
- Carpeta `pipes` con un `pipe` para filtrar el listado de las plantas según capacidad y ocupación.
- Carpeta `components` para las vistas de la aplicación.
- Carpeta `models` que contiene los modelos de datos de la aplicación. Ya que en Angular se utilizan `types`, creé varios modelos de datos y poder utilizar esta ventaja de tipado. Los tipos principales son `Floor` y `Room`:

```
Floor = {
    floor: number; //número de la planta, utilizado como ID único.
    rooms: Room[]; //listado de las salas de la planta
}

Room = {
    room: number; //número de la sala, utilizado como ID único.
    max_capacity: number; //capacidad máxima de la sala
    occupation: number; //ocupación de la sala
}
```

Dentro de la carpeta `components` hay tres componentes:

- `room-filter`: contiene el diálogo y el `form` para hacer el filtrado.
- `room-form`: contiene el diálogo y el `form` para añadir salas a la planta seleccionada.
- `room-list`: página principal que lista las salas según la planta seleccionada en el select.

Recalcar que utilizo reactive forms para mejorar el rendimiento de los forms utilizados en la aplicación.

Para controlar los datos de entrada de la aplicación, utilizo `Behaviour Subject` de `rxjs` ya que es una herramienta útil para controlar el estado actual y compartir los datos entre componentes.

## Dificultades encontradas

Me he encontrado con dos dificultades:

1. `Card` component: He querido hacer todos los componentes lo más genéricos y reutilizables posibles (como el `button` o el `dialog`) para poder utilizarlos con las props correspondientes o introducir los children que sean necesarios con `ng-content`. En el caso de las `cards` no he podido hacer esto del todo.
   Mi implementación ideal de las `cards` hubiera sido utilizando compound components (`card-title`, `card-content` y `card-action`). Sin embargo, ya que cada `card` tiene su propio `form` para modificar los datos de cada una, el código iba a quedar poco legible desde el componente de `room-list` (porque habría que controlar los `form` de cada `card` por separado). Por tanto, la implementación del `form` de modificación está en la propia `card`.
2. Filtrado: He tenido varios problemas con el filtrado ya que Angular no detectaba ningún cambio cuando se modificaba la variable para el lista de las salas (el `pipe` en el `ngFor` no se ejecutaba cuando debía). Para solucionarlo, utilicé la propiedad `pure` en el decorador de `pipe` para que lo ejecute en cada ciclo de detección de cambios.
