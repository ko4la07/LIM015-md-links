const functions = require('./index.js');

// const mdLinks = (iPath, options = {}) => {
//   if (!functions.pathExist(iPath)) {
//     throw new Error('Invalid path');
//   } else {
//     return new Promise( (resolve) => {
//       if (options.validate) {
//         Promise.all(functions.searchingLinks(iPath).map((objLink) => functions.requestHttp(objLink)))
//           .then(res => resolve(res));
//       } else {
//         resolve(functions.searchingLinks(iPath));
//       }
//     });
//   }
// };

// mdLinks('../samples').then((res) => console.log(res));
// mdLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-social-network\\README.md',{ validate: true }).then((res) => console.log(res));
// mdLinks('../samples',{ validate: false }).then((res) => console.log(res));
// console.log(mdLinks('../samples',{ validate: false }));

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
// mdLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-social-network\\README.md',{ validate: true }).then((res) => console.log(res));
// mdLinks('../samples',{ validate: true }).then((res) => console.log(res));

module.exports = { mdLinks };
