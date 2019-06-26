const ConsoleLogger = require('./loggers/ConsoleLogger.js');
const Topics = require('./config-topics.js').topics();


class MessageHandler {

  static handle(message) {
    if (!this.searchTopicByName(message.topic)) {
      ConsoleLogger.fail(`Unhandled Topic - ${message.topic}`);
      ConsoleLogger.white(message.body);
    }
    else {
      if (message.topic.includes('polling_mode')) {return;} // don't log polling_mode messages
      ConsoleLogger.content1(`TOPIC: ${message.topic}`);
      let msg = this.parse(message);
      if (msg) {ConsoleLogger.white(msg);}
    }
  }

  static parse(message) {
    let topic = this.getTopicByName(message.topic);
    if (!topic) {
      return 'Unable to parse message for topic: ' + message.topic;
    }
    if (topic.category == 'usage-instant' || topic.category == 'usage-summation') {
      let body = JSON.parse(message.body);
      let value = null;
      if (topic.category == 'usage-summation') {value = body.value};
      if (topic.category == 'usage-instant') {value = body.demand};
      return this.formatUsage(body.time, value);
    }
    else {
      return message.body;
    }
  }

  static formatUsage(time, value) {
    let result = this.convertTimestamp(time) + " - ";
    result += `${Math.round(value)} watts`;
    return result;
  }

  static convertTimestamp(timeStamp) {
    let date = new Date(timeStamp);
    return date.toLocaleTimeString('en-US');
  }

  static getTopicByName(name) {
    return Topics.find(function(topic) {
      return topic.match == name;
    });
  }

  static searchTopicByName(name) {
    let result = false;
    Topics.forEach(function(topic) {
      if (name.includes(topic.match.slice(0, -2))) {
        result = true;
      }
    });
    return result;
  }
}

module.exports = MessageHandler;
