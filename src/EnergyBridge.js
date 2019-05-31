const mqtt = require('mqtt');
const Logger = require('./Logger.js');
const MessageHandler = require('./MessageHandler.js');
require('dotenv').config();
const Topics = require('./config-topics.js').topics();



class EnergyBridge {

  constructor(ip, port, instant, summation) {
    var that = this;
    this.ip = ip;
    this.port = port;
    this.client = null;
    this.instant = instant;
    this.summation = summation;
    this.connected = false;

    this.subscriptionTopics = [];
    Topics.forEach(function(topic) {
      if (topic.enabled == true) {
        that.subscriptionTopics.push(topic);
      }
    });
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
      Logger.subscribe("Subscribing to " + topic.name);
      that.client.subscribe(topic.match);
    });
  }

  addListeners() {
    var that = this;
    this.client.on('connect', function(){
          Logger.event("EnergyBridge Connected");
          that.connected = true;
          that.addSubscriptions(that.subscriptionTopics)
    });
    this.client.on('message', function (topic, message) {
      MessageHandler.handle({topic:topic, body:message});
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
      let payload = JSON.stringify(this.getTimestampRequestIdBody()); //"{'timestamp':" + time.toString() + ", 'request_id':'CH5tlREh-3'}";
      Logger.event("Publishing IS_APP_OPEN");
      let pubTopic = this.getTopicByName('IS_APP_OPEN');
      this.client.publish(pubTopic.match, payload, {}, function(err) {
        if (err) {
          Logger.event("Error while publishing: " + err);
        }
      });
      // Logger.event("Publishing IS_APP_OPEN_ZIGBEE");
      // pubTopic = this.getTopicByName('IS_APP_OPEN_ZIGBEE');
      // this.client.publish(pubTopic.match, payload, {}, function(err) {
      //   if (err) {
      //     Logger.fail("Error while publishing: " + err);
      //   }
      // });
    }
  }

  getTopicByName(name) {
    return Topics.find(function(topic) {
      return topic.name == name;
    });
  }

  getTimestampRequestIdBody() {
    let time = Date.now();
    let body = {};
    body.timestamp = time.toString();
    body.request_id = 'DteEnergyBridgeClient-' + this.getRandomInt(0, 100);
    return body;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = EnergyBridge;
