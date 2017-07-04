//Import fasta tools
var fasta_tools = require('../index.js');

//Read a fasta file
fasta_tools.read('./correct.fasta', function(error, obj_fasta)
{
  //Check the error
  if(error){ throw error; }

  //display in console the fasta object
  console.log('FASTA OBJECT:');
  console.log(obj_fasta);

  //Convert to fastq
  var obj_fastq = fasta_tools.toFastQ(obj_fasta);

  //Display in console the fastq object
  console.log('FASTQ OBJECT:');
  console.log(obj_fastq);

  //Write the fastq file
  fasta_tools.write('./saved-fastq.txt', obj_fastq, function(error)
  {
    //Check the error
    if(error){ throw error; }

    //Display done in console
    console.log('Done!');
  });
});