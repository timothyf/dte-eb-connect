module.exports = {
  topics: function() {
    let topicsArray = [
      { name:'ALL', match:"#", enabled:false },
      { name:'ANNOUNCE', match:'announce', enabled:false },
      { name:'CLIENTS', match:'clients/#', enabled:false },
      { name:'EVENTS', match:'event/#', enabled:false },
      { name:'REMOTE_ANNOUNCE', match:'remote/announce', enabled:false },
      { name:'DEVICE_ANNOUNCE', match:'device/?/announce', enabled:false },

      { name:'SUMMATION', match:'summation', category: 'usage-summation', enabled:true },
      { name:'REMOTE_SUMMATION', match:'remote/summation', category: 'usage-summation', enabled:false },
      { name:'MINUTE_SUMMATION', match:'event/metering/summation/minute', category:'usage-summation', enabled:false },
      { name:'REMOTE_MINUTE_SUMMATION', match:'remote/event/metering/summation/minute', category:'usage-summation', enabled:false },
      { name:'INSTANT_DEMAND', match:'event/metering/instantaneous_demand', category: 'usage-instant', enabled:true },
      { name:'REMOTE_INSTANT_DEMAND', match:'remote/event/metering/instantaneous_demand', category:'usage-instant', enabled:false },

      { name:'REMOTE_REQUEST_SUMMATION', match:'remote/request/metering/summation/minute', enabled:false },
      { name:'REMOTE_RESPONSE_SUMMATION', match:'remote/response/metering/summation/minute/#', enabled:false },

      { name:'REMOTE_REQUEST_ANNOUNCE', match:'remote/request/announce', enabled:false },
      { name:'REMOTE_RESPOND_ANNOUNCE', match:'remote/response/announce/#', enabled:false },
      { name:'REMOTE_REQUEST_POLLING_MODE_SET', match:'remote/request/metering/polling_mode/set', enabled:false },
      { name:'REMOTE_REQUEST_CONFIGURE', match:'remote/request/metering/configure', enabled:false },
      { name:'REMOTE_RESPONSE_CONFIGURE', match:'remote/response/metering/configure', enabled:false },
      { name:'REMOTE_RESPONSE_POLLING_MODE_SET', match:'remote/response/metering/polling_mode/set', enabled:false },
      { name:'REMOTE_REQUEST_WIFI', match:'remote/request/wifi/current', enabled:false },
      { name:'REMOTE_RESPONSE_WIFI', match:'remote/response/wifi/current/#', enabled:false },
      { name:'REMOTE_REQUEST_TIMEZONE_SET', match:'remote/request/timezone/set', enabled:false },
      { name:'REMOTE_RESPONSE_TIMEZONE_SET', match:'remote/response/timezone/set', enabled:false },
      { name:'REMOTE_REQUEST_DEVICE_LIST', match:'remote/request/ha_device/device_list', enabled:false },
      { name:'REMOTE_RESPONSE_DEVICE_LIST', match:'remote/response/ha_device/device_list/#', enabled:false },
      { name:'REMOTE_REQUEST_ENLISTED_DEVICES', match:'remote/request/demand_response/enlisted_devices', enabled:false },
      { name:'REMOTE_RESPONSE_ENLISTED_DEVICES', match:'remote/response/demand_response/enlisted_devices', enabled:false },

      { name:'POLLING_MODE', match:'request/metering/polling_mode/get', enabled:false },
      { name:'POLLING_MODE_RESPONSE', match:'response/metering/polling_mode/get/ble_data2', enabled:false },
      { name:'HEARTBEAT_REQUEST', match:'request/diagnostics/heartbeat_stats', enabled:false },
      { name:'HEARTBEAT_RESPONSE', match:'response/diagnostics/heartbeat_stats/heartbeat273', enabled:false },
      { name:'ZIGBEE_DIAG', match:'event/diagnostics/zigbee', enabled:false },
      { name:'REMOTE_ZIGBEE_DIAG', match:'remote/event/diagnostics/zigbee', enabled:false },

      { name:'IS_APP_OPEN', match:'remote/request/is_app_open', enabled:false },
      { name:'REMOTE_RESPONSE_IS_APP_OPEN', match:'remote/response/is_app_open/#', enabled:false },

      { name:'EBAPI_POST_SUMMATIONS', match:'request/ebapi/post_minute_summations', enabled:false },
      { name:'EBAPI_POST_REALTIME', match:'request/ebapi/post_realtime', enabled:false },
      { name:'EBAPI_RESPONSE_SUMMATIONS', match:'response/ebapi/post_minute_summations/minute_summations274', enabled:false },
      { name:'EBAPI_RESPONSE_REALTIME', match:'response/ebapi/post_realtime/realtime275', enabled:false }
    ]
    return topicsArray;
  }
};
