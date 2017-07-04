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

    //Function to write a read to the file
    var write_read = function(index)
    {
      //check the index
      if(index >= content.reads.length)
      {
        //Do the callback
        return cb(null);
      }

      //Get the read object to write
      var read_obj = content.reads[index];

      //Initialize the read content
      var read_content = '';

      //Check the format
      if(content.format === 'fasta')
      {
        //Build the read content for FASTA file
        read_content = '>' + read_obj.header + endl + read_obj.sequence + endl;
      }
      else
      {
        //Build the read content for FASTQ file
        read_content = '@' + read_obj.header + endl + read_obj.sequence + '+' + endl + read_obj.quality + endl;
      }

      //Append to the file
      fs.appendFile(file, read_content, 'utf8', function(error)
      {
        //Check the error
        if(error){ return cb(error); }

        //Next read
        return write_read(index + 1);
      });
    };

    //Write the first read to the file
    return write_read(0);
  });
};