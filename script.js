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
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update());
    }

    addBook(titulo, autor, paginas, leido) {
        const newBook = new Book(titulo, autor, paginas, leido);
        this.books.push(newBook);
        this.notifyObservers();
        return newBook;
    }

    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.notifyObservers();
    }

    getBooks() {
        return [...this.books];
    }

    toggleBookRead(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.toggleRead();
            this.notifyObservers();
        }
    }
}

class LibraryView {
    constructor(library) {
        this.library = library;
        this.container = document.getElementById('libreria');
    }

    update() {
        this.renderBooks();
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

        card.innerHTML = `
            <h2>${book.titulo}</h2>
            <p><strong>Autor: </strong> ${book.autor}</p>
            <p><strong>Páginas: </strong> ${book.paginas}</p>
            <p><strong>Estado: </strong> ${book.leido ? 'Leído' : 'No leído'}</p>
            <button class="leidoBtn">Cambiar estado</button>
            <button class="eliminarBtn">Eliminar</button>
        `;

        this.setupCardEventListeners(card, book.id);
        return card;
    }

    setupCardEventListeners(card, bookId) {
        card.querySelector('.leidoBtn').addEventListener('click', () => {
            this.library.toggleBookRead(bookId);
        });

        card.querySelector('.eliminarBtn').addEventListener('click', () => {
            this.library.deleteBook(bookId);
        });
    }
}

class ModalController {
    constructor(library) {
        this.library = library;
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
        this.formulario.reset();
        this.modal.close();
    }
}

// Inicialización
const library = new Library();
const libraryView = new LibraryView(library);
const modalController = new ModalController(library);

// Conectar la vista con la biblioteca
library.addObserver(libraryView);

// Agregar libros de ejemplo
library.addBook("El señor de los anillos", "J.R.R. Tolkien", 1178, true);
library.addBook("1984", "George Orwell", 328, false);