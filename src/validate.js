//Import dependencies
var fs = require('fs');

//Import utils
var ValidateFormat = require('./utils/validate-format.js');

//Function for validate and parse the fasta content
function ValAndParse(str, format)
{
  //Parse the format
  format = ValidateFormat(format);

  //Remove the \r from the string
  str = str.replace(/\r/g, '');

  //Split by line breaks
  str = str.split('\n');

  //Output content
  var content = [];

  //Counter for the line breaks
  var i = 0;

  //Read all the line breaks
  while(i < str.length)
  {
    //Check for null string at the end of the file
    if((str[i] === '' || str[i] === ' ') && i == str.length - 1){ i = i + 1; continue; }

    //Check for null string
    if(str[i] === '' || str[i] === ' '){ return {status: false, arr: null}; }

    //Check for '>'
    if(str[i][0] !== '>'){ return {status: false, arr: null}; }

    //Create the new object
    var obj = {};

    //Add the header
    obj.header = str[i].replace('>', '');

    //Initialize the sequence
    obj.sequence = '';

    //Initialize the quality
    obj.quality = '';

    //Create a new counter for add the sequence
    var j = i + 1;

    //Read all the sequence
    while(j < str.length)
    {
      //Check for '>' or for '+'
      if(str[j][0] === '>' || (format === 'fastq' && str[j][0] === '+')){ break; }

      //Save the sequence
      obj.sequence = obj.sequence + str[j];

      //Increment the j
      j = j + 1;
    }

    //Check for null sequence
    if(obj.sequence === ''){ return {status: false, arr: null}; }

    //Check for add the quality
    if(format === 'fastq')
    {
      //Check for '+'
      if(str[j][0] !== '+'){ return {status: false, arr: null}; }

      //Increment the j
      j = j + 1;

      //Read all
      while(j < str.length)
      {
        //Check for '>'
        if(str[j][0] === '>'){ break; }

        //Add the quality
        obj.quality = obj.quality + str[j];

        //Increment the counter
        j = j + 1;
      }

      //Check for null quality
      if(obj.quality === ''){ return {status: false, arr: null}; }
    }

    //Increment the i
    i = j;

    //Add the new sequence
    content.push(obj);
  }

  //Return the result
  return {status: true, arr: content};
}

//Function for validate a fasta/fastq file
function Val(file, format, callback)
{
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

    //Validate the file content
    var v = ValAndParse(data, format);

    //Do the callback with the result
    callback(v.status);

  });
}

//Function for validate a fasta/fastq file sync
function ValSync(file, format)
{
  //Get the file content
  var data = fs.readFileSync(file, 'utf8');

  //Validate the file content
  var v = ValAndParse(data, format);

  //Return the status
  return v.status;
}

//Exports to node
module.exports = {Val: Val, ValSync: ValSync, ValParse: ValAndParse};
