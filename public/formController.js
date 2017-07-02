app.controller("formController",['$scope','$location','$window','$http','$state',function(  $scope , $location, $window, $http,$state){

	console.log('formController');

	$state.transitionTo('form.profile');
	
// we will store all of our form data in this object
    $scope.formData = {};

    $scope.formData.Username = '';
	$scope.UsernameError = false;
	$scope.UsernameTouched = false;
	$scope.ValidateUsername = function()
	{
		$scope.UsernameTouched = true;
		var reg = /^$/;
		$scope.UsernameError = reg.test( $scope.formData.Username );
		//$scope.CheckOverallError();
	}
	
	$scope.Email = '';
	$scope.EmailError = false;
	$scope.EmailTouched = false;
	$scope.ValidateEmail = function()
	{
		$scope.EmailTouched = true;
		var reg = /\S+@\S+\.\S+/;
		$scope.EmailError = !reg.test( $scope.Email );
		$scope.CheckOverallError();
	}

	$scope.Password = '';
	$scope.PasswordError = false;
	$scope.PasswordTouched = false;
	$scope.ValidatePassword = function()
	{
		$scope.PasswordTouched = true;
		var reg = /^.{8,20}$/;
		$scope.PasswordError = !reg.test( $scope.Password );
		$scope.ConfirmPasswordError = ( $scope.ConfirmPassword != $scope.Password );
		$scope.CheckOverallError();
	}

	$scope.ConfirmPassword = '';
	$scope.ConfirmPasswordError = false;
	$scope.ConfirmPasswordTouched = false;
	$scope.ValidateConfirmPassword = function()
	{
		$scope.ConfirmPasswordTouched = true;
		$scope.ConfirmPasswordError = ( $scope.ConfirmPassword != $scope.Password );
		$scope.CheckOverallError();
	}
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };

}]);