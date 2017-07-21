var app = angular.module('myApp',['ngRoute','ngAnimate', 'ui.router']);

console.log('Hi');

var toggleNav = false;

window.addEventListener('resize', function()
{
  var width = document.body.clientWidth;
  if( width > 600 )
  {
    if( !( document.getElementById("myTopnav").className === "topnav" ) )
    {
      document.getElementById("myTopnav").className = "topnav";
      $("#myTopnav").css({height: '-=180px'});
      toggleNav = false;
    }
    
  }

}, false);

function myFunction() {
    
    if( !toggleNav )
      $("#myTopnav").animate({height: '+=180px'});
    else
      $("#myTopnav").animate({height: '-=180px'});

    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }

    toggleNav = !toggleNav;
    
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

app.directive('eatClickIf', ['$parse', '$rootScope',
  function($parse, $rootScope) {
    return {
      // this ensure eatClickIf be compiled before ngClick
      priority: 100,
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.eatClickIf);
        return {
          pre: function link(scope, element) {
            var eventName = 'click';
            element.on(eventName, function(event) {
              var callback = function() {
                if (fn(scope, {$event: event})) {
                  // prevents ng-click to be executed
                  event.stopImmediatePropagation();
                  // prevents href 
                  event.preventDefault();
                  return false;
                }
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          },
          post: function() {}
        }
      }
    }
  }
]);

app.service('fileUpload', [ '$http', function($http) {
    this.uploadFileToUrl = function(file, paramuser, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);
      //fd.append('user','vasudev89');
      return $http.post(uploadUrl, fd, {
        transformRequest : angular.identity,
        headers : {
          'Content-Type' : undefined,
          user : paramuser
        }
      }).then(function(response) {
        return response.data;
      }, function(errResponse) {
        console.error('Error while updating User');
        return "error";
      });
    }
  } ]);

app.config(function($stateProvider, $routeProvider){
	
  $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            templateUrl: 'form-profile.html'
        })
        
        // url will be /form/interests
        .state('form.interests', {
            templateUrl: 'form-interests.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            templateUrl: 'form-payment.html'
        });


	$routeProvider
	
	.when('/',{
		templateUrl : 'home.html',
		controller : 'indexController'
	})
  .when('/signup1',{
    templateUrl : 'signup1.html',
    controller : 'indexController'
  })
	.when('/home',{
		templateUrl : 'home.html',
		controller : 'homeController'
		
	})
	.when('/login',{
	
		templateUrl : 'c_user/login.html',
		controller  : 'UserController'
		
		
	})

  .when('/recipeadd',{
  
    templateUrl : 'recipe.html',
    controller  : 'RecipeController'
    
    
  })
	
})