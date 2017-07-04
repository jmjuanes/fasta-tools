//Import fasta tools
var fasta_tools = require('../index.js');

//Read a fastq file
fasta_tools.read('./incorrect.fastq', function(error, obj_fastq)
{
  //Check the error
  if(error){ throw error; }

  //display in console the fastq object
  console.log('FASTQ OBJECT:');
  console.log(obj_fastq);

  //Convert to fasta
  var obj_fasta = fasta_tools.toFasta(obj_fastq);

  //Display in console the fasta object
  console.log('FASTA OBJECT:');
  console.log(obj_fasta);

  //Write the fasta file
  fasta_tools.write('./saved-fasta.txt', obj_fasta, function(error)
  {
    //Check the error
    if(error){ throw error; }

    //Display done in console
    console.log('Done!');
  });
});