
var chalk = require('chalk');
var moment = require('moment');

class ConsoleLogger {
  static timestamp() {
    console.log(chalk.white.bgBlue("[" + moment().format() + "]"));
  }
  static log(message, severity) {
    console.log(chalk.blue("[" + severity + "] [" + moment().format() + "] " + message));
  }
  static event(message, includeTime) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(chalk.blue(message));
  }
  static topic(message, includeTime) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(chalk.blue.bgYellow.bold(message));
  }
  static subscribe(message) {
    console.log(chalk.green("[" + moment().format() + "] " + message));
  }
  static content1(message) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(chalk.green(message));
  }
  static white(message, includeTime) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(chalk.white(message));
  }
  static yellow(message) {
    console.log(chalk.yellow("[" + moment().format() + "] " + message));
  }
  static fail(message) {
    console.log(chalk.red("[" + moment().format() + "] " + message));
  }
}


module.exports = {
  ConsoleLogger,
    log: function(message, severity) {
        console.log(chalk.blue("[" + severity + "] [" + moment().format() + "] " + message));
    },

    event: function(message) {
        console.log(chalk.blue("[" + moment().format() + "] " + message));
    },

    subscribe: function(message) {
      console.log(chalk.green("[" + moment().format() + "] " + message));
    }
};
