const EnergyBridge = require('./src/EnergyBridge.js');

let instant = false;
let summation = true;

if (process.argv[2] && process.argv[2] === '--instant') {
  instant = true;
  summation = true;
}
else if (process.argv[2] && process.argv[2] === '--summation') {
  summation = true;
}

let eb = new EnergyBridge(process.env.EB_IP, process.env.EB_PORT, instant, summation);
eb.connect({username:process.env.EB_USERNAME,
            password:process.env.EB_PASSWORD,
            clientId:process.env.EB_CLIENT_ID});

//setInterval(function() {eb.refresh();}, 4000);
