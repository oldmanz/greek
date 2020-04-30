 // app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var godSchema = mongoose.Schema({

    info            : {
        name        : String,
        generation  : String,
        domain     : String,
        description         : String,
        symbols   :  Array
    },
    stats            :  {
        ability   : String,
        power     : Number
    }

});



// create the model for users and expose it to our app
module.exports = mongoose.model('God', godSchema);

