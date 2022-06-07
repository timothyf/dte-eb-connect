module.exports = {
  topics: function() {
    let topicsArray = [
      { name: 'all', match:"#", enabled:false },

      { name: 'announce', match:'announce', enabled:false },
      { name: 'clients', match:'clients/#', enabled:false },
      { name: 'event_all', match:'event/#', enabled:false },
      { name: 'remote_announce', match:'remote/announce', enabled:false },
      { name: 'device_announce', match:'device/?/announce', enabled:false },

      { name: 'usage_summation', match:'summation',category: 'usage-summation', enabled:false },
      { name: 'remote_summation', match:'remote/summation', category: 'usage-summation', enabled:false },
      { name: 'event_metering', match:'event/metering/#', category:'usage-summation', enabled:false },
      { name: 'event_usage_summation', match:'event/metering/summation/minute', category:'usage-summation', enabled:false },
      { name: 'remote_summation_min', match:'remote/event/metering/summation/minute', category:'usage-summation', enabled:false },
      { name: 'event_usage_instant', match:'event/metering/instantaneous_demand', category: 'usage-instant', enabled:false },
      { name: 'remote_instant', match:'remote/event/metering/instantaneous_demand', category:'usage-instant', enabled:false },

      { name: 'remote_request_summation', match:'remote/request/metering/summation/minute', enabled:false },
      { name: 'remote_response_summation', match:'remote/response/metering/summation/minute/#', enabled:false },

      { name: '', match:'remote/request/announce', enabled:false },
      { name: '', match:'remote/response/announce/#', enabled:false },
      { name: '', match:'remote/request/metering/polling_mode/set', enabled:false },
      { name: '', match:'remote/request/metering/configure', enabled:false },
      { name: '', match:'remote/response/metering/configure', enabled:false },
      { name: '', match:'remote/response/metering/polling_mode/set', enabled:false },
      { name: '', match:'remote/request/wifi/current', enabled:false },
      { name: '', match:'remote/response/wifi/current/#', enabled:false },
      { name: '', match:'remote/request/timezone/set', enabled:false },
      { name: '', match:'remote/response/timezone/set', enabled:false },
      { name: '', match:'remote/request/ha_device/device_list', enabled:false },
      { name: '', match:'remote/response/ha_device/device_list/#', enabled:false },
      { name: '', match:'remote/request/demand_response/enlisted_devices', enabled:false },
      { name: '', match:'remote/response/demand_response/enlisted_devices', enabled:false },

      { name: '', match:'request/metering/polling_mode/get', enabled:false },
      { name: '', match:'response/metering/polling_mode/get/ble_data2', enabled:false },
      { name: '', match:'request/diagnostics/heartbeat_stats', enabled:false },
      { name: '', match:'response/diagnostics/heartbeat_stats/heartbeat273', enabled:false },
      { name: '', match:'event/diagnostics/zigbee', enabled:false },
      { name: '', match:'remote/event/diagnostics/zigbee', enabled:false },

      { name: '', match:'remote/request/is_app_open', enabled:false },
      { name: '', match:'remote/response/is_app_open/#', enabled:false },

      { name: '', match:'request/ebapi/post_minute_summations', enabled:false },
      { name: '', match:'request/ebapi/post_realtime', enabled:false },
      { name: '', match:'response/ebapi/post_minute_summations/minute_summations274', enabled:false },
      { name: '', match:'response/ebapi/post_realtime/realtime275', enabled:false }
    ]
    return topicsArray;
  }
};
