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

  constructor(ip, port, instant, summation) {
    this.ip = ip;
    this.port = port;
    this.client = null;
    this.instant = instant;
    this.summation = summation;
    this.connected = false;
  }

  connect(options) {
    Logger.event("Attempting to connect to EnergyBridge...");
    var that = this;
    this.client = mqtt.connect(`tcp://${this.ip}:${this.port}`, options);
    this.addListeners();
  }

  disconnect() {
    var that = this;
    return new Promise(function(resolve, reject) {
      Logger.event("Disconnecting from EnergyBridge");
      that.client.end(true, function(){
        that.connectd = false;
        resolve();
      });
    });
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
          that.connected = true;
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
      that.connected = false;
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
    this.client.on('end', function() {
      Logger.event("Energy Bridge session ended");
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
}

module.exports = EnergyBridge;
