app.controller("formController",['$scope','$location','$window','$http','$state',function(  $scope , $location, $window, $http,$state){

	console.log('formController');

	$state.transitionTo('form.profile');
	
// we will store all of our form data in this object
    $scope.formData = {};

    $scope.Part1Errors = true;

	$scope.ShowPart1Errors = function()
	{
		var flag = false;
		if($scope.UsernameTouched == false) 
		{
			$scope.UsernameError = true;
			flag = true;

			$('#signupErrorModal').modal('show');
		}
			

		return flag;
	}

    $scope.CheckPart1Errors = function()
    {
    	$scope.Part1Errors = !( 
    							($scope.UsernameInDBValid ==  true)
    							&&
    							($scope.UsernameError == false)
    							&&
								($scope.UsernameTouched == true)
								&&
								($scope.EmailInDBValid ==  true)
    							&&
    							($scope.EmailError == false)
    							&&
								($scope.EmailTouched == true)
								&&
    							($scope.PasswordError == false)
    							&&
								($scope.PasswordTouched == true)
								&&
    							($scope.ConfirmPasswordError == false)
    							&&
								($scope.ConfirmPasswordTouched == true)
								&&
								($scope.PhoneInDBValid ==  true)
    							&&
    							($scope.PhoneError == false)
    							&&
								($scope.PhoneTouched == true)
								&&
    							($scope.DOBError == false)
    							&&
								($scope.DOBTouched == true)
    						  );
    	
    }

    $scope.Part2Errors = true;

    $scope.CheckPart2Errors = function()
    {

    }

    $scope.formData.Username = '';
	$scope.UsernameError = false;
	$scope.UsernameTouched = false;
	$scope.ValidateUsername = function()
	{
		$scope.UsernameInDBValid = false;
		$scope.UsernameInDBInvalid = false;

		$scope.UsernameTouched = true;
		var reg = /^.[a-zA-Z0-9_ ]{2,}$/;
		$scope.UsernameError = !reg.test( $scope.formData.Username );

		$scope.formData.Username = $scope.formData.Username.toProperCase();
		$scope.CheckPart1Errors();
	}

	$scope.UsernameInDBValid = false;
	$scope.UsernameInDBInvalid = false;

	$scope.CheckUsernameInDB = function()
	{
		if( $scope.formData.Username != undefined && $scope.formData.Username != '' )
		{
			$("#checkusernameinDBloader").fadeIn(1500);

			$scope.UsernameInDBValid = false;
			$scope.UsernameInDBInvalid = false;

			var json={"Username":$scope.formData.Username};

			console.log(json);

			$http({
			        url: '/checkusernameindb',
			        method: "POST",
			        data: json,
			        json: true,
			        headers: {
						        "content-type": "application/json",  // <--Very important!!!
						    }
			    })
		    .then(function(response) {
		            
		            $("#checkusernameinDBloader").fadeOut(500);

		            if( response.data.message == 'Username In Use' )
		            	$scope.UsernameInDBInvalid = true;
		            else if ( response.data.message == 'Username Available' )
		            	$scope.UsernameInDBValid = true;

		            $scope.CheckPart1Errors();

		    }, 
		    function(response) { // optional
		            console.log( "Failed" );
		            $("#checkusernameinDBloader").fadeOut(500);
		    });
		}
	}
	
	$scope.formData.Email = '';
	$scope.EmailError = false;
	$scope.EmailTouched = false;
	$scope.ValidateEmail = function()
	{
		$scope.EmailInDBValid = false;
		$scope.EmailInDBInvalid = false;
		
		$scope.EmailTouched = true;
		var reg = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.*[a-zA-Z0-9_]+$/;
		$scope.EmailError = !reg.test( $scope.formData.Email );
		//$scope.CheckOverallError();
		$scope.CheckPart1Errors();
	}

	$scope.EmailInDBValid = false;
	$scope.EmailInDBInvalid = false;

	$scope.CheckEmailInDB = function()
	{
		if( $scope.formData.Email != undefined && $scope.formData.Email != '' )
		{
			$("#checkemailinDBloader").fadeIn(1500);

			$scope.EmailInDBValid = false;
			$scope.EmailInDBInvalid = false;

			var json={"Email":$scope.formData.Email};

			console.log(json);

			$http({
			        url: '/checkemailindb',
			        method: "POST",
			        data: json,
			        json: true,
			        headers: {
						        "content-type": "application/json",  // <--Very important!!!
						    }
			    })
		    .then(function(response) {
		            
		            $("#checkemailinDBloader").fadeOut(500);

		            if( response.data.message == 'Email In Use' )
		            	$scope.EmailInDBInvalid = true;
		            else if ( response.data.message == 'Email Available' )
		            	$scope.EmailInDBValid = true;


		            $scope.CheckPart1Errors();
		    }, 
		    function(response) { // optional
		            console.log( "Failed" );
		            $("#checkemailinDBloader").fadeOut(500);
		    });
		}
		
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
		$scope.CheckPart1Errors();
	}

	$scope.formData.ConfirmPassword = '';
	$scope.ConfirmPasswordError = false;
	$scope.ConfirmPasswordTouched = false;
	$scope.ValidateConfirmPassword = function()
	{
		$scope.ConfirmPasswordTouched = true;
		$scope.ConfirmPasswordError = ( $scope.formData.ConfirmPassword != $scope.formData.Password );
		//$scope.CheckOverallError();
		$scope.CheckPart1Errors();
	}

	$scope.formData.Phone = '';
	$scope.PhoneError = false;
	$scope.PhoneTouched = false;
	$scope.ValidatePhone = function()
	{
		$scope.PhoneInDBValid = false;
		$scope.PhoneInDBInvalid = false;

		$scope.PhoneTouched = true;
		var reg = /^[7-9][0-9]{9}$/;
		$scope.PhoneError = !reg.test( $scope.formData.Phone );
		//$scope.CheckOverallError();
		$scope.CheckPart1Errors();
	}

	$scope.PhoneInDBValid = false;
	$scope.PhoneInDBInvalid = false;

	$scope.CheckPhoneInDB = function()
	{
		if( $scope.formData.Phone != undefined && $scope.formData.Phone != '' )
		{
			$("#checkphoneinDBloader").fadeIn(1500);

			$scope.PhoneInDBValid = false;
			$scope.PhoneInDBInvalid = false;

			var json={"Phone":$scope.formData.Phone};

			console.log(json);

			$http({
			        url: '/checkphoneindb',
			        method: "POST",
			        data: json,
			        json: true,
			        headers: {
						        "content-type": "application/json",  // <--Very important!!!
						    }
			    })
		    .then(function(response) {
		            
		            $("#checkphoneinDBloader").fadeOut(500);

		            if( response.data.message == 'Phone In Use' )
		            	$scope.PhoneInDBInvalid = true;
		            else if ( response.data.message == 'Phone Available' )
		            	$scope.PhoneInDBValid = true;

		            $scope.CheckPart1Errors();

		    }, 
		    function(response) { // optional
		            console.log( "Failed" );
		            $("#checkphoneinDBloader").fadeOut(500);
		    });
		}
		
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
		
		if( parseInt(diffDays/365) < 18 || parseInt(diffDays/365) > 80 )
			$scope.DOBError = true;
		else
			$scope.DOBError = false;
		//$scope.CheckOverallError();

		$scope.CheckPart1Errors();
	}

    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };

}]);