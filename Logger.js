const chalk = require('chalk');

class Logger {

  static event(message) {
    let text = eval(`chalk.${process.env.COLOR_EVENTS}`)(message);
    console.log(text);
  }

  static fail(message) {
    let text = eval(`chalk.${process.env.COLOR_FAIL}`)(message);
    console.log(text);
  }

  static content1(message) {
    let text = eval(`chalk.${process.env.COLOR_CONTENT_1}`)(message);
    console.log(text);
  }

  static subscribe(message) {
    let text = eval(`chalk.${process.env.COLOR_SUBSCRIBE}`)(message);
    console.log(text);
  }
  static white(message) {
    console.log(chalk.white(message));
  }
}

module.exports = Logger;
