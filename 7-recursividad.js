/*------------------Recursividad------------------*/

//Es cuando una función se llama a sí misma y crea una nueva ejecución de esa función.
//Estas ejecuciones pueden ser sucesivas hasta llegar a un punto donde se obtenga un valor en espcífico.
//A partir de ahí se ira resolviendo cada una de las ejecuciones hechas

//Donde haya un ciclo iterativo (while, for, etc), se puede aplicar recursividad en vez de ese ciclo y la elección dependerá del contexto.

//### PROBLEMA: Deseamos imprimir una serie de números desde el 0 hasta n números. En este caso hasta el 4

let numerito = 0;

//Solución con ciclos iterativos

while(numerito < 5) {
	console.log(numerito);
	numerito++;
}

// Solución con función recursiva

function recursiva(numerito) { // Recibe un número
	console.log(numerito); // Imprimimos en consola el número
	if (numerito < 5) { // Evalua si es menor a 5
		// Llamamos nuevamente a nuestra función enviandole el número siguiente:
		return recursiva(numerito + 1);
	} else { // La función deja de llamarse a sí misma:
		return 5;
	}
}

recursiva(numerito);

/*
Output:
0
1
2
3
4
5 //este es por el return al parar las ejecuciones secuenciales
*/

// ### ¿Cuándo SÍ es factible de utilizar recursividad?

/*
    -Para simplificar el código.
    -Cuando la estructura de datos es recursiva. Ejemplo: árboles.
*/

// ### ¿Cuándo NO es factible utilizar recursividad?

/*
    -Cuando los métodos usen arreglos largos.
    -Cuando el método cambia de manera impredecible de campos.
    -Cuando las iteraciones sean la mejor opción
*/

// ### Deep Copy

//Esta función permitirá copiar un objeto anidado, incluido los métodos

const obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    },
    editA() {
        this.a = "AAAAA";
    }
};

//Primero declaramos un par de funciones para validar si la función deepCopy recibira un array, object o string

function isObject(subject) { //verifica si es un objeto
    return typeof subject == "object";
}
function esArray(subject) { //verifica si es un array con el método estático isArray del prototipo Array
    return Array.isArray(subject);
}

function deepCopy(subject) {
    let copySubject; //guardará los datos del objeto que se quiere copiar (en este caso obj1)
    const subjectIsArray = esArray(subject); //verificará si lo que se recibe es un array
    const subjectIsObject = isObject(subject); //verificará si lo que se recibe es un objeto

    if(subjectIsArray) { //según la validación se definirá el tipo de dato de copySubject
        copySubject = [];
    } else if(subjectIsObject) {
        copySubject = {};
    } else {
        return subject; //no se hará nada, devolverá lo mismo si no es array u objeto
    }

for(key in subject) { //validamos cada una de las propiedades dentro del objeto a copiar
    const keyIsObject = isObject(subject[key]); //si las propiedades dentro del objeto tienen como valores a otros objetos
    if(keyIsObject) {
        copySubject[key] = deepCopy(subject[key]); //si una propiedad almacena otro objeto, entonces se ira copiando y pegando las propiedades en copySubject gracias la recursividad deepCopy(subject[key]);
    } else {
            if(subjectIsArray) { //si no es un objeto, será un array que tendrá alguna propiedad dentro del objeto a copiar y se usará el método push
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key]; //sino es array ni object el valor de la propiedad, se copiará el valor tal como está
            }
        }
    }
    return copySubject; //retorna la variable con todos las propiedades y métodos del objeto original
}

const obj2 = deepCopy(obj1);

console.log(obj2); //{ a: 'a', b: 'b', c: { d: 'd', e: 'e' }, editA: [Function: editA] }