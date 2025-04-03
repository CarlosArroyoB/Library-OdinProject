class User  {
    constructor(name, apellido){
        this.name = name;
        this.apellido = apellido
    }
    sayHi(){
        alert(`${this.name} ${this.apellido}`)
    }
}

const usuario1 = new User ("Carlos", "Arroyo");
usuario1.sayHi();