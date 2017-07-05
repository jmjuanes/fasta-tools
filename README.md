# fasta-tools

> Tools for working with FASTA/FASTQ files (Bioinformatics).

[![npm](https://img.shields.io/npm/v/fasta-tools.svg?style=flat-square)](https://www.npmjs.com/package/fasta-tools)
[![npm](https://img.shields.io/npm/dt/fasta-tools.svg?style=flat-square)](https://www.npmjs.com/package/fasta-tools)


## Install

Install using [npm](https://npmjs.com):
```
npm install fasta-tools
```

Import in your project: 

```javascript
var fasta_tools = require('fasta-tools');
```

## FASTA and FASTQ formats

### The FASTA format
### The FASTQ format
### The FASTA Object format
### the FASTQ Object format

## API

### fasta_tools.read(file, cb)

Read a **FASTA/FASTQ** file.


### fasta_tools.write(file, obj, cb)

Write a **FASTA/FASTQ** file.

### fastq_obj = fasta_tools.toFastQ(fasta_obj, quality)

Converts a **FASTA Object** to a **FASTQ Object** assuming a quality score of `quality`.

### fasta_obj = fasta_tools.toFasta(fastq_obj)

Converts a **FASTQ Object** to a **FASTA Object** by removing the quality value of each read.


## License 

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
