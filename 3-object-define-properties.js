/*-----------------Creación de nuevas propiedades de un objeto-------------------*/

const rica = {
    name: "Ricardito",
    age: 18,
    approvedCourses: ["Curso 1"],
    addCourse(newCourse) {
        this.approvedCourses.push(newCourse);
    }
};

//Object.defineProperty permite definir un nuevo atributo y modificar sus propiedades que tiene por defecto
Object.defineProperty(rica, "nombreNuevaPropiedad", { //recibe 3 argumentos: 1: nombre del objeto, 2: nombre de la nueva propiedad y 3: objeto con las 4 propiedades por defecto de un atributo
	value: "Maestro", // valor que tendrá
	enumerable: true, //indica si puede ser mostrado en funciones que listan propiedades (ej. Object.keys)
	writable: true, //indica si se puede cambiar un valor
	configurable: false //indica si puede ser eliminado usando delete rica.nombreNuevaPropiedad
});

console.log(rica);

/*
Output:
{
    name: 'Ricardito',
    age: 18,
    approvedCourses: [ 'Curso 1' ],
    addCourse: [Function: addCourse],
    nombreNuevaPropiedad: 'Maestro'
}
*/

// ### Object.seal y Object.freeze

//Object.seal(nombre de objeto) cambia el valor de la propiedad "configurable" de todas las porpiedades del objeto a false
//Object.freeze(nombre de objeto)  cambia los valores de "configurable" y "writeable" a false de todas las propiedades del objeto

// CUIDADO: Ambos métodos impiden que se agreguen nuevos atributos y no pueden ser revocados una vez usados en un objeto, por eso tener un respaldo de ese objeto por recomendación

// ### Object.isSealed y Object.isFrozen

//Object.isSealed evalúa si un objeto cumple con lo que hace Object.seal a ese mismo objeto, devolviendo true o false
//Object.isFrozen evalúa si un objeto cumple con lo que hace Object.freeze a ese mismo objeto, devolviendo true o false