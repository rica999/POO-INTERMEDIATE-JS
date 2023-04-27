/*-----------------Duck typing-------------------*/

//Permite definir si un elemento es lo que es si se cumple con ciertos métodos y atributos

function requiredParam(param) {
    throw new Error(param + " es obligatorio");
}

function createLearningPath({
    name = requiredParam("name"), // Campo es obligatorio
    courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
    const private = { // Atributos privados
        "_name": name,
        "_courses": courses,
    };
    const public = { // Getters y Setters
        get name() {
            return private["_name"];
        },
        set name(newName) {
            if (newName.length != 0) {
                private["_name"] = newName;
            } else {
                console.warn("El nombre debe tener al menos 1 caracter");
            }
        },
        get courses() {
            return private["_courses"];
        },
    };
}

function createStudent({
    name = requiredParam("name"),
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {
    const privateAtributos = {
        "_name": name,
        "_learningPaths": learningPaths,
    };

    const publicAtributos = {
        email,
        age,
        approvedCourses,
        //learningPaths,
        socialMedia: {
            twitter,
            instagram,
            facebook,
        },
        get name() {
            return privateAtributos["_name"];
        },
        set name(newName) {
            if (newName.length != 0) {
                privateAtributos["_name"] = newName;
            } else {
                console.warn("Tu nombre debe tener al menos 1 caracter");
            }
        },
        get learningPaths() {
            return private["__learningPaths"];
        },
        set learningPaths(newLP) {
            // AQUÍ empezamos a aplicar DUCK TYPING 👀🦆
            if (!newLP.name) {
                // Si la nueva ruta de aprendizaje NO tiene el atributo "name"...
                console.warn("Tu LP no tiene la propiedad name");
                return; // Cortamos el proceso y no agregamos la ruta de aprendizaje
            }

            if (!newLP.courses) {
                // Si la nueva ruta NO tiene asignado un array
                // en el atributo "courses"
                console.warn("Tu LP no tiene courses");
                return; // Cortamos el proceso y no agregamos la ruta de aprendizaje
            }

            if (!isArray(newLP.courses)) {
                // Si el atributo "courses" en la nueva ruta de aprendizaje NO es un Array
                console.warn("Tu LP no es una lista (*de cursos)");
                return; // Cortamos el proceso y no agregamos la ruta de aprendizaje
            }

            // Si la nueva ruta de aprendizaje pasó por todas las validaciones
            // correctamente...Quiere decir que SÍ es una ruta válida tal como
            // la deseamos que fuese. Por tanto, procedemos a añadir ese Learning Path
            // a la lista de rutas del estudiante:
            private["_learningPaths"].push(newLP);
        },
    };

    return publicAtributos;
}

//Ahora ya podríamos añadir nuevas rutas con los atributos que esperamos que tenga una ruta de aprendizaje a los nuevos estudiantes:

const jose = createStudent({ email: "joselito@frijoles.co", name: "joseito" });

// Le asignamos al estudiante "jose" una ruta de aprendizaje:
jose.learningPaths = {
    name: "Escuela de Desarrollo Web",
    courses: [],
}

//En teoría, la ruta que añadimos es un learning path, sin embargo, no hemos validado que se haya generado esa ruta de aprendizaje con la función generadora de learning paths (createLearningPath).
//Es decir, nosotros no creamos la ruta de “desarrollo web” de este modo:

/*
const escuelaWeb = createLearningPath({
    name: "Escuela de Desarrollo Web",
    courses: []
})
*/

//Si no que lo hicimos directamente en el objeto jose. El objeto escuelaWeb es una ruta que heredó las propiedades de la función fábrica de learning paths y el otro es uno que producimos directamente desde el objeto jose.

//Lo anterior nos lleva al problema SER o TENER: no estamos validando si nuestros learning paths son realmente objetos que se construyeron desde createLearningPath, lo que validamos es que sí tienen los atributos que esperaríamos que tenga una ruta de aprendizaje.

// ### instead of

//Permite validar si un objeto es instancia de un prototipo, devolviendo true o false

//Convertiremos nuestras funciones createLearningPath y createStudent en prototipos y validamos si nuestras rutas de aprendizaje que vayamos a crear son auténticas, es decir, si son instancias de nuestro prototipo LearningPath

function isObject(subject) {
    return typeof subject == "object";
}

function isArray(subject) {
    return Array.isArray(subject);
}

function requiredParam(param) {
    throw new Error(param + " es obligatorio");
}

function LearningPath({ // PROTOTIPO
    name = requiredParam("name"), // Campo es obligatorio
    courses = [], // Lista de Cursos que pertencen a la ruta de aprendizaje
}) {
    this.name = name;
    this.courses = courses;
}

function Student({ // PROTOTIPO
    name = requiredParam("name"),
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.approvedCourses = approvedCourses;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    };
    // Preguntamos primero si el parámetro recibido "learningPaths" sí es un Array:
    if (isArray(learningPaths)) {
        // Momentaneamente hacemos esta asignación hasta realizar el resto de validaciones:
        this.learningPaths = [];
        // Vamos a recorrer cada índice del Array "learningPaths"
        for (learningPathIndex in learningPaths) { // 👈👈
            // Preguntaremos si el elemento ubicado en el índice actual es una
            // instancia del prototipo LearningPath. Solo así sabremos si es una
            // verdadera ruta de aprendizaje:
            if (learningPaths[learningPathIndex] instanceof LearningPath) {
                // Si es que SÍ es una instancia de dicho prototipo, entonces agregamos
                // dicha ruta de aprendizaje al array "learningPaths" del estudiante:
                this.learningPaths.push(learningPaths[learningPathIndex]);
            }
        }
    }
}

// Creamos nuevas rutas de aprendizaje que son instancias de "LearningPath"
const escuelaWeb = new LearningPath({
    name: "Escuela de WebDev"
});
const escuelaData = new LearningPath({
    name: "Escuela de Data Science"
});

// Generamos un nuevo estudiante asignandole las rutas creadas hace un momento, pero
// además agregamos un objeto con el nombre de una escuela al azar la cual a pesar de
// que tenga los mismos atributos, NO es instancia del prototipo LearningPath
const maria = new Student({
    email: "maria@gmail.pe",
    name: "Maria",
    learningPaths: [
        escuelaWeb,
        escuelaData,
        {
            name: "Escuela Impostora"
        }
    ]
});

// Si observamos en consola las rutas que tiene el estudiante creado, no nos aparecerá
// aquella "Escuela Impostora" que intentamos agregar, esto debido a que no pasó las
// Validaciones que establecimos:
console.log(maria.learningPaths);

/* > Mensaje en consola: 👀
[
    LearningPath {
        name: 'Escuela de WebDev',
        courses: []
    },
    LearningPath {
        name: 'Escuela de Data Science',
        courses: []
    }
]
*/