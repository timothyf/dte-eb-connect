const Topics = require('./EBTopics.js');
const Logger = require('./Logger.js');
const EnergyBridge = require('./EnergyBridge.js');


class MessageHandler {

  static handle(message) {
    const EnergyBridge = require('./EnergyBridge.js');
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
        Logger.white(EnergyBridge.parseAnnounce(JSON.parse(message.body)));
        break;
      }
      case Topics.SUMMATION: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(EnergyBridge.parseMinuteSummation(JSON.parse(message.body)));
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
        Logger.white(EnergyBridge.parseInstantDemand(JSON.parse(message.body)));
        break;
      }
      case Topics.INSTANT_DEMAND_ZIGBEE: {
        Logger.content1('TOPIC: ' + message.topic);
        Logger.white(EnergyBridge.parseInstantDemand(JSON.parse(message.body)));
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
}

module.exports = MessageHandler;
