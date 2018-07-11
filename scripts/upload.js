const fs = require('fs');
const shell = require('shelljs');
const path = require('path');

const pgyer_upload_url = 'https://www.pgyer.com/apiv2/app/upload';
const pgyer_api_key = 'fc04233b89a6464e8d703f6172b53834';
const apkfilepath = path.resolve(__dirname, '../android/app/build/outputs/apk/app-armeabi-v7a-release.apk');

let updateDescription = []
const envFile = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8');
const versionFile = fs.readFileSync(path.resolve(__dirname, '../version.json'), 'utf8');

let envLineIndex = null;
const envFileArr = envFile.split('\n');
envFileArr.forEach((line, idx) => {
  if (line.startsWith('API_BASE_URL')) {
    envLineIndex = idx > 0 ? idx - 1 : idx;
  }
});
if (envLineIndex) updateDescription.push(envFileArr[envLineIndex]);

const versionFileArr = versionFile.split('\n');
const versionText = versionFileArr[1].split(':')[1].trim();
const finalVersionText = `v${versionText.substring(1, versionText.length - 1)}`;
updateDescription.push(finalVersionText);
updateDescription.push('');

const commitsNumber = process.argv[2] ? process.argv[2] : 1;
const lastgithistory = shell.exec(`git log --oneline -n ${commitsNumber}`)['stdout'];
updateDescription.push(lastgithistory);

const command = `curl -F "file=@${apkfilepath}" -F "_api_key=${pgyer_api_key}" -F "buildUpdateDescription=${updateDescription.join('\n')}" ${pgyer_upload_url}`;
shell.exec(command);
