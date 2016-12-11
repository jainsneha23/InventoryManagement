import fs from 'fs';
import path from 'path';

const cache = {};

class template {
  static compile (filepath) {
    /*if (cache[filepath]) {
      return cache[filepath];
    }*/
    let string = fs.readFileSync(filepath, 'utf-8');
    string = string.replace(/{{([^}]*)}}/ig, (subpath) => {
      subpath = subpath.substr(2, subpath.length-4);
      return fs.readFileSync(path.join(__dirname,'/../',subpath), 'utf-8');
    });
    cache[filepath] = string;
    return string;
  }
}

export default template;
