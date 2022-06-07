const mqtt = require('mqtt');
const ConsoleLogger = require('./ConsoleLogger.js').ConsoleLogger;
const MessageHandler = require('./MessageHandler.js');
require('dotenv').config();
const Topics = require('./config-topics.js').topics();


// mosquitto_sub -h 10.0.0.103 -p 2883 -i some_identifier -t '#' -v
// mosquitto_sub -h 10.0.0.103  -p 2883 -i some_identifier -u admin -P trinity -t 'event/metering/summation/minute' -v
// don't need user and password
// mosquitto_sub -h 10.0.0.103  -p 2883 -i some_identifier -t 'event/metering/summation/minute' -v


class EnergyBridge {

  // topic = topic name (see config-topics.js)
  constructor(ip, port, topic) {
    var that = this;
    this.ip = ip;
    this.port = port;
    this.client = null;
    this.connected = false;
    this.topic = topic;
    this.subscriptionTopics = [];
    Topics.forEach(function(topic) {
      if (topic.name == that.topic) { //(topic.enabled == true) {
        that.subscriptionTopics.push(topic);
      }
    });
  }

  connect(options) {
    //ConsoleLogger.event("Attempting to connect to EnergyBridge...");
    ConsoleLogger.event("Attempting to connect to EnergyBridge...");
    var that = this;
    this.client = mqtt.connect(`tcp://${this.ip}:${this.port}`, null); //options);
    this.addListeners();
  }

  disconnect() {
    var that = this;
    return new Promise(function(resolve, reject) {
      ConsoleLogger.event("Disconnecting from EnergyBridge");
      that.client.end(true, function(){
        that.connectd = false;
        resolve();
      });
    });
  }

  addSubscriptions(topics) {
    var that = this;
    topics.forEach(function(topic) {
      ConsoleLogger.subscribe("Subscribing to " + topic.name);
      that.client.subscribe(topic.match);
    });
  }

  addListeners() {
    var that = this;
    this.client.on('connect', function(){
          ConsoleLogger.event("EnergyBridge Connected");
          that.connected = true;
          that.addSubscriptions(that.subscriptionTopics)
    });
    this.client.on('message', function (topic, payload, packet) {
      //ConsoleLogger.yellow(JSON.stringify(packet));
      MessageHandler.handle({topic:topic, body:payload});
    });
    this.client.on('error', function(error) {
      ConsoleLogger.fail(error.message);
    });
    this.client.on('close', function(error) {
      let msg = (error ? `(${error})` : "");
      ConsoleLogger.fail(`Connection closed ${msg}`);
      that.connected = false;
    });
    this.client.on('reconnect', function(error) {
      ConsoleLogger.event("Reconnecting to Energy Bridge");
    });
    this.client.on('disconnect', function(error) {
      ConsoleLogger.event("Energy Bridge disconnected");
    });
    this.client.on('offline', function(error) {
      //ConsoleLogger.fail("Energy Bridge offline");
      ConsoleLogger.event("Energy Bridge offline");
      //ConsoleLogger.fail("Be sure you are on the same local network that your Energy Bridge is connected to.");
      ConsoleLogger.event("Be sure you are on the same local network that your Energy Bridge is connected to.");
      that.disconnect();
    });
    this.client.on('end', function() {
      ConsoleLogger.event("Energy Bridge session ended");
    });
  }

  refresh() {
    if (this.client) {
      let time = Date.now();
      let payload = JSON.stringify(this.getTimestampRequestIdBody()); //"{'timestamp':" + time.toString() + ", 'request_id':'CH5tlREh-3'}";
      ConsoleLogger.publish("Publishing to: remote/request/is_app_open");
      this.client.publish('remote/request/is_app_open', payload, {}, function(err) {
        if (err) {
          ConsoleLogger.event("Error while publishing: " + err);
        }
      });
    }
  }

  requestSummation() {

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
