let books = [];

function Book(name, author, pageNum, isRead){
  this.name = name;
  this.author = author;
  this.pageNum = pageNum;
  this.isRead = isRead;
}

const booksDiv = document.querySelector('.books');

const form = document.querySelector('.form');
const modal = document.querySelector('#modal');
const openModal = document.querySelector('#add-btn');
const closeModal = document.querySelector('#close-btn');

var rawBookData = null;


openModal.addEventListener('click', () => {
  modal.showModal();
});

closeModal.addEventListener('click', () => {
  modal.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  rawBookData = new FormData(form);
  for(item of rawBookData)
    console.log(item);
  createBook();
  modal.close();
});

// Gets data from form and builds a book object
function createBook(){
  var name;
  var author;
  var pageNum;
  var isRead = false;
  var book;
  for(item of rawBookData){
    switch(item[0]){
      case "book-name": 
        name = item[1];
        break;
      case "author":
        author = item[1];
        break;
      case "pages":
        pageNum = item[1];
        break;
      case "is-read":
        if(item[1] == 'on') 
          isRead = true;
        break;
    }
  }

  book = new Book(name, author, pageNum, isRead);
  console.log(book);
  books.push(book);


  updateLibrary();
}

function updateLibrary(){
  for(book of books){
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    let text = document.createElement("div");
    text.className = "text";
    bookDiv.appendChild(text);
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";
    bookDiv.appendChild(buttonsDiv);

    let bookName = document.createElement("h4");
    bookName.id = "book-name";
    bookName.textContent = "Book Name: " + book.name;
    text.appendChild(bookName);
    let author = document.createElement("h4");
    author.textContent = "Author: " + book.author;
    text.appendChild(author);
    author.id = "author";
    let pages = document.createElement("h4");
    pages.id = "pages";
    pages.textContent = "Pages: " + book.pageNum;
    text.appendChild(pages);
    
    let statusButton = document.createElement("button");
    statusButton.id = "status-btn";
    // call changeStatus function;
    switch(book.isRead){
      case true:
        statusButton.textContent = "Read";
        statusButton.style.backgroundColor = "var(--footer-color)";
        statusButton.style.color = "white";
        break;
      case false:
        statusButton.textContent = "Not Read";
        statusButton.style.backgroundColor = "lightcoral";
        break;
    }
    buttonsDiv.appendChild(statusButton);
    let removeButton = document.createElement("button");
    removeButton.id = "remove-btn";
    removeButton.textContent = "Remove";
    buttonsDiv.appendChild(removeButton);

    booksDiv.appendChild(bookDiv);
    console.log(bookDiv);
  }
}

// function removeBook()