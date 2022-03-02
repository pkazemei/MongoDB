//import controller
const NinjaController=require('../controllers/controller')

module.exports = app =>{
    app.get('/api/hello', NinjaController.sayHello)
    app.get('/api/ninjas', NinjaController.findAllNinjas)
    app.post('/api/ninjas', NinjaController.createNewNinja)
    app.get('/api/ninjas/random', NinjaController.findRandomNinja)
    app.get('/api/ninjas/:id', NinjaController.findOneNinja)
    app.put('/api/ninjas/:id', NinjaController.updateNinja)
    app.delete('/api/ninjas/:id', NinjaController.deleteNinja)
}