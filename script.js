const libreria = []

function Book (titulo, autor, pages) {
    if(!new.target){
        throw Error('Este objeto debe estar instanciado')
    }
    this.id = crypto.randomUUID();
    this.titulo = titulo;
    this.autor = autor;
    this.pages = pages;
}

function addBookToLibrary (titulo,autor,pages) {
    const nuevoLibro = new Book(titulo,autor,pages);
    libreria.push(nuevoLibro);   
}


console.log(libreria);