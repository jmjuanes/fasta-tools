//Quality string
var quality = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

//Convert a fasta object to a fastq
module.exports.toFastQ = function(obj, q)
{
  //Parse the quality value
  var quality_index = (typeof q === 'number') ? parseInt(q) : 20;

  //Check for negative values
  if(quality_index < 0){ quality_index = 0; }

  //Check for out of range values
  if(quality_index >= quality.length){ quality_index = quality.length - 1; }

  //Get the quality value
  var quality_value = quality[quality_index];

  //Iterate over all the reads of the file
  obj.reads = obj.reads.map(function(read)
  {
    //Add the sequence quality
    read.quality = Array(read.sequence.length + 1).join(quality_value);

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