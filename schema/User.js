const db = require('../lib/dbConnect');
const crypto = require('crypto');
const config = require('../config');

const schemaUser = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  }
});


schemaUser.virtual('password')
  .set(function(password) {

    if(password !== undefined){
      if(password.length < 4){
        this.invalidate('password', 'Պառոլը պետք է լինի մինիմում 4 սիմվոլ');
      }
    }

    this._plainPassword = password;

    if(password){
      this.salt = crypto.randomBytes(config.auth.hashInterval).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.auth.iterations,
        config.auth.hashInterval,
        'sha512'
      ).toString('base64');
    }else{
      this.salt = undefined;
      this.passwordHash = undefined;
    }

  }).get(function() {
    return this._plainPassword;
  });


schemaUser.methods.checkPassword = function(password) {
  if(!password) return false;
  if(!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    config.auth.iterations,
    config.auth.hashInterval,
    'sha512'
  ).toString('base64') == this.passwordHash;
}


module.exports = db.model('Users', schemaUser);
