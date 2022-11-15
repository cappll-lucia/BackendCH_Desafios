
class Usuario{
    constructor(name, surname, books=[], pets=[]){
        this.name= name;
        this.surname=surname;
        this.books=books;
        this.pets=pets;
    }


    getFullName(){
        return `${this.surname}, ${this.name}`;
    }

    addPet(pet){
        this.pets.push(pet);
    }

    countPets(){
        return this.pets.length;
    }

    addBook(titulo, autor){
        this.books.push({title:titulo, author:autor});
    }

    getBookNames(){
        let booksTitles=[];
        this.books.forEach(book=>booksTitles.push(book.title));
        return booksTitles;
    }
}


let myBooks=[{title:"Mala Luna",autor:"R. Huertas"}];
let myPets=["Perro"];
let usr1 = new Usuario("Lucía", "Cappelini",myBooks, myPets);
//console.log(usr1);

usr1.addBook("Paréntesis", "M. Benedetti");
usr1.addPet(["Conejo"]);
console.log(`Nombre completo: ${usr1.getFullName()}`);
console.log(`Libros del usuario: ${usr1.getBookNames()}`);
console.log(`Cantidad de mascotas: ${usr1.countPets()}`);
