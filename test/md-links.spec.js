const { pathExist, validatePath, isFile, isMd, searchMdPaths } = require('../src/index.js');

// ----------Test exist path----------
describe('Check if the path exists', () => {
  test('It should be a function', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('It should return true if the path exists ', () => {
    expect(pathExist('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md')).toBe(true);
  });
  it('It should return false if the path does not exist', () => {
    expect(pathExist('../samples/sample.txt')).toBe(false);
  });
});

// ---------Test validate path ---------
describe('Validate if the path is absolute', () => {
  test('It should be a function', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('It should convert a relative to absolute path', () => {
    expect(validatePath('./samples/sample2.md')).toEqual('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\sample2.md');
  });
});

// ----------Test Check if the absolute path is file----------
describe('Check if the absolute path is file', () => {
  test('It should be a function', () => {
    expect(typeof isFile).toBe('function');
  });
  it('It should return true if the absolute path is a file ', () => {
    expect(isFile('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md')).toBe(true);
  });
  it('It should return false if the absolute path does not a file', () => {
    expect(isFile('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2')).toBe(false);
  });
});

// ----------Test Check if the extension is .md----------
describe('Check if the extension is .md', () => {
  test('It should be a function', () => {
    expect(typeof isMd).toBe('function');
  });
  it('It should return true if the absolute path is a markdown file', () => {
    expect(isMd('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md')).toBe(true);
  });
  it('It should return false if the absolute path is not a markdown file', () => {
    expect(isMd('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\sample3.txt')).toBe(false);
  });
});

// ---------Test searching markdown routes---------
describe('Searching markdown routes', () => {
  test('It should be a function', () => {
    expect(typeof searchMdPaths).toBe('function');
  });
  it('If the input path is a file, it should return an array with only one markdown route', () => {
    expect(searchMdPaths('./samples/sample2.md')).toEqual(['C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\sample2.md']);
  });
  it('If the input path is a directory, it should return an array of markdown routes', () => {
    const resArray = [
      'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\dirSample2\\dirSample3\\sample6.md',
      'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\dirSample2\\sample5.md',
      'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\sample2.md'
    ];
    expect(searchMdPaths('./samples')).toEqual(resArray);
  });
});

// const mdLinks = require('../');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
