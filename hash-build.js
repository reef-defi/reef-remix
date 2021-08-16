const fs = require('fs');

const ROOT_FOLDER = "./dist/apps/remix-ide";

const dateHash = (+new Date).toString(36);

const hashCode = (code) => code
  .replace(/main.js/g, `main.${dateHash}.js`)
  .replace(/vendor.js/g, `vendor.${dateHash}.js`)
  .replace(/runtime.js/g, `runtime.${dateHash}.js`)
  .replace(/polyfills.js/g, `polyfills.${dateHash}.js`);

fs.readFile(`${ROOT_FOLDER}/index.html`, 'utf8',(err, data) => {
  if (err) { return; }

  const newCode = hashCode(data);

  fs.writeFile(`${ROOT_FOLDER}/index.html`, newCode, (writeErr) => {
    writeErr && console.log(writeErr)
  });
  fs.rename(`${ROOT_FOLDER}/index.html`, `${ROOT_FOLDER}/index.${dateHash}.html`, (err) => err && console.log(err));
});
fs.readFile(`${ROOT_FOLDER}/webpack.index.html`, 'utf8',(err, data) => {
  if (err) { return; }

  const newCode = hashCode(data);

  fs.writeFile(`${ROOT_FOLDER}/webpack.index.html`, newCode, (writeErr) => {
    writeErr && console.log(writeErr)
  });
  fs.rename(`${ROOT_FOLDER}/webpack.index.html`, `${ROOT_FOLDER}/webpack.index.${dateHash}.html`, (err) => err && console.log(err));
});


fs.rename(`${ROOT_FOLDER}/main.js`, `${ROOT_FOLDER}/main.${dateHash}.js`, (err) => err && console.log(err));
fs.rename(`${ROOT_FOLDER}/vendor.js`, `${ROOT_FOLDER}/vendor.${dateHash}.js`, (err) => err && console.log(err));
fs.rename(`${ROOT_FOLDER}/runtime.js`, `${ROOT_FOLDER}/runtime.${dateHash}.js`, (err) => err && console.log(err));
fs.rename(`${ROOT_FOLDER}/polyfills.js`, `${ROOT_FOLDER}/polyfills.${dateHash}.js`, (err) => err && console.log(err));

fs.rename(`${ROOT_FOLDER}/main.js.map`, `${ROOT_FOLDER}/main.${dateHash}.js.map`, (err) => err && console.log(err));
fs.rename(`${ROOT_FOLDER}/vendor.js.map`, `${ROOT_FOLDER}/vendor.${dateHash}.js.map`, (err) => err && console.log(err));
fs.rename(`${ROOT_FOLDER}/runtime.js.map`, `${ROOT_FOLDER}/runtime.${dateHash}.js.map`, (err) => err && console.log(err));
fs.rename(`${ROOT_FOLDER}/polyfills.js.map`, `${ROOT_FOLDER}/polyfills.${dateHash}.js.map`, (err) => err && console.log(err));

