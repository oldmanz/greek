// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    account            : {
        email        : String,
        password     : String,
        name         : String,
        created      : Date
    },
    game            :  {
        currentroom : String,
        character   : String,
        alive       : Boolean
    },
    log                 :{
        winsasolympian    : Number,
        winsastitan  : Number,
        totalwins      :Number,
        gods        : Array
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.account.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
