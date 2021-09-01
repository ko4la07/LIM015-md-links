#! / usr / bin / env node

const { mdLinks } = require('./mdlinks.js');
const { uniquesLinks, brokenLinks } = require('./options.js');
const chalk = require('chalk');

// console.log(chalk.blue('Hello world!')); // example use chalk

const argValue = process.argv.slice(2);
// console.log(argValue); // array of argument values
const templateHelp = `
    ${chalk.blueBright('(ಡ ‸ಡ )⊃━━━━ ☆ ☆ ˚ஐ₊✧˳ஐ༚✧˚ஐ₊✧˳ஐ༚✧ ━━━ HELP ━━━ ˚ஐ₊✧˳ஐ༚✧˚ஐ₊✧˳ஐ༚✧')} 
    ${chalk.magentaBright('☛ Try using the following options after the path:')} 
    ${chalk.greenBright('--validate')} use this option to get extensive information of each file.
    ${chalk.yellowBright('--stats')}    use this option to get the number of total and unique links.
    ${chalk.magentaBright('☛ You can also combine the options:')}
    ${chalk.greenBright('--validate')} ${chalk.yellowBright('--stats')} or ${chalk.yellowBright('--stats')} ${chalk.greenBright('--validate')} to get the number of total, unique and broken links.
    ${chalk.magentaBright('☛ You can also skip the options and just enter the path to get a summary of the links found on the path.')}
    ${chalk.magentaBright('☛ Use')} ${chalk.redBright('--help')} ${chalk.magentaBright('if you need to see this summary again.')}
    `;

if (argValue.length === 1) {
  if (argValue[0] === '--help') {
    console.log(templateHelp);
  } else {
    let arrayResult = [];
    mdLinks(argValue[0])
      .then((arrayResponse) => {
        if (arrayResponse === 'Invalid path') {
          console.log(chalk.redBright('（ノT＿T)ノ ＾┻━┻ -=ﾆ=一＝三 Invalid path.'));
        } else {
          if (arrayResponse.length !== 0) {
            arrayResponse.forEach((element) => {
              arrayResult += chalk.magentaBright('ʕ•́ᴥ•̀ʔっ') + ` ${element.file}` + chalk.cyan(` ${element.href}`) + chalk.yellow(` ${element.text}`) + '\n';
            });
            console.log(arrayResult);
          } else if (arrayResponse.length === 0) {
            console.log(chalk.bold.cyan(' ╰( ^o^)╮-=ﾆ=一＝三 No links found.'));
          }
        }
      });
  }
} else if (argValue.length === 2) {
  switch (argValue[1]) {
  case '--validate':
    let arrayResult = [];
    mdLinks(argValue[0], { validate: true })
      .then((arrayResponse) => {
        if (arrayResponse.length !== 0) {
          arrayResponse.forEach((element) => {
            if (element.status > 199 && element.status < 400) {
              arrayResult += chalk.magentaBright('ʕ•́ᴥ•̀ʔっ') + ` ${element.file}` + chalk.cyan(` ${element.href}`) + chalk.greenBright(` ${element.statusResponse}`) + chalk.yellow(` ${element.status}`) + '\n';
            } else if (element.status <= 199 || element.status >= 400) {
              arrayResult += chalk.magentaBright('ʕ•́ᴥ•̀ʔっ') + ` ${element.file}` + chalk.cyan(` ${element.href}`) + chalk.redBright(` ${element.statusResponse}`) + chalk.yellow(` ${element.status}`) + '\n';
            } else {
              arrayResult += chalk.magentaBright('ʕ•́ᴥ•̀ʔっ') + ` ${element.file}` + chalk.cyan(` ${element.href}`) + chalk.yellow(` ${element.statusResponse}`) + chalk.gray(` ${element.status}`) + '\n';
            }
          });
          console.log(arrayResult);
        } else if (arrayResponse.length === 0) {
          console.log(chalk.bold.cyan(' ╰( ^o^)╮-=ﾆ=一＝三 No links found.'));
        }
      });
    break;
  case '--stats':
    mdLinks(argValue[0], { validate: false })
      .then((arrayResponse) => {
        console.log(uniquesLinks(arrayResponse));
      });
    break;
  case '--help':
    console.log(templateHelp);
    break;

  default:
    console.log(chalk.bold.cyan('ಥ _ಥ Sorry is not a valid option.'));
    console.log(templateHelp);
    break;
  }
} else if (argValue.length === 3) {
  if ( (argValue[1] === '--stats' && argValue[2] === '--validate') || (argValue[1] === '--validate' && argValue[2] === '--stats')) {
    mdLinks(argValue[0], { validate: true })
      .then((arrayResponse) => {
        console.log(uniquesLinks(arrayResponse));
        console.log(brokenLinks(arrayResponse));
      });
  } else {
    console.log(chalk.bold.cyan('ಥ _ಥ Sorry is not a valid option.'));
    console.log(templateHelp);
  }
} else {
  console.log(chalk.bold.cyan('ಥ _ಥ Sorry is not a valid option.'));
  console.log(templateHelp);
}
