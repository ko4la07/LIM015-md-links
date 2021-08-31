// Unique links
const uniquesLinks = (arrayLinks) => {
  const total = arrayLinks.length; // total links
  const links = arrayLinks.map((element) => element.href);
  const setLinks = new Set(links);
  const uniques = setLinks.size; // uniques links
  let stats = [];
  stats += 'Total: ' + total + '\n';
  stats += 'Unique: ' + uniques ;
  // console.log(uniques);
  return stats;
};

const inputArray = [
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
  },
  {
    href: 'https://openclassrooms.com/en/courses/4309531-descubre-las-funciones-en-javascript/5108986-diferencia-entre-expresion-y-sentencia',
    text: 'Openclassrooms',
    file: 'C:\\Users\\dayan\\Desktop\\Proyectos\\Laboratoria\\LIM015-md-links\\samples\\sample2.md',
    status: 410,
    statusResponse: 'fail'
  }
];

// console.log(uniquesLinks(inputArray));

// Broken links
const brokenLinks = (arrayLinks) => {
  const lengthArrayLinks = arrayLinks.length;
  const predicado = (item) => item.status > 199 && item.status < 400;
  const okLinks = arrayLinks.filter(predicado);
  const totalBroken = lengthArrayLinks - okLinks.length;
  let stats = [];
  stats += 'Broken: ' + totalBroken;
  // stats += 'Uniques: ' + uniques + '\n';
  return stats;
};

// console.log(brokenLinks(inputArray));
