//Convert a fasta object to a fastq
module.exports.toFastQ = function(obj)
{
  //Check if the object is a tastq object
  if(obj.format === 'fastq')
  {
    //Return the original object
    return obj;
  }

  //Iterate over all the reads of the file
  obj.reads = obj.reads.map(function(read)
  {
    //Add the sequence quality
    read.quality = Array(read.sequence.length + 1).join('I');

    //Return the new read object
    return read;
  });

  //Change the object format
  obj.format = 'fastq';

  //Return the new object
  return obj;
};

//Convert a fastq object to a fasta
module.exports.toFasta = function(obj)
{
  //Check if the object has a fasta format
  if(obj.format === 'fasta')
  {
    //Return the original object
    return obj;
  }

  //Read all the reads of the file
  obj.reads = obj.reads.map(function(read)
  {
    //Remove the quality
    delete read.quality;

    //Return the new read object
    return read;
  });

  //Change the format
  obj.format = 'fasta';

  //Return the new object
  return obj;
};