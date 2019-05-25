var mqtt = require('mqtt');
var Topics = require('./EBTopics.js');


class EnergyBridge {

  constructor(ip, logger) {
    this.ip = ip;
    this.client = null;
    this.logger = logger;
  }

  connect(options) {
    console.log("Attempting to connect to EnergyBridge...");
    var that = this;
    this.client = mqtt.connect('tcp://' + this.ip, options);
    this.addListeners();
  }

  disconnect() {
    console.log("Disconnecting from EnergyBridge");
    this.client.end();
  }

  addSubscriptions(topics) {
    var that = this;
    topics.forEach(function(topic) {
      console.log("Subscribing to " + topic);
      that.client.subscribe(topic);
    });
  }

  addListeners() {
    var that = this;

    this.client.on('connect', function(){
          console.log("EnergyBridge Connected");
          that.addSubscriptions([Topics.ANNOUNCE,
                                 Topics.MINUTE_SUMMATION,
                                 Topics.INSTANT_DEMAND,
                                 Topics.INSTANT_DEMAND_ZIGBEE,
                                 Topics.IS_APP_OPEN_RESPONSE,
                                 Topics.CLIENTS])});
    this.client.on('message', function (topic, message) {
      console.log("Message received");
      that.logger({topic:topic, body:message});
      if (topic == Topics.MINUTE_SUMMATION) {
        that.disconnect();
      }
    });
    this.client.on('error', function(error) {
      console.log(error.message);
    });
    this.client.on('close', function(error) {
      console.log(`Connection closed (${error})`);
    });
    this.client.on('reconnect', function(error) {
      console.log("Reconnecting to Energy Bridge");
    });
    this.client.on('disconnect', function(error) {
      console.log("Energy Bridge disconnected");
    });
    this.client.on('offline', function(error) {
      console.log("Energy Bridge offline");
    });
  }

  refresh() {
    if (this.client) {
      let time = Date.now();
      let payload = "{'request_id':'" + time.toString() + "'}";
      this.client.publish(Topics.IS_APP_OPEN, payload, {}, function(err) {
        if (err) {
          console.log("Error while publishing: " + err);
        }
      });
      this.client.publish(Topics.IS_APP_OPEN_ZIGBEE, payload, {}, function(err) {
        if (err) {
          console.log("Error while publishing: " + err);
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
    return message;
  }

  static convertTimestamp(timeStamp) {
    let date = new Date(timeStamp);
    return date.toLocaleTimeString('en-US');
  }
}

module.exports = EnergyBridge;
