const fs = require('fs');
const dirName = 'reports';
const dir = './' + dirName;

module.exports.createDir = () => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

module.exports.dirReports = dirName + '/';
