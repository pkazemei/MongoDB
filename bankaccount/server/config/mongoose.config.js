const mongoose = require('mongoose');

const db_name = "BankUsers";

mongoose.connect(`mongodb+srv://root:root@ninjas.f0zyq.mongodb.net/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));