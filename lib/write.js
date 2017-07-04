//Import dependencies
var fs = require('fs');

//Write to fasta/fastq file
module.exports = function(file, content, cb)
{
  //Line end
  var endl = '\n';

  //Initialize the file
  fs.writeFile(file, '', 'utf8', function(error)
  {
    //Check the error
    if(error){ return cb(error); }

    //Writable stream
    var writer = fs.createWriteStream(file, 'utf8');

    //Writer error
    writer.on('error', function(error)
    {
      //Do the callback with the error
      return cb(error);
    });

    //Writer finish event
    writer.on('finish', function()
    {
      //Do the callback without error
      return cb(null);
    });

    //Iterate over all the reads
    content.reads.forEach(function(read)
    {
      //Check the format
      if(content.format === 'fasta')
      {
        //Write as a fasta file
        writer.write('>' + read.header + endl);
        writer.write(read.sequence + endl);
      }
      else
      {
        //Write as a fastq file
        writer.write('@' + req.header + endl);
        writer.write(read.sequence + endl);
        writer.write('+' + endl);
        writer.write(read.quality + endl);
      }
    });

    //End the write
    writer.end('');
  });
};