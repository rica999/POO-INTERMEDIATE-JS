/*------------------Objetos anidados------------------*/

//Son objetos que tienen como valor de una propiedad otro objeto y así sucesivamente. Cada subobjeto define el nivel de profundidad del objeto.

//### JSON.parse y JSON. stringify
//Para copiar objetos con más de un nivel de profundidad se puede usar JSON.stringify (convierte un object a string) y JSON.parse (convierte un string a object)
//Esto funciona también para objetos instanciados a una clase

const obj1 = {
    a: 'a',
    b: 'b',
    c: {
        d: 'd',
        e: 'e',
    }
}

const stringifiedComplexObj = JSON.stringify(obj1); // Convertimos objt1 a string y el resultado lo asignamos en un variable
// Lo convertimos a objeto y lo asignamos al nuevo objeto:
const obj2 = JSON.parse(stringifiedComplexObj); // Convertimos stringifiedComplexObj a object

// Esta forma evita que si hacemos modificaciones en uno de las propiedades de un subnivel
obj2.c.d = "nested object";
obj2.c.e = "nested object";
// El objeto original no se vería afectado
console.log(obj1); //{ a: 'a', b: 'b', c: { d: 'd', e: 'e' } }
console.log(obj2); //{ a: 'a', b: 'b', c: { d: 'nested object', e: 'nested object' } }

//CUIDADO
//Este método se considera mala práctica para copiar objetos porque:

/*
    -Puedes perder tipos de datos.
    -JavaScript no te avisara cuando pierdas algún tipo de dato al usar JSON.stringify(), asi que GG mi rey
    -Convierte tipos de datos no soportados en soportados, como infinity y NaN en null
    -Los tipos de datos Date serán parseados como strings, no como Date
    -No es tan rápido y eficiente.
*/

//### StructureClone

//Permite la copia de nested objects más rápido.

const obj3 = structuredClone(obj1);

console.log(obj3); //{ a: 'a', b: 'b', c: { d: 'd', e: 'e' } }

//OBSERVACIÓN
//Ambos métodos (JSON y structureClone) no funcionan si el objeto presenta métodos


