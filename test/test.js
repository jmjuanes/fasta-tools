//Import dependencies
var FastaTools = require('../index.js');

//Correct fasta
console.log('Correct fasta');
console.log(FastaTools.ReadSync('./correct.fasta', 'fasta')); //Sync
FastaTools.Read('./correct.fasta', 'fasta', function(o){ console.log(o); }); //Async

//Incorrect fasta
console.log('Incorrect fasta');
console.log(FastaTools.ReadSync('./incorrect.fasta', 'fasta')); //Sync
FastaTools.Read('./incorrect.fasta', 'fasta', function(o){ console.log(o); }); //Async

//Correct fastq
console.log('Correct fastq');
console.log(FastaTools.ReadSync('./correct.fastq', 'fastq')); //Sync
FastaTools.Read('./correct.fastq', 'fastq', function(o){ console.log(o); }); //Async

//Incorrect fastq
console.log('Incorrect fastq');
console.log(FastaTools.ReadSync('./incorrect.fastq', 'fastq')); //Sync
FastaTools.Read('./incorrect.fastq', 'fastq', function(o){ console.log(o); }); //Async


//Test for save
FastaTools.Read('./correct.fastq', 'fastq', function(data){
  console.log(data);
  FastaTools.Save('./test.fastq', data, function(done){ console.log(done); });
});
