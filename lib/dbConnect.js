const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/my_db_name')
  .catch(console.error);

module.exports = mongoose;
