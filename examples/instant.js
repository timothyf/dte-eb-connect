const EnergyBridge = require('../src/EnergyBridge.js');

let instant = true;
let summation = false;

if (process.argv[2] && process.argv[2] === '--instant') {
  instant = true;
  summation = false;
}
else if (process.argv[2] && process.argv[2] === '--summation') {
  instant = false;
  summation = true;
}

let eb = new EnergyBridge(process.env.EB_IP, process.env.EB_PORT, instant, summation);
eb.connect({username:process.env.EB_USERNAME,
            password:process.env.EB_PASSWORD,
            clientId:process.env.EB_CLIENT_ID});

eb.refresh();

// keep data connection alive
setInterval(function() {eb.refresh();}, 30000);
