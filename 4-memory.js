/*-----------------Memoria en JS-------------------*/

//En JS al declarar una variable e inicializarla, tanto el nombre como el valor se almacenan en lugares diferentes en memoria, la cual se llama STACK

//Pero con respecto a arrays y objetos, su contenido no se guarda en STACK, sino en otra memoria llamada HEAP y lo que se guarda en STACK es un apuntador(POINTER) al contenido de ese array u objeto

//Entonces al momento de copiar un objeto u array en otro objeto u array, si se modifica su contenido, afectaría al original, ya que lo que se copia es el POINTER

let cat = {
    name : "Nemesis",
    age : 2
}

let cat2 = cat;

cat2.name = "Yiyo";

console.log(cat2); //{ name: 'Yiyo', age: 2 }

console.log(cat); //{ name: 'Yiyo', age: 2 }

//Más graficamente sucede porque:

/*
|---------------------------MEMORIES--------------------------|
|-----------------STACK----------------|---------HEAP---------|
|------Nombres-----|------Valores------|---Objetos u arrays---|
|-----let name-----|-------"Juan"------|                      |
|-----let age------|--------18---------|                      |
|-----let cat------|------POINTER------|--------{...}---------|
|-----let cat2-----          ↑         |                      |
*/

// ### Diferencia entre STACK y HEAP

//STACK: rápida pero con poco espacio
//HEAP: lenta pero con mucho espacio