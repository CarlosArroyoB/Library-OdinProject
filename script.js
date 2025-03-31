const myLibrary = []

class Book {
    constructor(titulo, autor, paginas, leido){
    this.id = crypto.randomUUID();
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.leido = leido;
    }
    toggleRead() {
        this.leido = !this.leido;
    }
}
function addBookToLibrary(titulo,autor,paginas,leido){
    const newBook = new Book(titulo,autor,paginas,leido);
    myLibrary.push(newBook);
    renderBooks();
}

function renderBooks (){
    const container = document.getElementById('libreria')
    container.innerHTML = '';

    myLibrary.forEach(libro =>{
        const card = document.createElement("div");
        card.classList.add('card'); 
        card.setAttribute('data-id', libro.id);

        card.innerHTML = `
        <h2>${libro.titulo}</h2>
        <p><strong>Autor: </strong> ${libro.autor}</p>
        <p><strong>Paginas: </strong> ${libro.paginas}</p>
        <p> <strong>Estado: </strong> ${libro.leido ? 'Leído' : 'No leído'}</p>
        <button class="leidoBtn">Cambiar estado</button>
        <button class="eliminarBtn">Eliminar</button> 
        `;
        container.appendChild(card);

        card.querySelector('.leidoBtn').addEventListener('click', () => {
            libro.toggleRead();
            renderBooks();
        });

        card.querySelector('.eliminarBtn').addEventListener('click', () => {
            deleteBook(libro.id);
            renderBooks();  
        });
    })
    
}

function deleteBook(id){
    const index = myLibrary.findIndex(libro => libro.id === id);
    myLibrary.splice(index, 1);
}

//modal de formulario
const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const nuevoLibroBtn = document.getElementById("nuevoLibro");
const formulario = document.getElementById("formulario");


nuevoLibroBtn.addEventListener("click", () => {
    modal.showModal(); // Abre el modal
    
});

cerrarModal.addEventListener("click", () => {
    modal.close(); // Cierra el modal
});

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const paginas = document.getElementById("paginas").value;
    const leido = document.getElementById("leido").checked;

    addBookToLibrary(titulo,autor,paginas,leido);

    this.reset();
    modal.close();
})

addBookToLibrary("El señor de los anillos", "J.R.R. Tolkien", 1178, true);
addBookToLibrary("1984", "George Orwell", 328, false);