const Logger = require('./Logger.js');
const Topics = require('./config-topics.js').topics();


class MessageHandler {

  static handle(message) {
    if (!this.searchTopicByName(message.topic)) {
      Logger.content1('TOPIC: ' + message.topic);
      Logger.fail("Unhandled Topic");
      Logger.white(message.body);
    }
    else {
      if (message.topic.includes('polling_mode')) {return;} // don't log polling_mode messages
      Logger.content1('TOPIC: ' + message.topic);
      let msg = this.parse(message);
      if (msg) {Logger.white(msg);}
    }
  }

  static parse(message) {
    let topic = this.getTopicByName(message.topic);
    if (!topic || !this.searchTopicByName(message.topic)) {
      return 'Unable to parse message for topic: ' + message.topic;
    }
    if (topic.name == 'SUMMATION') {
      let body = JSON.parse(message.body);
      let result = this.convertTimestamp(body.time) + " - ";
      result += `${Math.round(body.value)} watts`;
      return result;
    }
    else if (topic.name == 'INSTANT_DEMAND') {
      return message.body;
    }
    else if (topic.name == 'INSTANT_DEMAND_ZIGBEE' ||
             topic.name == 'REMOTE_INSTANT_DEMAND' ||
             topic.name == 'REMOTE_SUMMATION' ||
             topic.name == 'MINUTE_SUMMATION' ||
             topic.name == 'REMOTE_MINUTE_SUMMATION' ||
             topic.name == 'POLLING_MODE' ||
             topic.name == 'POLLING_MODE_RESPONSE' ||
             topic.name == 'REMOTE_ANNOUNCE' ||
             topic.name == 'IS_APP_OPEN') {
      return;
    }
    else {
      return message.body;
    }
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
