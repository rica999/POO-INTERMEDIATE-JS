/*------------------Métodos y propiedades estáticas-------------------*/

//Una forma para acceder a propiedades y métodos sin instanciar a un prototipo es asignarles "static" antes del nombre de la propiedad y método en el prototitpo.

class Patito {
	static sonidito = "cuak!";

	static hacerSonidito() {
		return "cuak! x2";
	}
}

// Por fuera de clase Patito, podemos acceder a lo siguiente sin crear alguna instancia:
// Al atributo `sonidito`
console.log(Patito.sonidito) //cuak!

// Al método `hacerSonidito`
console.log(Patito.hacerSonidito()); //cuak! x2

// ### Método estático Object.getOwnPropertyDescriptors

//El prototipo padre Object tiene métodos estáticos como Object.keys, Object.entries, Object.getOwnPropertyDescriptors.
//Este último método devuelve un objeto con los atributos de nuestro objeto inicial.
//Cada atributo contiene un objeto con el valor correspondiente a dicha propiedad, además de 3 propiedades adicionales: writable, configurable y enumerable.
//Estas 3 propiedades son usadas por JavaScript internamente para indicar el límite de acceso y modificación que tiene un objeto.

const objetito = {
    name: "Juanito",
    email: "juanito@frijolitos.io",
    age: 18,
}

console.log(Object.getOwnPropertyDescriptors(objetito));

/*
Output:
{
    name: {
        value: 'Juanito',
        writable: true,
        enumerable: true,
        configurable: true
    },
    email: {
        value: 'juanito@frijolitos.io',
        writable: true,
        enumerable: true,
        configurable: true
    },
    age: {
        value: 18,
        writable: true,
        enumerable: true,
        configurable: true
    }
}
*/