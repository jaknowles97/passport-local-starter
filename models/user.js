const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

//-------------- Schema Model --------------------------
const UserSchema = new Schema({
    local: {
        email: String,
        password: String,
    }
})

//-------------- Methods ---------------------------------
// encrypts password
UserSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcyrpt.genSaltSync(8), null)
}

module.exports = User = mongoose.model('user', UserSchema)

module.exports.createUser = function(newUser, cb) {
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(newUser.password, salt, null, function(err, hash) {
            if(err) throw err;
            newUser.local.password = hash;
            newUser.save()
              .then(user => {
                console.log(user);
              })
              .catch(err => console.log(err));
        })
    })
}