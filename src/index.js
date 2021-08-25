// const http = require('http');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

// read a file
const readPathFile = (route) => fs.readFileSync(route).toString();
// console.log(readPathFile('./samples2/sample1.md'));

// read a directory
const readDir = (route) => fs.readdirSync(route);
// console.log(readDir('../samples'));
// console.log(readDir('C:/Users/dayan/Desktop/Proyectos/Laboratoria/LIM015-md-links/src/samples2'));

// Chech if a path exists
const pathExist = (pathRoute) => fs.existsSync(pathRoute); // boolean
// const resExist = pathExist('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2');
// const resExist = pathExist('../samples');
// console.log(resExist);

// Check if a path is absolute
const pathIsAbsolute = (pathRelative) => path.isAbsolute(pathRelative);
// const resIsAbsolute = pathIsAbsolute('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2');
// const resIsAbsolute = pathIsAbsolute('../samples');
// console.log(resIsAbsolute);

// Convert relative to absolute path
const relativeToAbsolutePath = (pathRelative) => path.resolve(pathRelative);
// const resConvert = relativeToAbsolutePath('../samples');
// console.log(resConvert);

// validate path
const validatePath = (inputPath) => pathIsAbsolute(inputPath) ? inputPath : relativeToAbsolutePath(inputPath);
// const resAbsolutePath = validatePath('../samples');
// const resAbsolutePath = validatePath('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2');
// console.log(resAbsolutePath);

// Check if the absolute path is file
const isFile = (absPath) => fs.statSync(absPath).isFile();
// const resIsFile = isFile('../samples/sample2.md');
// console.log(resIsFile);

// Check if the extension is .md
const isMd = (absPath) => path.extname(absPath) === '.md' ? true : false;
// const resIsMd = isMd('../samples/sample2.md');
// console.log(resIsMd);

// Save files and directories within a directory
const saveRoutesFilesAndDir = (dirPath) => {
  return readDir(dirPath).map((element) => {
    return path.join(dirPath,element);
  });
};
// console.log(saveRoutesFilesAndDir('../samples'));

// Search .md file paths of a route
const searchMdPaths = (iPath) => {
  let arrayOfMdPaths = [];
  const absPath = validatePath(iPath);
  if (isFile(absPath)) {
    if (isMd(absPath)) {
      arrayOfMdPaths.push(absPath);
    }
  } else {
    saveRoutesFilesAndDir(absPath).forEach((element) => {
      const pathsFilesDir = searchMdPaths(element);
      arrayOfMdPaths = arrayOfMdPaths.concat(pathsFilesDir);
    });
  }
  return arrayOfMdPaths;
};
// console.log(searchMdPaths('../samples/dirSample'));

// Searching links into files .md with marked - renderer
const searchingLinks = (iPath) => {
  const renderer = new marked.Renderer();
  const arrayLinks = [];
  const arrayPathsMd = searchMdPaths(iPath);
  arrayPathsMd.forEach((file) => {
    renderer.link = (href, title, text) => {
      const element = {
        href, text, file
      };
      arrayLinks.push(element);
    };
    marked(readPathFile(file), { renderer });
  });
  return arrayLinks;
};

// console.log(searchingLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md'));
// console.log(searchingLinks('.\\samples2\\sample1.md'));

// Searching links into files .md with regex
// const searchingLinks = (iPath) => {
//   const arrayPathsMd = searchMdPaths(iPath);
//   const regex = new RegExp(/\[([\w\s\d.|()À-ÿ]+)\]\([?:\/|https?:?\/\/]+[\w\d\s./?=#-&_%~,\-.:]+\)/, 'gim'); // /\[([^\]]+)]\(([^()]+)\)/g
//   const regexText = new RegExp(/\[([\w\s\d.|À-ÿ()]+)\]/, 'gim'); // /\[([^\]]+)]/g
//   const regexLink =  new RegExp(/\(((?:\/|https?:\/\/)[\w\d\s./?=#&_%~,\-.:]+)\)/, 'gim'); // /\(([^()]+)\)/g
//   const resultArray = [];
//   arrayPathsMd.map( (pathMd) => {
//     const rutaString = readPathFile(pathMd);
//     const resultado = rutaString.match(regex);
//     // const resultArray = [];
//     let i = 0;
//     while (i < resultado.length ) {
//       const resultText = resultado[i].match(regexText).join();
//       const resultLink = resultado[i].match(regexLink).join();
//       const objRes = {
//         href: resultLink.substring(1,resultLink.length - 1),
//         text: resultText.substring(1,resultText.length - 1),
//         file: pathMd
//       };
//       i = i + 1;
//       resultArray.push(objRes);
//     }
//   });
//   return resultArray;
// };
// console.log(searchingLinks('.\\samples2\\sample1.md'));

// Http request
const requestHttp = (linkObj) => {
  const fetchData = fetch(linkObj.href)
    .then((data) => {
      const objRes = {
        href: linkObj.href,
        text: linkObj.text.substring(0,50),
        file: linkObj.file,
        status: data.status,
        statusResponse: data.status > 199 && data.status < 400 ? 'ok' : 'fail',
      };
      return objRes;
    })
    .catch((error) => {
      const objRes = {
        href: linkObj.href,
        text: linkObj.text.substring(0,50),
        file: linkObj.file,
        status: 'There was a problem with the Fetch request ' + error,
        statusResponse: 'fail',
      };
      return objRes;
    });
  return fetchData;
};
links = [{ href:'https://www.google.com/', text:'hola google', file:'google' }, { href:'https://openclassrooms.com/en/courses/4309531-descubre-las-funciones-en-javascript/5108986-diferencia-entre-expresion-y-sentencia', text:'hola Openclassrooms', file:'Openclassrooms' }];

// console.log(requestHttp({ href:'https://www.google.com/', text:'hola google', link:'google' })); // retorna promesa

// Imprimiendo el resultado despues de que se resuelve la promesa
// Promise.all(links.map((link) => requestHttp(link)))
//   .then(res => console.log(res));

// Creating a server
// const html = fs.readFileSync('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\README.md');
// http.createServer(function(req,res) {
//   res.write(html);
//   res.end();
// }).listen(8080);

module.exports = {
  readPathFile,
  readDir,
  pathExist,
  pathIsAbsolute,
  relativeToAbsolutePath,
  validatePath,
  isFile,
  isMd,
  searchMdPaths,
  searchingLinks,
  requestHttp
};
