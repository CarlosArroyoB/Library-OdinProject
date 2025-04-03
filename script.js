class Book {
    constructor(titulo, autor, paginas, leido) {
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

class Library {
    constructor() {
        this.books = [];
    }

    addBook(titulo, autor, paginas, leido) {
        const newBook = new Book(titulo, autor, paginas, leido);
        this.books.push(newBook);
        this.renderBooks();
    }

    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.renderBooks();
    }

    renderBooks() {
        const container = document.getElementById('libreria');
        container.innerHTML = '';

        this.books.forEach(book => {
            const card = document.createElement("div");
            card.classList.add('card');
            card.setAttribute('data-id', book.id);

            card.innerHTML = `
                <h2>${book.titulo}</h2>
                <p><strong>Autor: </strong> ${book.autor}</p>
                <p><strong>Páginas: </strong> ${book.paginas}</p>
                <p> <strong>Estado: </strong> ${book.leido ? 'Leído' : 'No leído'}</p>
                <button class="leidoBtn">Cambiar estado</button>
                <button class="eliminarBtn">Eliminar</button>
            `;

            container.appendChild(card);

            card.querySelector('.leidoBtn').addEventListener('click', () => {
                book.toggleRead();
                this.renderBooks();
            });

            card.querySelector('.eliminarBtn').addEventListener('click', () => {
                this.deleteBook(book.id);
            });
        });
    }
}

// Inicialización
const library = new Library();

// Modal de formulario
const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const nuevoLibroBtn = document.getElementById("nuevoLibro");
const formulario = document.getElementById("formulario");

nuevoLibroBtn.addEventListener("click", () => modal.showModal());
cerrarModal.addEventListener("click", () => modal.close());

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const paginas = document.getElementById("paginas").value;
    const leido = document.getElementById("leido").checked;

    library.addBook(titulo, autor, paginas, leido);

    this.reset();
    modal.close();
});

// Agregar libros de ejemplo
library.addBook("El señor de los anillos", "J.R.R. Tolkien", 1178, true);
library.addBook("1984", "George Orwell", 328, false);
