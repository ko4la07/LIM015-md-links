// const http = require('http');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

// read a file
const readPathFile = (route) => fs.readFileSync(route).toString();

// read a directory
const readDir = (route) => fs.readdirSync(route);

// Chech if a path exists
const pathExist = (pathRoute) => fs.existsSync(pathRoute); // boolean

// Check if a path is absolute
const pathIsAbsolute = (pathRelative) => path.isAbsolute(pathRelative);

// Convert relative to absolute path
const relativeToAbsolutePath = (pathRelative) => path.resolve(pathRelative);

// validate path
const validatePath = (inputPath) => pathIsAbsolute(inputPath) ? inputPath : relativeToAbsolutePath(inputPath);

// Check if the absolute path is file
const isFile = (absPath) => fs.statSync(absPath).isFile();

// Check if the extension is .md
const isMd = (absPath) => path.extname(absPath) === '.md' ? true : false;

// Save files and directories within a directory
const saveRoutesFilesAndDir = (dirPath) => {
  return readDir(dirPath).map((element) => {
    return path.join(dirPath,element);
  });
};

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
        status: 'There was a problem with the Fetch request. ' + error,
        statusResponse: 'fail',
      };
      return objRes;
    });
  return fetchData;
};

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
