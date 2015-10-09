var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  art: String,
  wort: String
});

module.exports.getModel = mongoose.model('art', PostSchema);