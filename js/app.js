
// Import
let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');
let yearInput = document.getElementById('year');
let addBtn = document.getElementById('add');
let mainList = document.getElementById('list');
let booksArray = [];
let titleError = document.getElementById('titleErr');
let authorError = document.getElementById('authorErr');
let yearError = document.getElementById('yearErr');
let clearBtn = document.getElementById('clear');


//Events
addBtn.addEventListener('click', listHandler);
titleInput.addEventListener('keyup', titleCheck);
authorInput.addEventListener('keyup', authorCheck);
yearInput.addEventListener('keyup', yearCheck);
document.body.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        listHandler();
    }
});
window.addEventListener('load', pageLoadHandler);
clearBtn.addEventListener('click', clearAll);


//Functions
function pageLoadHandler() {
    booksArray = JSON.parse(localStorage.getItem('BookList'));
    console.log(booksArray);
    if (booksArray) {
        listGenerator(booksArray);
    }
    else {
        booksArray = [];
    }
}


function clearAll() {
    mainList.textContent = "";
    localStorage.removeItem('BookList');
    let date = document.getElementById('date');
console.log(date.value)
}


function listGenerator(books) {
    mainList.textContent = "";
    let newlink = document.createElement('a');
    mainList.append(newlink);
    books.forEach(function (book) {
        console.log(book);
        let newtr = document.createElement('tr');
        mainList.append(newtr);
        let newTitle = document.createElement('td');
        newTitle.textContent = book.Title;
        newtr.append(newTitle);
        let newAuthor = document.createElement('td');
        newAuthor.textContent = book.Author;
        newtr.append(newAuthor);
        let newYear = document.createElement('td');
        newYear.textContent = book.Year;
        newtr.append(newYear);
    });
    console.log(mainList);
}


function titleCheck() {
    if (titleInput.value.length < 1) {
        titleError.style.display = 'block';
        return false;
    }
    else {
        titleError.style.display = 'none';
        return true;
    }
}


function authorCheck() {
    if (authorInput.value.length < 3 || !isNaN(+authorInput.value)) {
        authorError.style.display = 'block';
        return false;
    }
    else {
        authorError.style.display = 'none';
        return true;
    }
}


function yearCheck() {
    if (isNaN(+yearInput.value)) {
        yearError.style.display = 'block';
        return false;
    }
    else {
        yearError.style.display = 'none';
        return true;
    }
}


function listHandler(event) {
    if (yearCheck() && authorCheck() && titleCheck()) {
        let newObject = {
            Title: titleInput.value,
            Author: authorInput.value,
            Year: yearInput.value
        };
        booksArray.push(newObject);
        localStorage.setItem('BookList', JSON.stringify(booksArray));
        // console.log(JSON.parse(localStorage.getItem('BookList')));
        listGenerator(booksArray);
    }
    else {
        alert('Please Enter inputs correctly!')
    }
}


function makeEmptyInputs() {
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
}


