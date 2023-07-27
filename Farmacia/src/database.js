const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);
mongoose.connect(MONGODB_URI)
    .then(db => console.log('DB conectada'))
    .catch(err => console.log(err));

module.exports = mongoose;