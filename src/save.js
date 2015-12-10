//Import dependencies
var fs = require('fs');

//Import utils
var ValidateFormat = require('./utils/validate-format.js');
var ValidateFObj = require('./utils/validate-fobj.js');

//Nucleotides per line
var nucLine = 50;

//Function for save a fasta object to a file
function Save(file, fobj, callback)
{
  //Generate a string from the fasta object
  var s = FObjToString(fobj);

  //Check if s is a tring
  if(typeof s === 'string')
  {
    //Write the file
    fs.writeFile(file, s, function(err){

      //Do the callback
      callback(true);

    });
  }
  else
  {
    //Do the callback with false
    callback(false);
  }
}

//Function for save a fasta object to a file sync
function SaveSync(file, fobj)
{
  //Generate a string from the fasta object
  var s = FObjToString(fobj);

  //Check if s is a tring
  if(typeof s === 'string')
  {
    //Save to a file
    fs.writeFileSync(file, s);
  }
}

//Function for save the sequence or the quality
function SaveSeq(data)
{
  //Output object
  var o = '';

  //Counter
  var cont = 0;

  //Read all the data
  for(var j = 0; j < data.length; j++)
  {
    //Save the letter
    o = o + data[j];

    //Increment the counter
    cont = cont + 1;

    //Check for add a line break
    if(cont == nucLine)
    {
      //Set cont to 0;
      cont = 0;

      //Add a line break
      o = o + '\n';
    }
  }

  //Check for add a line break
  if(cont > 0){ o = o + '\n'; }

  //Return
  return o;
}

//Function for generate a string from the fasta object
function FObjToString(f)
{
  //Output string
  var out = '';

  //Check the fasta object
  if(ValidateFObj(f) === false)
  {
    //Show error
    console.error('Fasta Object has not the correct syntax.');

    //Exit
    return null;
  }
  else
  {
    //Read the content
    for(var i = 0; i < f.content.length; i++)
    {
      //Save the header
      out = out + '>' + f.content[i].header + '\n';

      //Save the sequence
      out = out + SaveSeq(f.content[i].sequence);

      //Check for save the quality
      if(f.format === 'fastq')
      {
        //Add a '+'
        out = out + '+\n';

        //Add the quality
        out = out + SaveSeq(f.content[i].quality);
      }
    }

    //Return the output string
    return out;
  }
}

//Exports to node
module.exports = {Save: Save, SaveSync: SaveSync};
