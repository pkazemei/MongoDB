const Author = require('../models/model');

module.exports.getAllAuthors = (req, res) => {
    console.log('trying to find all authors')
    Author.find()
        .then(allAuthors =>{
            res.json({results: allAuthors})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.getOneAuthor = (req, res) => {
    console.log('trying to find an author')
    Author.findOne({_id: req.params.id})
        .then(singleAuthor =>{
            res.json({results: singleAuthor})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createAuthor = (req, res) => {
    console.log('trying to create an author')
        Author.create(req.body)
        .then(newlyCreatedAuthor =>{
            res.json({results:newlyCreatedAuthor})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateAuthor = (req, res) => {
    console.log('trying to update an author')
    Author.findOneAndUpdate(
        { _id: req.params.id },req.body, { new: true, runValidators: true })
        .then(updatedAuthor => res.json({ results: updatedAuthor }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteAuthor = (req, res)=>{
    console.log('trying to delete an author')
    Author.deleteOne({ _id: req.params.id })
        .then(deletedAuthor=>{
            res.json({ results: deletedAuthor })
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}