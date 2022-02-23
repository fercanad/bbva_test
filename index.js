const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const dataArray=[];
 /* CSV Writer.
  * The name of the output file and the headers are stopped by parameters
  */
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'name', title: 'Name'},
      {id: 'code', title: 'Code'},
      {id: 'score', title: 'Score'},
    ]
  });

// Function to order the data array in descending order by the control code
function reverSort(dataArray) { return dataArray.reverse((a, b)=> a.code - b.code); }  

/* Read the encrypted file from the 'hacked' file.
 * A read read adds the data to the data array and finally
 * sorts it and saves it to the output file 'out'.
 */
fs.createReadStream('hacked.csv')
  .pipe(csv())
  .on('data', (row) => {
    dataArray.push(row)
    console.log('dataArray: ',dataArray);

  })
  .on('end', () => {
    const sortedArray =reverSort(dataArray)
    console.log('sortedArray: ',sortedArray);
    csvWriter
    .writeRecords(sortedArray)
    .then(()=> console.log('CSV file successfully processed'));
  });

