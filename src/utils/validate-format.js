//Function for validate the fasta format
function ValidateFormat(f)
{
  //Lower case
  f = f.toLowerCase();

  //Check for fastq
  if(f === 'fastq' || f === 'fq')
  {
    //Return fastq
    return 'fastq';
  }
  else if(f === 'fasta' || f === 'fas' || f === 'fa')
  {
    //Return fasta
    return 'fasta';
  }
  else
  {
    //Show warning
    console.warn('Unknown format "' + f + '". Using "fasta" by default.');

    //Return default: 'fasta'
    return 'fasta';
  }
}

//Exports to node
module.exports = ValidateFormat;
