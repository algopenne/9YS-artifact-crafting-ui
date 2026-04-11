import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
files.forEach(f => {
  let s = fs.readFileSync(f, 'utf8');
  if (s.includes('import type {  } from "";')) {
    s = s.replace(/import type \{  \} from "";/g, 'import type { CraftingContext } from "../types";');
    fs.writeFileSync(f, s);
    console.log('Fixed ' + f);
  }
});
