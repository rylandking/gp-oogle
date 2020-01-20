let csvToJson = require('convert-csv-to-json');

let fileInputName = 'premier-test.csv';
let fileOutputName = 'premier-test.json';

csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);

csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
