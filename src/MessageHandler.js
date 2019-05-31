const Logger = require('./Logger.js');
const Topics = require('./config-topics.js').topics();


class MessageHandler {

  static handle(message) {
    var that = this;
    let cmpStr = message.topic;
    if (message.topic.includes('device') && message.topic.includes('announce')) {
      cmpStr= 'announce';
    }
    if (!this.getTopicByName(cmpStr)) {
      Logger.content1('TOPIC: ' + message.topic);
      Logger.fail("Unhandled Topic");
      Logger.white(message.body);
    }
    else {
      if (cmpStr.includes('polling_mode')) {return;} // don't log polling_mode messages
      Logger.content1('TOPIC: ' + message.topic);
      let msg = this.parse(message);
      if (msg) {Logger.white(msg);}
    }
  }

  static parse(message) {
    let topic = this.getTopicByName(message.topic);
    if (!topic) {
      return 'Unable to parse message for topic: ' + message.topic;
    }
    if (topic.name == 'SUMMATION') {
      let body = JSON.parse(message.body);
      let result = this.convertTimestamp(body.time) + " - ";
      result += `${Math.round(body.value)} watts`;
      return result;
    }
    else if (topic.name == 'INSTANT_DEMAND' ||
             topic.name == 'INSTANT_DEMAND_ZIGBEE') {
      return message.toString();
    }
    else if (topic.name == 'REMOTE_SUMMATION' ||
             topic.name == 'MINUTE_SUMMATION' ||
             topic.name == 'REMOTE_MINUTE_SUMMATION' ||
             topic.name == 'POLLING_MODE' ||
             topic.name == 'POLLING_MODE_RESPONSE') {
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
}

module.exports = MessageHandler;
