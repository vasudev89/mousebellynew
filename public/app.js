var app = angular.module('myApp',["kendo.directives",'ngRoute','ngAnimate', 'ui.router','ui.calendar','oc.lazyLoad',"ngMaterial", "materialCalendar"]);

function Start() {

   var OldHtml = window.jQuery.fn.html;

   window.jQuery.fn.html = function () {

     var EnhancedHtml = OldHtml.apply(this, arguments);

     if (arguments.length && EnhancedHtml.find('.MyClass').length) {

         var TheElementAdded = EnhancedHtml.find('.MyClass'); //there it is

         var TheElementAdded1 = EnhancedHtml.find('.MyClass1');

          console.log( TheElementAdded.length )

          window.setTimeout(function(){
            TheElementAdded.css(
            { "width":"200px" ,
              "height":"200px" , 
              "border-radius": "100%",
              "line-height": "200px",
              "font-size": "50px",
              "margin": "auto", 
              "text-align": "center",
              "background-color": "none",
              "border": "5px solid #333333",
              "border-bottom": "5px solid #3498db",
              "animation": "rota "+TheElementAdded.attr("total-time")+"s linear infinite"
            });

            console.log( TheElementAdded1 );

            TheElementAdded1.css(
            { 
              "position" : "relative",
              "top":"-400px",
              "width":"200px" ,
              "border":"1px solid blue",
              "height":"200px" , 
              "font-size": "50px",
              "text-align": "center",
              "background-color": "none"
              
            });

            console.log( TheElementAdded.attr("total-time") );  
            console.log( TheElementAdded.attr("border-top-length") );  
            console.log( TheElementAdded.attr("border-bottom-length") );  
            console.log( TheElementAdded );
          },200);
          
          
     }

     return EnhancedHtml;
   }
}

$(Start);

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

app.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });

                });
            };

            return {
                link: fn_link
            }
        } ]);

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