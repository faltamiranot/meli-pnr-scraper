import fs from 'fs';
import { parse } from 'csv-parse';

export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', row => records.push(row))
      .on('end', () => resolve(records))
      .on('error', err => reject(err));
  });
}
