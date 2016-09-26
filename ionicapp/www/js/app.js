angular.module('ionicApp', ['ionic', 'ionicApp.services', 'ionicApp.controllers', 'chart.js', 'ngCordova'])

.run(function($ionicPlatform, dataService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.backgroundMode) {
      document.addEventListener('deviceready', function () {
        cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
        // Enable background mode
        cordova.plugins.backgroundMode.enable();

        // Called when background mode has been activated
        cordova.plugins.backgroundMode.onactivate = function () {
          setTimeout(function () {
            // Modify the currently displayed notification
            dataService.background_mode();
          }, 5000);
        }
      }, false);
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'DashCtrl'
        }
      }
    })
    .state('tabs.location', {
      url: "/dash-location",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-location.html"
        }
      }
    })
    // Dashboard Soil.
    .state('tabs.dash-soil', {
      url: "/dash-soil",
      views: {
        'home-tab': {
          templateUrl: "templates/tab-dash-soil.html",
          controller: 'SoilCtrl',
        }
      }
    })
    // Soil Moisture
    .state('tabs.soil-moisture', {
      url: "/soil-moisture",
      views: {
        'soil_moisture-tab': {
          templateUrl: "templates/soil-moisture.html",
          controller: 'SoilCtrl',
        }
      }
    })
    .state('tabs.dash-light', {
      url: "/dash-light",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-light.html"
        }
      }
    })
    .state('tabs.dash-prj-addnew', {
      url: "/dash-prj-addnew",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-prj-addnew.html"
        }
      }
    })
    .state('tabs.dash-temp', {
      url: "/dash-temp",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-temp.html"
        }
      }
    })
    .state('tabs.dash-prj-list', {
      url: "/dash-prj-list",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-prj-list.html"
        }
      }
    })
     .state('tabs.dash-prj1-detail', {
      url: "/dash-prj1-detail",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-prj1-detail.html",
          controller: 'ProjectDetailCtrl',
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "templates/facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
        }
      }
    })
    .state('tabs.chart', {
      url: "/chart",
      views: {
        'chart-tab': {
          templateUrl: "templates/dash-soil.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

});
