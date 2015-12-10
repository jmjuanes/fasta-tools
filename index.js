//Import source functions
var Read = require('./src/read.js');
var Validate = require('./src/validate.js');
var Save = require('./src/save.js');

//Exports to node
module.exports = {
  Read: Read.File,
  ReadSync: Read.FileSync,
  Validate: Validate.Val,
  ValidateSync: Validate.ValSync,
  Save: Save.Save,
  SaveSync: Save.SaveSync
};
