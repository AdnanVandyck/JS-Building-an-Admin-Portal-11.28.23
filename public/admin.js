document.addEventListener('DOMContentLoaded', getBookList);

function getBookList() {

    fetch('http://localhost:3001/listBooks')
        .then(response => response.json())
        .then(data => displayBookList(data))
        .catch(error => console.error('Error:', error));
}

function displayBookList(books) {
    const bookListElement = document.getElementById('bookList');
    const form = document.getElementById('bookForm');


    bookListElement.innerHTML = '';


    books.forEach(book => {
        const listItem = document.createElement('li');
        const inputField = document.createElement('input');
        const updateButton = document.createElement('button');

        listItem.textContent = `${book.title}`;
        inputField.type = 'number';
        inputField.value = book.quantity;
        inputField.name = `book_${book.id}`;

        updateButton.type = 'button';
        updateButton.textContent = 'Save';
        updateButton.addEventListener('click', () => updateQuantity(book.id, inputField.value));

        listItem.appendChild(inputField);
        listItem.appendChild(updateButton);
        bookListElement.appendChild(listItem);
    });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            updateQuantities();
        });
}

function updateQuantity(bookId, newQuantity) {

    console.log(`Updating quantity for Book ${bookId} to ${newQuantity}`);
}


function updateQuantities() {
    const form = document.getElementById('bookForm');

    const updatedQuantities = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        updatedQuantities[key] = value;
    });

    fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuantities),
    })
    .then(response => response.json())
    .then(data => {
        displayBookList(data.books);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
