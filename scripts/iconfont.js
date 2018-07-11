const fs = require('fs');
const path = require('path');

const cssFilePath = process.argv[2];
if (!cssFilePath) throw new Error('Need pass iconfont css file path');

const p = path.resolve(cssFilePath);
const cssfile = fs.readFileSync(p, 'utf8');

const cssfileArr = cssfile.split('\n');

const dataArr = cssfileArr.filter(line => line.startsWith('.') && line.indexOf(':') > 0);

const json = {};
dataArr.forEach(line => {
  const [key, trash, value] = line.split(':');

  const thekey = key.slice(1);
  const a = value.split('"')[1].slice(1);
  const thevalue = parseInt(a, 16);

  json[thekey] = thevalue;
});

const filename = 'iconfont.json';
const iconfontPath = path.resolve('./app/static/iconfont', filename);

fs.writeFileSync(iconfontPath, JSON.stringify(json));
