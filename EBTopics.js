
const ANNOUNCE = "announce";
const CLIENTS = "clients/#";
const EVENTS = "event/#";

const EVENT_METERING = "event/metering/#";
const MINUTE_SUMMATION = "event/metering/summation/minute";
const INSTANT_DEMAND = "event/metering/instantaneous_demand";
const INSTANT_DEMAND_ZIGBEE = "_zigbee_metering/event/metering/instantaneous_demand";

const IS_APP_OPEN = "remote/request/is_app_open";
const IS_APP_OPEN_ZIGBEE = "_zigbee_metering/request/is_app_open";
const IS_APP_OPEN_RESPONSE = "_zigbee_metering/response/is_app_open/#";
const METERING_RESPONSE = "_zigbee_metering/response/#";

module.exports = {MINUTE_SUMMATION,
                  INSTANT_DEMAND,
                  EVENT_METERING,
                  INSTANT_DEMAND_ZIGBEE,
                  ANNOUNCE,
                  IS_APP_OPEN,
                  IS_APP_OPEN_ZIGBEE,
                  IS_APP_OPEN_RESPONSE,
                  METERING_RESPONSE,
                  CLIENTS,
                  EVENTS}
