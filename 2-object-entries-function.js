/*-----------------Ejecución de función con Object.entries-------------------*/

const rica = {
    name: "Ricardo",
    approvedCourses: ["Curso 1"],
    addCourse(newCourse) {
          // `this` se usa para hacer referencia al objeto juan
        this.approvedCourses.push(newCourse);
    }
};

//Object.entries permite generar un array donde cada elemento es un array con dos elementos ["propiedad","valor"] del objeto al que se hace referencia

console.log(Object.entries(rica));
/*
Output:
[
    [ 'name', 'Ricardo' ],
    [ 'approvedCourses', [ 'Curso 1' ] ],
    [ 'addCourse', [Function: addCourse] ]
]
*/

//Si accedemos al índice donde está la función addCourse y lo mostramos en consola, obtendríamos lo siguiente:

console.log(Object.entries(rica)[2][1]); //[Function: addCourse]

//En principio pensaríamos que es posible añadir un nuevo curso ejecutando la función desde ahí; sin embargo, esto nos produce un error

Object.entries(rica)[2][1]("Curso 2"); //Error porque this ahora hace referencia al array [ 'addCourse', [Function: addCourse] ] , el cual es Object.entries(rica)[2][1]

//Para solucionar ello se puede usar los métodos call() y bind()

//Con call podemos invocar una función, pasando como parámetro un valor (nombre del objeto) que será tratado como this

//Bind no invocará la función directamente, sino que cambiará el valor this dentro de la función y devolverá la instancia de la función modificada.

Object.entries(rica)[2][1].call(rica,'curso 2'); //this hará referencia a rica y por ende se podrá invocar a la función addCourse asignándole como parametro "curso 2"
Object.entries(rica)[2][1].bind(rica)('curso 2'); //this cambiará su valor al objeto rica y por ende se podrá acceder a su propiedad approvedCourses, mandando como parametro "curso 2"

// ### Diferencia entre el método Object.keys y Object.getOwnPropertyNames

//Object.keys( ) devolverá un array sólo con los nombres de las propiedades cuyo atributo "enumerable" sea true.
//Object.getOwnPropertyNames( ) devolverá un array con todos los nombres de las propiedades, sin importar el valor de su atributo "enumerable".