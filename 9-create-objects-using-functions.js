/*-----------------Creación de objetos usando funciones-------------------*/

function createStudent({
    name,
    age
} = {}) { //define que si no se envía nada por argumento, entonces se creará un objeto vació, evitando que salga un error
    return {
        name,
        age
    }
}

const rica = createStudent();
console.log(rica); //{ name: undefined, age: undefined }

//Si es que se desea si o si pasar un dato obligatorio, se puede crear un función que retorne error

function requiredParam(param) {
    throw new Error(param + " es obligatorio"); // throw new Error es la forma de disparar errores en JS
}

//Entonces esta función se puede pasar por valor de una propiedad

function createStudent2({
    name,
    age = requiredParam("age")
} = {}) { //en este caso ya no serviría porque se tiene que mandar un valor obligatorio
    return {
        name,
        age
    }
}

//const terry = createStudent2(); //Error: age es obligatorio
const luis = createStudent2({age:12});
console.log(luis); //{ name: undefined, age: 12 }

// ### Evitar modificaciones en atributos de objetos

/*Modificaremos la función creada anteriormente con la que podíamos generar nuevos objetos.
Esto con la finalidad de separar los atributos que queremos que sean privados (por ahora solo el atributo name) y públicos.
Además de crear 2 funciones: una para poder modificar el atributo privado y otra para obtener el valor de esa propiedad privada:*/

function createStudent3({
    name,
    age
} = {}) {
    const privateAttributes = { //métodos privados
        "_name" : name,
    }
    const publicAttributes = {//lo que se podrá ver y manipular
        age,
        readName(){
            return privateAttributes["_name"];
        },
        changeName(param) {
            privateAttributes["_name"] = param;
        }
    }
    return publicAttributes;
}

const alfonso = createStudent3({name : "alfonso",age : 14});

console.log(alfonso);
/*
{
    age: 14,
    readName: [Function: readName],
    changeName: [Function: changeName]
}
*/
console.log(alfonso.readName()); //alfonso
alfonso.changeName("alfonsito"); //alfonso //solo a través del método changeName es posible cambiar el nombre, ya que no es posible hacerlo de manera directa
alfonso._name = "GOKU"; //No cambiará de nombre
console.log(alfonso.readName()); //alfonsito

//Sin embargo si lo dejamos así, se podrá modificar el valor de métodos, por lo que se usará Object.defineProperty() para evitar ello

Object.defineProperty(alfonso,"readName",{
    writable : false,
    configurable : false
})
Object.defineProperty(alfonso,"changeName",{
    writable : false,
    configurable : false
})

console.log(Object.getOwnPropertyDescriptors(alfonso));

/*
{
    age: { value: 14, writable: true, enumerable: true, configurable: true },
    readName: {
        value: [Function: readName],
        writable: false,
        enumerable: true,
        configurable: false
    },
    changeName: {
        value: [Function: changeName],
        writable: false,
        enumerable: true,
        configurable: false
    },
    _name: {
        value: 'GOKU',
        writable: true,
        enumerable: true,
        configurable: true
    }
}
*/

// ### Uso de get y set

function createStudent4({
    name,
    age
} = {}) {
    const privateAttributes = {
        "_name" : name,
    }
    const publicAttributes = {
        age,
        get name() { //en vez de los métodos readName y changeName
            return privateAttributes["_name"];
        },
        set name(newName) {
            if (newName.length != 0) { // 👈👈
                privateAttributes["_name"] = newName;
            } else {
                console.warn("Tu nombre debe tener al menos 1 caracter");
            }
        },
    }
    return publicAttributes;
}

const efrain = createStudent4({name : "efrain",age : 20});

console.log(efrain.name); // Se ejecuta el GETTER
efrain.name = "Rigoberto"; // Se ejecuta el SETTER
console.log(efrain.name);

//Si se usa Object.defineProperty si se podrá modificar el nombre

Object.defineProperty(efrain,"name",{
    value:"LOL"
})

console.log(efrain.name); //LOL