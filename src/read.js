//Import dependencies
var fs = require('fs');

//Import validate methods
var Validate = require('./validate.js');

//Import utils
var ValidateFormat = require('./utils/validate-format.js');

//Function for read a fasta/fastq file
function ReadFile(file, format, callback)
{
  //Check the file
  if(typeof file !== 'string') { throw new Error('No filename provided'); }

  //Check the format
  if(typeof format !== 'string') { throw new Error('You must provide an input format'); }
  
  //Read the file
  fs.readFile(file, 'utf8', function(err, data){

    //Check for error
    if(err)
    {
      //Show error
      console.error('Error reading the fasta/fastq file');

      //Return null object
      return null;
    }

    //Get the fasta object
    var fobj = ReadStrSync(data, format);

    //Do the callback
    callback(fobj);

  });
}

//Function for reat a fasta/fastq file sync
function ReadFileSync(file, format)
{
  //Check the file
  if(typeof file !== 'string') { throw new Error('No filename provided'); }

  //Check the format
  if(typeof format !== 'string') { throw new Error('You must provide an input format'); }

  //Get the file content
  var data = fs.readFileSync(file, 'utf8');

  //Get the fasta object
  var fobj = ReadStrSync(data, format);

  //Return the fasta object
  return fobj;
}

//Function for read a fasta/fastq string
function ReadStr(str, format, callback)
{
  //Get the object with the Sync function
  var fobj = ReadStrSync(str, format);

  //Do the callback with the object
  callback(fobj);
}

//Function for read a fasta/fastq string sync
function ReadStrSync(str, format)
{
  //Create the new fasta object
  var fobj = {};

  //Save the format
  fobj.format = ValidateFormat(format);

  //Set the content as empty
  fobj.content = [];

  //Initialize the length
  fobj.num = 0;

  //Validate the fasta
  var val = Validate.ValParse(str, format);

  //Check
  if(val.status === true)
  {
    //Save the content
    fobj.content = val.arr;

    //Save the length
    fobj.num = fobj.content.length;
  }
  else
  {
    //Do a warning
    console.warn('Fasta/FastQ has incorrect syntax. Check it before continue.');
  }

  //Return the new fasta object
  return fobj;
}

//Exports to node
module.exports = {File: ReadFile, FileSync: ReadFileSync, Str: ReadStr, StrSync: ReadStrSync };
