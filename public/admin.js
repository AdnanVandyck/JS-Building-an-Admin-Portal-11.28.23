async function admin() {
let response = await fetch('http://localhost:3001/listBooks')
let books = await response.json()



console.log(books)
}


admin()