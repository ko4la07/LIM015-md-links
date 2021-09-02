const chalk = require('chalk');
// Unique links
const uniquesLinks = (arrayLinks) => {
  const total = arrayLinks.length; // total links
  const links = arrayLinks.map((element) => element.href);
  const setLinks = new Set(links);
  const uniques = setLinks.size; // uniques links
  let stats = [];
  stats += chalk.bold.cyan(`Total: ${total}`) + '\n';
  stats += chalk.bold.green(`Unique: ${uniques}`) ;
  return stats;
};

// Broken links
const brokenLinks = (arrayLinks) => {
  const lengthArrayLinks = arrayLinks.length;
  const predicado = (item) => item.status > 199 && item.status < 400;
  const okLinks = arrayLinks.filter(predicado);
  const totalBroken = lengthArrayLinks - okLinks.length;
  let stats = [];
  stats += chalk.bold.red(`Broken: ${totalBroken}`);
  return stats;
};

module.exports = {
  uniquesLinks,
  brokenLinks
};
