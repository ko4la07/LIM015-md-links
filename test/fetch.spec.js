jest.mock('node-fetch');
const fetch = require('node-fetch');
// const { Response } = jest.requireActual('node-fetch');
const { requestHttp } = require('../src');

test('fetch-mock-test test status 200', () => {
  const inputObject = {
    href: 'https://www.google.com',
    text: 'Google',
    file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md',
  };
  const resultObject = {
    href: 'https://www.google.com',
    text: 'Google',
    file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\src\\samples2\\sample1.md',
    status: 200,
    statusResponse: 'ok'
  };
  // fetch.mockReturnValue(Promise.resolve(new Response({ status: 200 }))); // Podemos poner el objeto resultado
  fetch.mockReturnValue(Promise.resolve({ status: 200 })); // Podemos escribir la respuesta de fetch
  return requestHttp(inputObject).then((result) => {
    expect(result).toEqual(resultObject);
  });
});

test('fetch-mock-test test status 404', () => {
  const inputObject = {
    href: 'https://zurb.com/word/mobile-first',
    text: 'Mobile First - ZURB',
    file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-social-network\\README.md'
  };
  const resultObject = {
    href: 'https://zurb.com/word/mobile-first',
    text: 'Mobile First - ZURB',
    file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-social-network\\README.md',
    status: 404,
    statusResponse: 'fail'
  };
  // fetch.mockReturnValue(Promise.resolve(new Response({ status: 404 }))); // Podemos poner el objeto resultado
  fetch.mockReturnValue(Promise.resolve({ status: 404 })); // Podemos escribir la respuesta de fetch
  return requestHttp(inputObject).then((result) => {
    // console.log(result);
    expect(result).toEqual(resultObject);
  });
});
