const functions = require('./index.js');

const mdLinks = (iPath, options = {}) => {
  return new Promise( (resolve) => {
    if (!functions.pathExist(iPath)) {
      const err = 'Invalid path';
      resolve(err);
    } else {
      if (options.validate) {
        Promise.all(functions.searchingLinks(iPath).map((objLink) => functions.requestHttp(objLink)))
          .then(res => resolve(res));
      } else {
        resolve(functions.searchingLinks(iPath));
      }
    };
  });
};
// mdLinks('../samples').then((res) => console.log(res));

module.exports = { mdLinks };
