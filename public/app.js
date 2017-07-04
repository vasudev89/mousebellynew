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
	
})