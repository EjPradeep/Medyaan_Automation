const XLSX = require('xlsx');
const path = require('path');

function readExcel(filePath, sheetName) {
    try {
        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        
        // Convert sheet to JSON
        const data = XLSX.utils.sheet_to_json((sheet),{raw: false, defval: ''});
        console.log('Excel Data:', data);
        return data;
    } catch (error) {
        console.error('Excel read error:', error);
        return null;
    }
}

module.exports = { readExcel };