var app = angular.module('myApp',['ngRoute']);

console.log('Hi');

app.config(function($routeProvider){
	
	$routeProvider
	
	.when('/',{
		templateUrl : 'home.html',
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
  .when('/categoryShuffler',{
  
    templateUrl : 'categoryShuffler.html',
    controller  : 'categoryShufflerController'
    
    
  })
  .when('/signup',{
    templateUrl : 'signup.html',
    controller  : 'signupController'
  })
	.when('/logout',{
	
		templateUrl : '',
		controller  : ''
		
	})
	.when('/chat',{
	
		templateUrl : 'chat/chat.html',
		controller  : 'ChatController'
		
	})

	.when('/masterpage',{
	
		templateUrl : 'masterpage.html',
		controller  : 'masterPageController'
		
	})

	.when('/mediaspace',{
	
		templateUrl : 'mediaspace.html',
		controller  : 'mediaSpaceController'
		
	})
	
	.when('/chat/:secondUser',{
	
		templateUrl : 'chat/chat.html',
		controller  : 'ChatController'
		
	})
	
	.when('/groupchat',{
	
		templateUrl : 'groupchat/groupchat.html',
		controller  : 'GroupChatController'
		
	})
	
	
	.when('/aboutus',{
		templateUrl : 'aboutus.html'
	})
	.when('/friends',{
		templateUrl : 'friends/friend.html',
		controller  :  'FriendController'
	})
	.when('/friends/:secondUser',{
		templateUrl : 'friends/friend.html',
		controller  :  'FriendController'
	})
	.when('/searchUser',{
		templateUrl : 'c_user/searchUser.html',
		controller  :  'UserController'
	})
	.when('/jobs',{
		templateUrl : 'c_job/job.html',
		controller : 'JobController'
	})
	.when('/blogs',{
		templateUrl : 'blogs/blog.html',
		controller: 'BlogController'
	})
	.when('/blogs/:secondUser',{
		templateUrl : 'blogs/blog.html',
		controller: 'BlogController'
	})
	.when('/forums',{
		templateUrl : 'forums/forums.html',
		controller: 'ForumController'
	})
	.when('/forums/:secondUser',{
		templateUrl : 'forums/forums.html',
		controller: 'ForumController'
	})
	.when('/profile',{
		templateUrl : 'profile.html',
		controller: 'ProfileController'
	})
	.when('/profile/:secondUser',{
		templateUrl : 'profile/profile.html',
		controller: 'ProfileController'
	})
	.when('/createBlog',{
		templateUrl: 'c_blog/createBlog.html',
		controller: 'BlogController'
	})
	.when('/events',{
		templateUrl: 'c_event/listEvents.html',
	    controller: 'EventController'
	})
	
})