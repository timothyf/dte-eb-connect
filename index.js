const chalk = require('chalk');
const EnergyBridge = require('./EnergyBridge.js');
const Topics = require('./EBTopics.js');
const Logger = require('./Logger.js');
require('dotenv').config();


let instant = false;
let summation = true;

if (process.argv[2] && process.argv[2] === '--instant') {
  instant = true;
  summation = true;
}
else if (process.argv[2] && process.argv[2] === '--summation') {
  summation = true;
}

let eb = new EnergyBridge(process.env.EB_IP, logger, instant, summation);
eb.connect({username:process.env.EB_USERNAME,
            password:process.env.EB_PASSWORD,
            clientId:process.env.EB_CLIENT_ID});

//setInterval(function() {eb.refresh();}, 4000);


function logger(message) {
  Logger.content1('TOPIC: ' + message.topic);
  switch (message.topic) {
    case Topics.ANNOUNCE: {
      Logger.white(EnergyBridge.parseAnnounce(JSON.parse(message.body)));
      break;
    }
    case Topics.MINUTE_SUMMATION: {
      Logger.white(EnergyBridge.parseMinuteSummation(JSON.parse(message.body)));
      break;
    }
    case Topics.INSTANT_DEMAND: {
      Logger.white(EnergyBridge.parseInstantDemand(JSON.parse(message.body)));
      break;
    }
    case Topics.INSTANT_DEMAND_ZIGBEE: {
      Logger.white(EnergyBridge.parseInstantDemand(JSON.parse(message.body)));
      break;
    }
    case Topics.METERING_RESPONSE: {
      Logger.white("Received METERING_RESPONSE");
      break;
    }
    default:
      Logger.white('Unrecognized topic: ' + message.topic);
  }
}
