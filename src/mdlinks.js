const functions = require('./index.js');

const mdLinks = (path) => {
  return functions.readPathFile(path);
};

// Examples read file
// const res1 = mdLinks('.\\samples2\\sample1.md');
// console.log(res1);
// const res2 = mdLinks('../samples/sample2.md');
// console.log(res2);
// const res3 = mdLinks('../samples/sample3.txt');
// console.log(res3);

// Examples read a directory of a relative path
// const resFiles1 = functions.readDir('../samples');
// console.log(resFiles1);

// const resFiles2 = functions.readDir('./samples2');
// console.log(resFiles2);

// Examples read a directory of a absolute path
// const resFiles3 = functions.readDir('C:/Users/dayan/Desktop/Proyectos/Laboratoria/LIM015-md-links/src/samples2');
// console.log(resFiles3);
