var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  art: String,
  wort: String
});

module.exports = mongoose.model('arts', PostSchema);