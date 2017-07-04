//Import dependencies
var fs = require('fs');
const readline = require('readline');

//Read a fasta/fastq file
module.exports = function(file, cb)
{
  //Initialize the new object
  var obj = { format: '', reads: [], error: null };

  //Actual read index
  var read_index = -1;

  //Read state
  var read_state = 0;
  // state = 0 -> looking for a new read
  // state = 1 -> looking for a sequence
  // state = 2 -> looking for a "+" character
  // state = 3 -> looking for a quality line

  //Initialize the reader
  var reader = readline.createInterface({ input: fs.createReadStream(file).setEncoding('utf8') });

  //Error event
  reader.on('error', function(error)
  {
    //Do the callback with the error
    return cb(error, {});
  });

  //Line event
  reader.on('line', function(line)
  {
    //Parse the line
    line = line.replace(/\n/g, '').replace(/\r/g, '').trim();

    //Check for empty line
    if(line === '' && read_state === 0){ return; }

    //Check the read index
    if(read_index === -1)
    {
      //Parse the file format
      obj.format = parse_format(line);

      //Check for invalid format
      if(!obj.format)
      {
        //Save the error
        obj.error = new Error('Invalid FASTA/FASTQ file');

        //Close the reader
        return reader.close();
      }
    }

    //Check the state
    if(read_state === 0)
    {
      //Check the format
      if(parse_format(line) !== obj.format)
      {
        //Save the error
        obj.error = new Error('Invalid FASTA/FASTQ file');

        //Close the reader
        return reader.close();
      }

      //Increment the read index
      read_index = read_index + 1;

      //Initialize the new read object
      obj.reads[read_index] = { header: line.slice(1), sequence: '', quality: '' };

      //Change the state
      read_state = 1;
    }
    else if(read_state === 1)
    {
      //Check the line
      if(line === '')
      {
        //Save the error
        obj.error = new Error('Invalid FASTA/FASTQ file');

        //Close the reader
        return reader.close();
      }

      //Save the sequence
      obj.reads[read_index].sequence = line;

      //Change the read state
      read_state = (obj.format === 'fasta') ? 0 : 2;
    }
    else if(read_state === 2)
    {
      //Check for no '+' character
      if(line.charAt(0) !== '+')
      {
        //Save the error
        obj.error = new Error('Invalid FASTA/FASTQ file');

        //Close the reader
        return reader.close();
      }

      //Change the state
      read_state = 3;
    }
    else if(read_state === 3)
    {
      //Check for empty line
      if(line === '')
      {
        //Save the error
        obj.error = new Error('Invalid FASTA/FASTQ file');

        //Close the reader
        return reader.close();
      }

      //Save the read quality
      obj.reads[read_index].quality = line;

      //Change the read state
      read_state = 0;
    }
  });

  //Close event
  reader.on('close', function()
  {
    //Do the callback with the new object
    return cb(obj.error, obj);
  });
};

//Parse the file format
var parse_format = function(line)
{
  //check for empty line
  if(line === ''){ return null; }

  //Get the first character
  var first_char = line.charAt(0);

  //Check for no '>' or '@'
  if(first_char !== '>' && first_char !== '@'){ return null; }

  //Return the type
  return (first_char === '>') ? 'fasta' : 'fastq';
};