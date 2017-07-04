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
		var reg = /^.[a-zA-Z0-9_ ]{2,}$/;
		$scope.UsernameError = !reg.test( $scope.formData.Username );

		$scope.formData.Username = $scope.formData.Username.toProperCase();
		//$scope.CheckOverallError();
	}
	
	$scope.formData.Email = '';
	$scope.EmailError = false;
	$scope.EmailTouched = false;
	$scope.ValidateEmail = function()
	{
		$scope.EmailTouched = true;
		var reg = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.*[a-zA-Z0-9_]+$/;
		$scope.EmailError = !reg.test( $scope.formData.Email );
		//$scope.CheckOverallError();
	}

	$scope.formData.Password = '';
	$scope.PasswordError = false;
	$scope.PasswordTouched = false;
	$scope.ValidatePassword = function()
	{
		$scope.PasswordTouched = true;
		var reg = /^.{8,20}$/;
		$scope.PasswordError = !reg.test( $scope.formData.Password );
		$scope.ConfirmPasswordError = ( $scope.formData.ConfirmPassword != $scope.formData.Password );
		//$scope.CheckOverallError();
	}

	$scope.formData.ConfirmPassword = '';
	$scope.ConfirmPasswordError = false;
	$scope.ConfirmPasswordTouched = false;
	$scope.ValidateConfirmPassword = function()
	{
		$scope.ConfirmPasswordTouched = true;
		$scope.ConfirmPasswordError = ( $scope.formData.ConfirmPassword != $scope.formData.Password );
		//$scope.CheckOverallError();
	}

	$scope.formData.Phone = '';
	$scope.PhoneError = false;
	$scope.PhoneTouched = false;
	$scope.ValidatePhone = function()
	{
		$scope.PhoneTouched = true;
		var reg = /^[7-9][0-9]{9}$/;
		$scope.PhoneError = !reg.test( $scope.formData.Phone );
		//$scope.CheckOverallError();
	}
    
	$scope.formData.Gender = 'Female';

    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };

}]);