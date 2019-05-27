
const ALL = "#";
const ANNOUNCE = "announce";
const CLIENTS = "clients/#";
const EVENTS = "event/#";
const REMOTE_ANNOUNCE = "remote/announce";
const DEVICE_ANNOUNCE = "device/?/announce"

const SUMMATION = "summation";
const REMOTE_SUMMATION = "remote/summation";
const EVENT_METERING = "event/metering/#";
const ZIGBEE_METERING = "_zigbee_metering/#";
const MINUTE_SUMMATION = "event/metering/summation/minute";
const REMOTE_MINUTE_SUMMATION = "remote/event/metering/summation/minute";
const INSTANT_DEMAND = "event/metering/instantaneous_demand";
const INSTANT_DEMAND_ZIGBEE = "_zigbee_metering/event/metering/instantaneous_demand";

const POLLING_MODE = "request/metering/polling_mode/get";
const POLLING_MODE_RESPONSE = "response/metering/polling_mode/get/ble_data2";
const HEARTBEAT_REQUEST = "request/diagnostics/heartbeat_stats";
const HEARTBEAT_RESPONSE = "response/diagnostics/heartbeat_stats/heartbeat273";
const ZIGBEE_DIAG = "event/diagnostics/zigbee";
const REMOTE_ZIGBEE_DIAG = "remote/event/diagnostics/zigbee";

const IS_APP_OPEN = "remote/request/is_app_open";
const IS_APP_OPEN_ZIGBEE = "_zigbee_metering/request/is_app_open";
const IS_APP_OPEN_RESPONSE = "_zigbee_metering/response/is_app_open/#";
const METERING_RESPONSE = "_zigbee_metering/response/#";

const EBAPI_POST_SUMMATIONS = "request/ebapi/post_minute_summations";
const EBAPI_POST_REALTIME = "request/ebapi/post_realtime";
const EBAPI_RESPONSE_SUMMATIONS = "response/ebapi/post_minute_summations/minute_summations274";
const EBAPI_RESPONSE_REALTIME = "response/ebapi/post_realtime/realtime275";


module.exports = {ALL,
                  ANNOUNCE,
                  REMOTE_ANNOUNCE,
                  DEVICE_ANNOUNCE,
                  SUMMATION,
                  REMOTE_SUMMATION,
                  MINUTE_SUMMATION,
                  REMOTE_MINUTE_SUMMATION,
                  INSTANT_DEMAND,
                  EVENT_METERING,
                  ZIGBEE_METERING,
                  INSTANT_DEMAND_ZIGBEE,
                  IS_APP_OPEN,
                  IS_APP_OPEN_ZIGBEE,
                  IS_APP_OPEN_RESPONSE,
                  METERING_RESPONSE,
                  POLLING_MODE,
                  POLLING_MODE_RESPONSE,
                  CLIENTS,
                  EVENTS,
                  HEARTBEAT_REQUEST,
                  HEARTBEAT_RESPONSE,
                  EBAPI_POST_SUMMATIONS,
                  EBAPI_POST_REALTIME,
                  EBAPI_RESPONSE_SUMMATIONS,
                  EBAPI_RESPONSE_REALTIME,
                  ZIGBEE_DIAG,
                  REMOTE_ZIGBEE_DIAG }
