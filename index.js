//Convert a fasta object to a fastq
module.exports.toFastQ = require('./lib/convert.js').toFastQ;

//Convert a fastq object to a fasta
module.exports.toFasta = require('./lib/convert.js').toFasta;

//Read a fasta/fastq file
module.exports.read = require('./lib/read.js');

//Write a fasta/fastq file
module.exports.write = require('./lib/write.js');
