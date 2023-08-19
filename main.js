class Book{
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = 0,
    isRead = false
  ){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  changeStatus(){
    if(this.isRead) this.isRead = false;
    else this.isRead = true;
    updateLibrary();
  }
}

class Library{
  constructor(books = []){
    this.books = books;
  }

  addBook(book) {
    if(!this.books.includes(book)){
      this.books.push(book);
    }
    updateLibrary();
  }

  removeBook(title){
    this.books = this.books.filter((book) => book.title != title);
    updateLibrary(); 
  }

  getBook(title){
    for(book of this.books) {
      if(book.title == title) return book;
    }
  }
}


const library = new Library();
const book1 = new Book("a", "b", 22, true);
const book2 = new Book("a", "b", 22, true);

const booksDiv = document.querySelector(".books");
const form = document.querySelector(".form");
const modal = document.querySelector("#modal");
const openModal = document.querySelector("#add-btn");
const closeModal = document.querySelector("#close-btn");

let rawBookData = null;

openModal.addEventListener("click", () => modal.showModal());
closeModal.addEventListener("click", () => modal.close());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  rawBookData = new FormData(form);
  createBook();
  form.reset();
  modal.close();
});

function createBook(){
  let title;
  let author;
  let pages;
  let isRead = false;

  for(item of rawBookData){
    switch(item[0]){
      case 'title':
        title = item[1];
        break;
      case 'author':
        author = item[1];
        break;
      case 'pages':
        pages = item[1];
        break;
      case 'is-read':
        if(item[1] == "on")
          isRead = true;
        break;
    }
  }

  if(library.getBook(title)) {
    alert("Book already exists in library");
    return;
  }

  let book = new Book(title, author, pages, isRead);
  library.addBook(book);
}



function updateLibrary(){
  booksDiv.innerHTML = ''; // Remove all books
  // Rebuild all books
  for(book of library.books){
    // Create the divs
    let bookDiv = document.createElement("div");  
    bookDiv.className = "book";

    booksDiv.appendChild(bookDiv);

    let textDiv = document.createElement("div");
    textDiv.className = "text";
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    // BookDiv
    bookDiv.appendChild(textDiv);
    bookDiv.appendChild(buttonsDiv);

    // TextDiv
    let title = document.createElement("h4");
    let author = document.createElement("h4");
    let pages = document.createElement("h4");
    title.id = "title";
    title.textContent = `Title: ${book.title}`;
    author.id = "author";
    author.textContent = `Author: ${book.author}`;
    pages.id = "pages";
    pages.textContent = `Pages: ${book.pages}`;
    textDiv.appendChild(title);
    textDiv.appendChild(author);
    textDiv.appendChild(pages);

    // ButtonsDiv 
    let statusButton = document.createElement("button");
    let removeButton = document.createElement("button");

    statusButton.id = "status-btn";
    if(book.isRead){
      statusButton.textContent = "Read";
      statusButton.className = "read";
    } else {
      statusButton.textContent = "Not Read";
      statusButton.className = "not-read";
    }

    statusButton.addEventListener("click", () => {
      library.getBook(book.title).changeStatus();
    });

    removeButton.id = "remove-btn";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => library.removeBook(book.title));

    buttonsDiv.appendChild(statusButton);
    buttonsDiv.appendChild(removeButton);

  }
}
