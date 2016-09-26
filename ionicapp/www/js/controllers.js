angular.module('ionicApp.controllers', [])

.controller('SoilCtrl', function($scope, dataService, $filter){
  // Soil Dashboard
  $datas_soil = dataService.soilData();
  $scope.labels = [];
  $scope.tmp = [];
  angular.forEach($datas_soil, function ($data_soil, key) {
    $scope.labels.push($data_soil.time);
    $scope.tmp.push($data_soil.soilmoisture);
  });
  $scope.data = [];
  $scope.data.push($scope.tmp);
  $scope.$on("create", function(evt, chart) {
    var points = chart.datasets[0].points;
    angular.forEach(points, function (point, key) {
      if (point.value > 60) {
        chart.datasets[0].points[key].fillColor = "red";
      } else if (point.value == 40) {
        chart.datasets[0].points[key].fillColor = "yellow";
      }
    });
    chart.update();
  });

  // Soil Moisture
  $scope.soilvalue = 0;
  dataService.all().then(function(res){
    var tmp = res.data;
    $scope.soilvalue = (tmp.soilmoisture*1).toFixed(1);
  });

  // Turn on pump
  $scope.pumpOn = function() {
    dataService.pump_on().then(function(res){
      dataService.pump_on();
    });
  }

  // Turn off pump
  $scope.pumpOff = function() {
    dataService.pump_off().then(function(res){
      dataService.pump_off().then(function(res){
        dataService.pump_off();
      });
    });
  }
})

.controller('DashCtrl', function($scope, dataService) {
  $scope.sensors = {};
  dataService.all().then(function(res){
    var tmp = res.data;
    tmp.soilmoisture = (tmp.soilmoisture*1).toFixed(1);
    tmp.temp = (tmp.temp*1).toFixed(1);
    tmp.humidity = (tmp.humidity*1).toFixed(1);
    tmp.light = (tmp.light*1).toFixed(1);
    $scope.sensors = tmp;
  });

  $scope.updateDashboard = function(){
    dataService.all().then(function(res){
      var tmp = res.data;
      tmp.soilmoisture = (tmp.soilmoisture*1).toFixed(1);
      tmp.temp = (tmp.temp*1).toFixed(1);
      tmp.humidity = (tmp.humidity*1).toFixed(1);
      tmp.light = (tmp.light*1).toFixed(1);
      $scope.sensors = tmp;
    });
    $scope.$broadcast('scroll.refreshComplete');
  };

})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
.controller('ProjectDetailCtrl', function($scope, $cordovaCamera, $cordovaFileTransfer, $ionicLoading){

  // Take photo
  $scope.takePicture = function(){
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        // An error occured. Show a message to the user
    });
  };

  // Choose photo from device.
  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        // An error occured. Show a message to the user
    });
  }

  // Upload photo.
  /*$scope.uploadPhoto = function() {
    $ionicLoading.show({template: 'Sto inviando la foto...'});
    var fileURL = $scope.imgURI;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;

    var params = {};
    params.value1 = "someparams";
    params.value2 = "otherparams";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://www.yourdomain.com/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
    $ionicLoading.hide();}, options);
  }*/
});
