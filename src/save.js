//Import dependencies
var fs = require('fs');

//Import utils
var ValidateFormat = require('./utils/validate-format.js');
var ValidateFObj = require('./utils/validate-fobj.js');

//Function for save a fasta object to a file
function Save(file, fobj, callback)
{
  //Check the file
  if(typeof file !== 'string') { throw new Error('No output filename provided'); }

  //Generate a string from the fasta object
  var s = FObjToString(fobj);

  //Check if s is a tring
  if(typeof s === 'string')
  {
    //Write the file
    fs.writeFile(file, s, function(err){ callback(true); });
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
  //Check the file
  if(typeof file !== 'string') { throw new Error('No output filename provided'); }
  
  //Generate a string from the fasta object
  var s = FObjToString(fobj);

  //Check if s is a tring
  if(typeof s === 'string')
  {
    //Save to a file
    fs.writeFileSync(file, s);
  }
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
      out = out + f.content[i].sequence + '\n';

      //Check for save the quality
      if(f.format === 'fastq')
      {
        //Add a '+'
        out = out + '+\n';

        //Add the quality
        out = out + ParseQual(f.content[i]) + '\n';
      }
    }

    //Return the output string
    return out;
  }
}

//Function for parse the quality
function ParseQual(obj)
{
  //Check for undefined
  if(typeof obj.quality !== 'undefined'){ return obj.sequence; }

  //Check for empty quality
  if(obj.quality === ''){ return obj.sequence; }

  //Check the length
  if(obj.quality.length != obj.length){ return obj.sequence; }

  //Return the quality
  return obj.quality;
}

//Exports to node
module.exports = { Save: Save, SaveSync: SaveSync };
