
require('dotenv').config();
var EnergyBridge = require('./EnergyBridge.js');
var Topics = require('./EBTopics.js');


let eb = new EnergyBridge(process.env.EB_IP, logger);
eb.connect({username:process.env.EB_USERNAME,
            password:process.env.EB_PASSWORD,
            clientId:process.env.EB_CLIENT_ID});

//setInterval(function() {eb.refresh();}, 4000);


function logger(message) {
  console.log('TOPIC: ' + message.topic);
  switch (message.topic) {
    case Topics.ANNOUNCE: {
      console.log(EnergyBridge.parseAnnounce(JSON.parse(message.body)));
      break;
    }
    case Topics.MINUTE_SUMMATION: {
      console.log(EnergyBridge.parseMinuteSummation(JSON.parse(message.body)));
      break;
    }
    case Topics.INSTANT_DEMAND: {
      console.log(EnergyBridge.parseInstantDemand(JSON.parse(message.body)));
      break;
    }
    case Topics.INSTANT_DEMAND_ZIGBEE: {
      console.log(EnergyBridge.parseInstantDemand(JSON.parse(message.body)));
      break;
    }
    case Topics.IS_APP_OPEN_RESPONSE: {
      console.log("Received IS_APP_OPEN_RESPONSE");
      break;
    }
    case Topics.CLIENTS: {
      console.log('Received clients');
      break;
    }
    default:
      console.log('Unrecognized topic: ' + message.topic);
  }
}
