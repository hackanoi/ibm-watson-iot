angular.module('ionicApp.services', [])

// Bindling data.
.factory('dataService', function($http){
  var dataTest = [{
    "temp":20.613,
    "humidity":60.232,
    "soilmoisture":28.412,
    "light":63.093,
    "time":1458802675
  }, {
    "temp":20.613,
    "humidity":60.232,
    "soilmoisture":38.412,
    "light":63.093,
    "time":1458889075
  }, {
    "temp":20.613,
    "humidity":60.232,
    "soilmoisture":78.412,
    "light":63.093,
    "time":1458975475
  }, {
    "temp":20.613,
    "humidity":60.232,
    "soilmoisture":68.412,
    "light":63.093,
    "time":1459061875
  }, {
    "temp":20.613,
    "humidity":60.232,
    "soilmoisture":58.412,
    "light":63.093,
    "time":1459148275
  }, {
    "temp":20.613,
    "humidity":60.232,
    "soilmoisture":40.412,
    "light":63.093,
    "time":1459234675
  }];

  return {
    all: function() {
      return $http.get("http://agtech.mybluemix.net/api/sensors?start=123213&end=234324")
    },
    soilData: function() {
      return dataTest;
    },
    pump_on: function() {
      return $http.get("http://agtech.mybluemix.net/api/command/pumpon")
    },
    pump_off: function() {
      return $http.get("http://agtech.mybluemix.net/api/command/pumpoff")
    },
    background_mode: function() {
      return $http.get("http://agtech.mybluemix.net/api/crontask")
    }
  }
});
