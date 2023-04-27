/*-----------------Abstracción de objetos literales-------------------*/

// OBJETO BASE
const studentBase = {
    name: undefined,
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socialMedia: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    },
};

//Con esto podemos crear nuevos estudiantes generando copias a partir de este objeto literal studentBase.

function isObject(subject) {
    return typeof subject == "object";
}

function isArray(subject) {
    return Array.isArray(subject);
}

// FUNCIÓN RECURSIVA
function deepCopy(subject) {
    let copySubject;

    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsArray) {
        copySubject = [];
    } else if (subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }
    return copySubject;
}

// GENERANDO NUEVOS OBJETOS
const rica = deepCopy(studentBase);
const terry = deepCopy(studentBase);

/*-----------------Encapsulación de objetos literales-------------------*/

Object.defineProperty(rica, "name", { //También permite editar propiedades existentes
	value: "Ricardito", // Definimos el valor del atributo "name" como "Juanito"
	configurable: false
});
// El resto de propiedades (writable y enumerable) por defecto serán true

// Si intentamos borrar el atributo "name"
delete rica.name

// Observamos que no fue eliminado dicho atributo, pues bloqueamos su eliminación
console.log(rica);

/*
{
    name: 'Ricardito',
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socialMedia: { twitter: undefined, instagram: undefined, facebook: undefined }
}
*/

console.log(Object.seal(rica)); // Ahora todos los atributos están restringidos a que sean eliminados

console.log(Object.isSealed(rica)); //true //Verificar si no se pueden borrar los atributos de un objeto