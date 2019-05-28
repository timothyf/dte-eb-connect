const Topics = require('./EBTopics.js');
const Logger = require('./Logger.js');


class MessageHandler {

  static handle(message) {
    var that = this;
    let cmpStr = message.topic;
    if (message.topic.includes('device') && message.topic.includes('announce')) {
      cmpStr= 'announce';
    }
    switch (cmpStr) {
      case Topics.ANNOUNCE:
      case Topics.REMOTE_ANNOUNCE:
      case Topics.DEVICE_ANNOUNCE: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(this.parseAnnounce(JSON.parse(message.body)));
        break;
      }
      case Topics.SUMMATION: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(this.parseMinuteSummation(JSON.parse(message.body)));
        break;
      }
      case Topics.REMOTE_SUMMATION:
      case Topics.MINUTE_SUMMATION:
      case Topics.REMOTE_MINUTE_SUMMATION: {
        Logger.content1('TOPIC: ' + message.topic);
        break;
      }
      case Topics.INSTANT_DEMAND: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(this.parseInstantDemand(JSON.parse(message.body)));
        break;
      }
      case Topics.INSTANT_DEMAND_ZIGBEE: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(this.parseInstantDemand(JSON.parse(message.body)));
        break;
      }
      case Topics.METERING_RESPONSE: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white("Received METERING_RESPONSE");
        break;
      }
      case Topics.POLLING_MODE:
      case Topics.POLLING_MODE_RESPONSE: {
        //Logger.content1('TOPIC: ' + message.topic);
        //Logger.white(message.body);
        break;
      }
      case Topics.HEARTBEAT_REQUEST:
      case Topics.HEARTBEAT_RESPONSE:
      case Topics.ZIGBEE_DIAG:
      case Topics.REMOTE_ZIGBEE_DIAG: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(message.body);
        break;
      }
      case Topics.EBAPI_POST_SUMMATIONS:
      case Topics.EBAPI_POST_REALTIME:
      case Topics.EBAPI_RESPONSE_SUMMATIONS:
      case Topics.EBAPI_RESPONSE_REALTIME: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(message.body);
        break;
      }
      default: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.fail("Unhandled Topic");
        Logger.white(message.body);
      }
    }
  }

  static parseMinuteSummation(message) {
    let result = "";
    let date = new Date(message.time*1000);
    let year = date.getFullYear();
    result += this.convertTimestamp(message.time);
    result += "\n";
    result += `${Math.round(message.value)} watts`;
    return result;
  }

  static parseInstantDemand(message) {
    le5 result = message.toString();
    return result;
  }

  static parseAnnounce(message) {
    return JSON.stringify(message);
  }

  static convertTimestamp(timeStamp) {
    let date = new Date(timeStamp);
    return date.toLocaleTimeString('en-US');
  }
}

module.exports = MessageHandler;
