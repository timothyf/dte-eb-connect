module.exports = {
  topics: function() {
    let topicsArray = [
      { match:"#", enabled:false },
      
      { match:'announce', enabled:false },
      { match:'clients/#', enabled:false },
      { match:'event/#', enabled:false },
      { match:'remote/announce', enabled:false },
      { match:'device/?/announce', enabled:false },

      { match:'summation', category: 'usage-summation', enabled:true },
      { match:'remote/summation', category: 'usage-summation', enabled:false },
      { match:'event/metering/summation/minute', category:'usage-summation', enabled:false },
      { match:'remote/event/metering/summation/minute', category:'usage-summation', enabled:false },
      { match:'event/metering/instantaneous_demand', category: 'usage-instant', enabled:true },
      { match:'remote/event/metering/instantaneous_demand', category:'usage-instant', enabled:false },

      { match:'remote/request/metering/summation/minute', enabled:false },
      { match:'remote/response/metering/summation/minute/#', enabled:false },

      { match:'remote/request/announce', enabled:false },
      { match:'remote/response/announce/#', enabled:false },
      { match:'remote/request/metering/polling_mode/set', enabled:false },
      { match:'remote/request/metering/configure', enabled:false },
      { match:'remote/response/metering/configure', enabled:false },
      { match:'remote/response/metering/polling_mode/set', enabled:false },
      { match:'remote/request/wifi/current', enabled:false },
      { match:'remote/response/wifi/current/#', enabled:false },
      { match:'remote/request/timezone/set', enabled:false },
      { match:'remote/response/timezone/set', enabled:false },
      { match:'remote/request/ha_device/device_list', enabled:false },
      { match:'remote/response/ha_device/device_list/#', enabled:false },
      { match:'remote/request/demand_response/enlisted_devices', enabled:false },
      { match:'remote/response/demand_response/enlisted_devices', enabled:false },

      { match:'request/metering/polling_mode/get', enabled:false },
      { match:'response/metering/polling_mode/get/ble_data2', enabled:false },
      { match:'request/diagnostics/heartbeat_stats', enabled:false },
      { match:'response/diagnostics/heartbeat_stats/heartbeat273', enabled:false },
      { match:'event/diagnostics/zigbee', enabled:false },
      { match:'remote/event/diagnostics/zigbee', enabled:false },

      { match:'remote/request/is_app_open', enabled:false },
      { match:'remote/response/is_app_open/#', enabled:false },

      { match:'request/ebapi/post_minute_summations', enabled:false },
      { match:'request/ebapi/post_realtime', enabled:false },
      { match:'response/ebapi/post_minute_summations/minute_summations274', enabled:false },
      { match:'response/ebapi/post_realtime/realtime275', enabled:false }
    ]
    return topicsArray;
  }
};
