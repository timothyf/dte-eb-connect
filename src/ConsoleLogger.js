
var chalk = require('chalk');
var moment = require('moment');
var LogColors = require('./LogColors.js');

class ConsoleLogger {

  static getColorFn(methodName) {
    return LogColors[methodName].bgColor ?
      chalk[LogColors[methodName].color][Colors[methodName].bgColor] :
      chalk[LogColors[methodName].color]
  }

  static timestamp() {
    console.log(this.getColorFn(this.timestamp.name)("[" + moment().format() + "]"));
  }
  static log(message, severity) {
    console.log(this.getColorFn(this.log.name)("[" + severity + "] [" + moment().format() + "] " + message));
  }
  static event(message, includeTime) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(this.getColorFn(this.event.name)(message));
  }
  static topic(message, includeTime) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(this.getColorFn(this.topic.name).bold(message));
  }
  static subscribe(message) {
    console.log(this.getColorFn(this.subscribe.name)("[" + moment().format() + "] " +  message));
  }
  static publish(message) {
    console.log(this.getColorFn(this.publish.name)("[" + moment().format() + "] " +  message));
  }
  static content1(message) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(this.getColorFn(this.content1.name)(message));
  }
  static white(message, includeTime) {
    message = includeTime ? "[" + moment().format() + "] " + message : message;
    console.log(chalk.white(message));
  }
  static yellow(message) {
    console.log(chalk.yellow("[" + moment().format() + "] " + message));
  }
  static fail(message) {
    console.log(this.getColorFn(this.fail.name)("[" + moment().format() + "] " +  message));
  }
}


module.exports = {
  ConsoleLogger
};
