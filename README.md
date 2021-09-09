# Markdown Links 

## Table of contents

- [Overview](#overview)
  - [Built with](#built-with)
  - [Installation](#installation)
  - [How to use](#how-to-use)
  - [Flowcharts](#flowcharts)
- [My process](#my-process)
  - [The challenge](#the-challenge)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [General considerations](#general-considerations)
- [Checklist](#checklist)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Library Markdown Links
This project presents a library that reads files in `Markdown` format (extension .md) in search of links in order to know their status and report statistics on the links.

### Built with

This library was built using

  - javascript
  - [Node.js](https://nodejs.org/)

    Modules

    - fs
    - path
    - console

### Unit test

```
Jest was used for unit tests.
```

### Installation

Install the library: 

```
npm install ko4la07-mdlinks
```
or you can also download it from github:

```
npm install ko4la07/LIM015-md-links
```

### How to use

### Through the Command Line Interface (CLI) 

The executable of this application is executed as follows through the **terminal**: 

```
md-links <path-to-file> [options] 
```

Example:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

The default behavior should not validate if the URLs respond ok or not, it should only identify the markdown file (from the path it receives as an argument), analyze the Markdown file and print the links it finds, along with the path of the file where it appears and the text inside the link (truncated to 50 characters). 

#### Options

##### `--validate`

If we pass the `--validate` option, the module must make an HTTP request to find out if the link works or not. If the link results in a redirect to a URL that responds ok, then we will treat the link as ok.

Example:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

We see that the _output_ in this case includes the word `ok` or` fail` after the URL, as well as the status of the response received to the HTTP request to said URL.

##### `--stats`

If we pass the `--stats` option, the output will be a text with basic statistics about the links. 

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

We can also combine `--stats` and` --validate` to obtain needed statistics from the validation results. 

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

### Flowcharts
  The API and CLI flowcharts:

![API flowchart](https://github.com/ko4la07/LIM015-md-links/blob/main/assets/img/mdLinks-flowchart-API.png)

![CLI flowchart](https://github.com/ko4la07/LIM015-md-links/blob/main/assets/img/mdLinks-flowchart-CLI.png)

## My process

### The challenge

Designing a library is a fundamental experience for any developer because it forces you to think about the interface (API) of your modules and how it will be used by other developers. You must have special consideration in peculiarities of the language, conventions and good practices.

### What I learned and the links of useful resources

### JavaScript

- [ ] [Array manipulation (filer | sort | map | reduce)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/)

- [ ] [Objects (key, value)](https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects)

- [ ] [Use of conditionals  (if-else, switch, ternary operator, boolean logic)](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals)

- [ ] [Functions (params, args, return)](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)

- [ ] [Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion)

- [ ] [Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)

- [ ] [Differentiate between expression and statements.](https://javascript.plainenglish.io/what-is-an-expression-and-what-is-a-statement-in-javascript-and-how-to-remember-it-4d6920ee7b08)

- [ ] [Función Callback - MDN](https://developer.mozilla.org/es/docs/Glossary/Callback_function)

- [ ] [Promise - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)

- [ ] [Unit test - Jest](https://jestjs.io/docs/es-ES/getting-started)

- [ ] [Asynchronous tests ](https://jestjs.io/docs/es-ES/asynchronous)

- [ ] [Use of mocks and spies](https://jestjs.io/docs/es-ES/manual-mocks)

- [ ] Compatibility testing in multiple runtime environments 

- [ ] Use of linter (ESLINT)

- [ ] Use of descriptive identifiers (Nomenclature and Semantics) 

### Node.js

- [ ] [Install and use modules with npm](https://www.npmjs.com/)

- [ ] [package.json configuration ](https://docs.npmjs.com/files/package.json)

- [ ] [npm-scripts configuration](https://docs.npmjs.com/misc/scripts)

- [ ] [process (env, argv, stdin-stdout-stderr, exit-code)](https://nodejs.org/api/process.html)

- [ ] [File system (fs, path)](https://nodejs.org/api/fs.html)

- [ ] [Path](https://nodejs.org/api/path.html)

### Control de Versiones (Git y GitHub)

- [ ] Git: Installation and configuration

- [ ] Git: Version control with git  (init, clone, add, commit, status, push, pull, remote)

- [ ] Git: Integration of changes between branches  (branch, checkout, fetch, merge, reset, rebase, tag)

- [ ] GitHub: Account and repos creation, SSH keys configuration 

- [ ] [GitHub: Deployment with GitHub Pages](https://pages.github.com/)

- [ ] GitHub: Github collaboration (branches | forks | pull requests | code review | tags)

- [ ] GitHub: Organization on Github  (projects | issues | labels | milestones | releases)

### HTTP

- [ ] Consulta o petición (request) y respuesta (response).

  - [ ] [Generalidades del protocolo HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)
  - [ ] [Mensajes HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)


- [ ] Codigos de status de HTTP
  - [ ] [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
  - [ ] [The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)

## General considerations 

- This project must be "solved" individually. 

- The **library** and the **executable script** (command line tool - CLI) must be implemented in JavaScript to be executed with Node.js. **It is allowed to use external libraries**.

- Your module ** must be installable ** via `npm install <github-user> / md-links`. This module must include both an _executable_ that we can invoke on the command line and an interface that we can import with `require` to use it programmatically. 

- **Unit tests** must cover a minimum of 70% of _statements_, _functions_, _lines_ and _branches_. We recommend exploring [Jest](https://jestjs.io/) for your unit tests. 

- For this project ** it is not allowed ** to use `async / await`. 

- For this project the use of ES Modules `(import / export)` is **optional**, in the case you choose to use it you must create a `build` script in the` package.json` that transforms them into `requires` and `module.exports` with the help of **babel**. 


## Checklist

### General

- [ ] Can be installed via `npm install --global <github-user>/md-links`

### `README.md`

- [ ] A board with the backlog for the implementation of the library. 
- [ ] Technical documentation of the library. 
- [ ] Library installation and use guide.

### API `mdLinks(path, opts)`

- [ ] The module exports a function with the expected interface (API). 
- [ ] Implement single file support.
- [ ] Implement directory support.
- [ ] Implement `options.validate`

### CLI

- [ ] Exposes executable `md-links` in the path (configured in `package.json`) 
- [ ] Runs without errors / expected output 
- [ ] Implement `--validate`
- [ ] Implement `--stats`

### Unit tests

- [ ] Unit tests cover a minimum of 70% of statements, functions, lines, and branches. 
- [ ] Pass tests (and linters) (`npm test`).

## Author

- [Dayana Huaytalla Tineo](https://www.linkedin.com/in/dhuaytalla)
