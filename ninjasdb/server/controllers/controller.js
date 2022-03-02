const Ninja = require('../models/model');

module.exports.sayHello=(req, res)=>{
    res.json({msg: 'hello mongoose modularized'})
}

module.exports.findAllNinjas = (req, res) => {
    console.log('trying to find all ninjas')
    Ninja.find()
        .then(allNinjas =>{
            res.json({results: allNinjas})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findOneNinja = (req, res) => {
    console.log('trying to find a ninja')
    Ninja.findOne({_id: req.params.id})
        .then(singleNinja =>{
            res.json({results: singleNinja})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNewNinja = (req, res) => {
    console.log('trying to create a ninja')
        Ninja.create(req.body)
        .then(newlyCreatedNinja =>{
            res.json({results:newlyCreatedNinja})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateNinja = (req, res) => {
    console.log('trying to update a ninja')
    Ninja.findOneAndUpdate(
        { _id: req.params.id },req.body, { new: true, runValidators: true })
        .then(updatedNinja => res.json({ results: updatedNinja }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteNinja = (req, res)=>{
    console.log('trying to delete a ninja')
    Ninja.deleteOne({ _id: req.params.id })
        .then(deletedNinja=>{
            res.json({ results: deletedNinja })
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findRandomNinja = (req, res)=>{
    console.log('trying to find a random ninja')

    function getRandomInt(max){
        return Math.floor(Math.random()*max);
    }

    Ninja.find()
        .then(allNinjas =>{
            let randomIndex=getRandomInt(allNinjas.length)
            res.json({ results: allNinjas[randomIndex] })
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}