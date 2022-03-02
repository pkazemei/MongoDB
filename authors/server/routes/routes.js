//import controller
const AuthorController=require('../controllers/controller')

module.exports = app =>{
    app.get('/api/authors', AuthorController.getAllAuthors)
    app.post('/api/authors', AuthorController.createAuthor)
    app.get('/api/authors/:id', AuthorController.getOneAuthor)
    app.put('/api/authors/update/:id', AuthorController.updateAuthor)
    app.delete('/api/authors/delete/:id', AuthorController.deleteAuthor)
}