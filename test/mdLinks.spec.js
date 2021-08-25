const { mdLinks } = require('../src/mdlinks');

// ---------test mdLinks-------
describe('mdLinks test', () => {
  test('It should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('If validate: true, it should return an array of objects with 5 properties: href, text, file, status, statusResponse', () => {
    const resultArray = [
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md',
        status: 200,
        statusResponse: 'ok'
      },
      {
        href: 'https://es.stackoverflow.com',
        text: 'stackoverflow',
        file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md',
        status: 200,
        statusResponse: 'ok'
      },
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md',
        status: 200,
        statusResponse: 'ok'
      }
    ];
    return expect(mdLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md', { validate: true })).resolves.toEqual(resultArray);
  });
  it('If validate: false, it should return an array of objects with 3 properties: href, text, file', () => {
    const resultArray = [
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md'
      },
      {
        href: 'https://es.stackoverflow.com',
        text: 'stackoverflow',
        file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md'
      },
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md'
      }
    ];
    return expect(mdLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md', { validate: false })).resolves.toEqual(resultArray);
  });
  // it('If the path does not exist, it should return in console: Invalida Path', () => {
  //   return expect(mdLinks('C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample.md')).resolves.toEqual('Invalid path');
  // });
});
