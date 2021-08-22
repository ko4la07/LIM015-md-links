// const http = require('http');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

// read a file
const readPathFile = (route) => fs.readFileSync(route).toString();
// console.log(fs.readFileSync('./sample1.md').toString());

// read a directory
const readDir = (route) => fs.readdirSync(route);
// console.log(readDir('../samples'));
// console.log(readDir('C:/Users/dayan/Desktop/Proyectos/Laboratoria/LIM015-md-links/src/samples2'));

// Chech if a path exists
const pathExist = (pathRoute) => fs.existsSync(pathRoute);
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
// console.log(searchMdPaths('../samples'));

// Search links into files .md
const searchLinks = (iPath) => {
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
// console.log(searchLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md'));

const url = 'https://openclassrooms.com/en/courses/4309531-descubre-las-funciones-en-javascript/5108986-diferencia-entre-expresion-y-sentencia';
fetch(url)
  // .then(res=>{return res.json();})
  .then(data=>{console.log(data.url, data.status);})
  .catch(err => {console.log(err);});

// Creating a server
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
  searchMdPaths
};
