const EnergyBridge = require('../src/EnergyBridge.js');

let eb = new EnergyBridge(process.env.EB_IP, process.env.EB_PORT, 'all');
eb.connect({username:process.env.EB_USERNAME,
            password:process.env.EB_PASSWORD,
            clientId:process.env.EB_CLIENT_ID});

eb.refresh();

// keep data connection alive
setInterval(function() {eb.refresh();}, 30000);
