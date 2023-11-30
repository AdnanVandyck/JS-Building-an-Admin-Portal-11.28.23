document.addEventListener('DOMContentLoaded', getBookList);

function getBookList() {
    // Change the URL to the actual endpoint of your server
    fetch('http://localhost:3001/listBooks')
        .then(response => response.json())
        .then(data => displayBookList(data))
        .catch(error => console.error('Error:', error));
}

function displayBookList(books) {
    const bookListElement = document.getElementById('bookList');
    const form = document.getElementById('bookForm');

    // Clear existing content
    bookListElement.innerHTML = '';

    // Display each book in the list with an input field for quantity
    books.forEach(book => {
        const listItem = document.createElement('li');
        const inputField = document.createElement('input');
        const updateButton = document.createElement('button');

        listItem.textContent = `${book.title} - Quantity: `;
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

        // Prevent the form from submitting and handle the update in JavaScript
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            updateQuantities();
        });
}

function updateQuantity(bookID, newQuantity) {
    // Implement the logic to update a single book's quantity
    console.log(`Updating quantity for Book ${book.id} to ${newQuantity}`);
}
function updateQuantities() {
    // Implement the logic to update quantities for all books
    console.log('Updating quantities for all books');
}