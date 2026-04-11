import * as xlsx from 'xlsx';
import * as fs from 'fs';

try {
  const buf = fs.readFileSync('Fabao Crafting Brainstorming.xlsx');
  const workbook = xlsx.read(buf, { type: 'buffer' });
  const data = {};

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    data[sheetName] = xlsx.utils.sheet_to_json(sheet);
  }

  const jsonStr = JSON.stringify(data, null, 2);
  fs.writeFileSync('./src/data.json', jsonStr);
  console.log("Successfully parsed xlsx to src/data.json");
} catch (e) {
  console.error("Error reading or parsing Excel file:", e);
}
