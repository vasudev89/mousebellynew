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
		var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}/;
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

	$scope.formData.DOB = '';
	$scope.DOBError = false;
	$scope.DOBTouched = false;
	$scope.ValidateDOB = function()
	{
		$scope.DOBTouched = true;
		//$scope.formData.DOB = new Date( $scope.formData.DOB );

		var date1 = new Date( $scope.formData.DOB );
		
		var date2 = new Date(  );
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		
		if( parseInt(diffDays/365) < 18 || parseInt(diffDays/365) > 60 )
			$scope.DOBError = true;
		else
			$scope.DOBError = false;
		//$scope.CheckOverallError();
	}

    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };

}]);