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
        return newBook;
    }

    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    getBooks() {
        return [...this.books];
    }

    toggleBookRead(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.toggleRead();
        }
    }
}

class LibraryView {
    constructor(library) {
        this.library = library;
        this.container = document.getElementById('libreria');
    }

    renderBooks() {
        this.container.innerHTML = '';
        this.library.getBooks().forEach(book => {
            const card = this.createBookCard(book);
            this.container.appendChild(card);
        });
    }

    createBookCard(book) {
        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute('data-id', book.id);

        // Create title
        const title = document.createElement('h2');
        title.textContent = book.titulo;

        // Create author paragraph
        const authorP = document.createElement('p');
        const authorStrong = document.createElement('strong');
        authorStrong.textContent = 'Autor: ';
        authorP.appendChild(authorStrong);
        authorP.appendChild(document.createTextNode(book.autor));

        // Create pages paragraph
        const pagesP = document.createElement('p');
        const pagesStrong = document.createElement('strong');
        pagesStrong.textContent = 'Páginas: ';
        pagesP.appendChild(pagesStrong);
        pagesP.appendChild(document.createTextNode(book.paginas));

        // Create status paragraph
        const statusP = document.createElement('p');
        const statusStrong = document.createElement('strong');
        statusStrong.textContent = 'Estado: ';
        statusP.appendChild(statusStrong);
        statusP.appendChild(document.createTextNode(book.leido ? 'Leído' : 'No leído'));

        // Create buttons
        const readBtn = document.createElement('button');
        readBtn.textContent = 'Cambiar estado';
        readBtn.classList.add('leidoBtn');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('eliminarBtn');

        // Append all elements
        card.append(
            title,
            authorP,
            pagesP,
            statusP,
            readBtn,
            deleteBtn
        );

        this.setupCardEventListeners(card, book.id);
        return card;
    }

    setupCardEventListeners(card, bookId) {
        card.querySelector('.leidoBtn').addEventListener('click', () => {
            this.library.toggleBookRead(bookId);
            this.renderBooks(); 
        });

        card.querySelector('.eliminarBtn').addEventListener('click', () => {
            this.library.deleteBook(bookId);
            this.renderBooks();
        });
    }
}

class ModalController {
    constructor(library, libraryView) {
        this.library = library;
        this.libraryView = libraryView;
        this.modal = document.getElementById("modal");
        this.cerrarModal = document.getElementById("cerrarModal");
        this.nuevoLibroBtn = document.getElementById("nuevoLibro");
        this.formulario = document.getElementById("formulario");

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.nuevoLibroBtn.addEventListener("click", () => this.modal.showModal());
        this.cerrarModal.addEventListener("click", () => this.modal.close());
        this.formulario.addEventListener("submit", (event) => this.handleSubmit(event));
    }

    handleSubmit(event) {
        event.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const paginas = document.getElementById("paginas").value;
        const leido = document.getElementById("leido").checked;

        this.library.addBook(titulo, autor, paginas, leido);
        this.libraryView.renderBooks(); // Actualiza la vista directamente
        this.formulario.reset();
        this.modal.close();
    }
}


const library = new Library();
const libraryView = new LibraryView(library);
const modalController = new ModalController(library, libraryView);

libraryView.renderBooks();

library.addBook("El señor de los anillos", "J.R.R. Tolkien", 1178, true);
library.addBook("1984", "George Orwell", 328, false);
libraryView.renderBooks();