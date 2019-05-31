module.exports = {
  topics: function() {
    let topicsArray = [
      { name:'ALL', match:"#", enabled:true },
      { name:'ANNOUNCE', match:'announce', enabled:false, parser:'parseAnnounce' },
      { name:'CLIENTS', match:'clients/#', enabled:false },
      { name:'EVENTS', match:'event/#', enabled:false },
      { name:'REMOTE_ANNOUNCE', match:'remote/announce', enabled:false, parser:'parseAnnounce' },
      { name:'DEVICE_ANNOUNCE', match:'device/?/announce', enabled:false, parser:'parseAnnounce' },

      { name:'SUMMATION', match:'summation', enabled:false },
      { name:'REMOTE_SUMMATION', match:'remote/summation', enabled:false },
      { name:'EVENT_METERING', match:'event/metering/#', enabled:false },
      { name:'ZIGBEE_METERING', match:'_zigbee_metering/#', enabled:false },
      { name:'MINUTE_SUMMATION', match:'event/metering/summation/minute', enabled:false },
      { name:'REMOTE_MINUTE_SUMMATION', match:'remote/event/metering/summation/minute', enabled:false },
      { name:'INSTANT_DEMAND', match:'event/metering/instantaneous_demand', enabled:false },
      { name:'INSTANT_DEMAND_ZIGBEE', match:'_zigbee_metering/event/metering/instantaneous_demand', enabled:false },

      { name:'POLLING_MODE', match:'request/metering/polling_mode/get', enabled:false },
      { name:'POLLING_MODE_RESPONSE', match:'response/metering/polling_mode/get/ble_data2', enabled:false },
      { name:'HEARTBEAT_REQUEST', match:'request/diagnostics/heartbeat_stats', enabled:false },
      { name:'HEARTBEAT_RESPONSE', match:'response/diagnostics/heartbeat_stats/heartbeat273', enabled:false },
      { name:'ZIGBEE_DIAG', match:'event/diagnostics/zigbee', enabled:false },
      { name:'REMOTE_ZIGBEE_DIAG', match:'remote/event/diagnostics/zigbee', enabled:false },

      { name:'IS_APP_OPEN', match:'remote/request/is_app_open', enabled:false },
      { name:'IS_APP_OPEN_ZIGBEE', match:'_zigbee_metering/request/is_app_open', enabled:false },
      { name:'IS_APP_OPEN_RESPONSE', match:'_zigbee_metering/response/is_app_open/#', enabled:false },
      { name:'METERING_RESPONSE', match:'_zigbee_metering/response/#', enabled:false },

      { name:'EBAPI_POST_SUMMATIONS', match:'request/ebapi/post_minute_summations', enabled:false },
      { name:'EBAPI_POST_REALTIME', match:'request/ebapi/post_realtime', enabled:false },
      { name:'EBAPI_RESPONSE_SUMMATIONS', match:'response/ebapi/post_minute_summations/minute_summations274', enabled:false },
      { name:'EBAPI_RESPONSE_REALTIME', match:'response/ebapi/post_realtime/realtime275', enabled:false }
    ]
    return topicsArray;
  }
};
