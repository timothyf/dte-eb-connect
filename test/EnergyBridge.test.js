const EnergyBridge = require('../EnergyBridge.js');

test('constructs an EnergyBridge object', () => {
  let instant = true;
  let summation = true;
  let eb = new EnergyBridge("192.168.0.1", "8000", instant, summation);
  expect(eb).not.toBeNull();
  expect(eb.ip).toBe("192.168.0.1");
  expect(eb.port).toBe("8000");
  expect(eb.client).toBeNull();
  expect(eb.instant).toBeTruthy();
  expect(eb.summation).toBeTruthy();
});

test('Connect to Energy Bridge', () => {
  let connectOptions = { username:"", // username
                         password:"", // password
                         clientId:"testClient123"};
  let eb = new EnergyBridge("test.mosquitto.org", "8000", false, true);
  expect(eb.client).toBeNull();
  eb.connect(connectOptions);
  expect(eb.client).not.toBeNull();
  return eb.disconnect().then(function() {
    expect(eb.connected).not.toBeTruthy();
  });
});
