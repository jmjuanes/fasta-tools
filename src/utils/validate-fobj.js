//Function for validate a fasta object
function ValidateFObj(f)
{
  //Check the object format
  if(typeof f.format === 'undefined'){ return false; }

  //Check the object format value
  if(f.format !== 'fasta' && f.format !== 'fastq'){ return false; }

  //Check the content
  if(typeof f.content === 'undefined'){ return false; }

  //Check if is array
  if(Array.isArray(f.content) === false){ return false; }

  //Check the array length
  if(f.content.length < 1){ return false; }

  //Check the array content
  for(var i = 0; i < f.content.length; i++)
  {
    //Check the header
    if(typeof f.content[i].header === 'undefined'){ return false; }

    //Check the sequence
    if(typeof f.content[i].sequence === 'undefined'){ return false; }

    //Check the quality
    if(f.format === 'fastq')
    {
      //Check if quality is defined
      if(typeof f.content[i].quality === 'undefined'){ return false; }
    }
  }

  //Return true
  return true;
}

//Exports to node
module.exports = ValidateFObj;
