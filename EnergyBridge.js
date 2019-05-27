const mqtt = require('mqtt');
const Topics = require('./EBTopics.js');
const Logger = require('./Logger.js');
const MessageHandler = require('./MessageHandler.js');
require('dotenv').config();


const SUBSRIPTION_TOPICS = [Topics.ALL];//,
                            // Topics.ANNOUNCE,
                            // Topics.ZIGBEE_METERING,
                            // Topics.IS_APP_OPEN_RESPONSE,
                            // Topics.METERING_RESPONSE,
                            // Topics.CLIENTS];


class EnergyBridge {

  constructor(ip, instant, summation) {
    this.ip = ip;
    this.client = null;
    this.instant = instant;
    this.summation = summation;
  }

  connect(options) {
    Logger.event("Attempting to connect to EnergyBridge...");
    var that = this;
    this.client = mqtt.connect('tcp://' + this.ip, options);
    this.addListeners();
  }

  disconnect() {
    Logger.event("Disconnecting from EnergyBridge");
    this.client.end();
  }

  addSubscriptions(topics) {
    var that = this;
    topics.forEach(function(topic) {
      Logger.subscribe("Subscribing to " + topic);
      that.client.subscribe(topic);
    });
  }

  addListeners() {
    var that = this;
    this.client.on('connect', function(){
          Logger.event("EnergyBridge Connected");
          let subscriptionTopics = SUBSRIPTION_TOPICS;
          // if (that.instant) {
          //   subscriptionTopics.push(Topics.INSTANT_DEMAND);
          //   subscriptionTopics.push(Topics.INSTANT_DEMAND_ZIGBEE);
          // }
          // if (that.summation) {
          //   subscriptionTopics.push(Topics.MINUTE_SUMMATION);
          // }
          that.addSubscriptions(subscriptionTopics)
    });
    this.client.on('message', function (topic, message) {
      MessageHandler.handle({topic:topic, body:message});
      if (topic == Topics.MINUTE_SUMMATION) {
        //that.disconnect();
      }
    });
    this.client.on('error', function(error) {
      Logger.fail(error.message);
    });
    this.client.on('close', function(error) {
      let msg = (error ? `(${error})` : "");
      Logger.fail(`Connection closed ${msg}`);
    });
    this.client.on('reconnect', function(error) {
      Logger.event("Reconnecting to Energy Bridge");
    });
    this.client.on('disconnect', function(error) {
      Logger.event("Energy Bridge disconnected");
    });
    this.client.on('offline', function(error) {
      Logger.fail("Energy Bridge offline");
      Logger.fail("Be sure you are on the same local network that your Energy Bridge is connected to.");
      that.disconnect();
    });
  }

  refresh() {
    if (this.client) {
      let time = Date.now();
      let payload = "{'request_id':'" + time.toString() + "'}";
      // Logger.event("Publishing IS_APP_OPEN");
      // this.client.publish(Topics.IS_APP_OPEN, payload, {}, function(err) {
      //   if (err) {
      //     Logger.event("Error while publishing: " + err);
      //   }
      // });
      Logger.event("Publishing IS_APP_OPEN_ZIGBEE");
      this.client.publish(Topics.IS_APP_OPEN_ZIGBEE, payload, {}, function(err) {
        if (err) {
          Logger.fail("Error while publishing: " + err);
        }
      });
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
    let result = "";
    result += message.toString();
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

module.exports = EnergyBridge;
