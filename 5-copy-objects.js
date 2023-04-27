/*-----------------Shallow Copy(Copiar objetos en otro objeto)-------------------*/

//Permite la creación de objetos copia, siendo esta independiente al original, es decir, si se cambia algo en la copia, no afecta al original.
//Esto solo se da en objetos con un nivel de profundidad. Si hay objetos dentro de propiedades de otro objeto, se indica que hay un segundo nivel de profundidad y así sucesivamente

// ### Bucle for

const obj1 = {
	a: "a",
	b: "b"
}

const obj2 = {}

for (propiedad in obj1) {
	obj2[propiedad] = obj1[propiedad];
}

console.log(obj2); //{ a: 'a', b: 'b' }

// ### Object.assign

//Permite realizar el mismo shallow copy que podemos hacer con el bucle for

const objNew = {
	a: "a",
	b: "b",
	c: {
		d: "d",
		e: "e"
	}
}

const objNew2 = Object.assign({}, objNew); //recibe dos parametros: el primero es un objeto vacio representado con {} y el segundo el objeto del cual se quiere copiar
console.log(objNew2); //{ a: 'a', b: 'b', c: { d: 'd', e: 'e' } }

// ### Object.create

//Permite crear un objeto que tenga como parte de su prototipo los atributos de otro objeto

const objNewNew = {
	a: "a",
	b: "b",
	c: {
		d: "d",
		e: "e"
	}
}

const objNewNew2 = Object.create(objNewNew);
console.log(objNewNew2); //muestra un object vacio pero la copia fue realizada dentro de __proto__

// ### Spread operator

//Permite copiar tanto un array como un objeto en otra variable, sin que la copia tenga alguna referencia en memoria que el original

let dog = {
    name : "Pascual",
    age : 3
}

let dog2 = {...dog};

dog2.name = "Roco";

console.log(dog2); //{ name: 'Roco', age: 3 }

console.log(dog); //{ name: 'Pascual', age: 3 }

//CUIDADO
//Para todos los métodos anteriores, si se copia un objeto con más de un nivel de profundidad, entonces si se cambia el valor de una propiedad de un subnivel, este afecará a la copia como al original

let a = {
    a : "a",
    b : {
        c : "c"
    }
}

let b = {...a};

b.b.c = "ccc";

console.log(a); //{ a: 'a', b: { c: 'ccc' } }

console.log(b); //{ a: 'a', b: { c: 'ccc' } }