app.controller("formController",['$scope','$location','$window','$http','$state','fileUpload',function(  $scope , $location, $window, $http,$state,$fileUpload){

	console.log('formController');

	$state.transitionTo('form.profile');
	
// we will store all of our form data in this object
    $scope.formData = {};

    $scope.Part1Errors = true;
    $scope.Part1Filled = false;

	$scope.ShowPart1Errors = function()
	{
		if($scope.Part1Errors)
			$('#signupErrorModal').modal('show');
		else
			$scope.Part1Filled = true;
		
		console.log( targetImage );

		console.log( $scope.imageLoaded );

		if( targetImage != undefined )
		{
			$scope.imageLoaded = true;

			window.setTimeout(function(){
				$('#imageLoaded').attr('src', targetImage);
			},500);
			
		}

		if( $scope.Part2Errors == false )
		{
			var searchString = $scope.formData.Locality + ", " + $scope.formData.City + ", " + $scope.formData.State + ", " + $scope.formData.Zipcode + ", " +  $scope.formData.Country;

    		console.log( searchString );

    		$http.get('http://maps.google.com/maps/api/geocode/json?address='+searchString+'&sensor=false')
		    	.then(function(mapData) {
			      	try
			      	{
			      		console.log( mapData.data.results[0].geometry.location );



			      		window.setTimeout(function(){

			      			//var myLatLng = new google.maps.LatLng(-25.363882,131.044922);

			      			latLng = new google.maps.LatLng( mapData.data.results[0].geometry.location.lat , mapData.data.results[0].geometry.location.lng)
							  var mapOptions = {
							    center: latLng,
							    zoom: 16,
							    mapTypeId: google.maps.MapTypeId.ROADMAP
							  };
							  var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

							  var marker = new google.maps.Marker({
							      position: latLng,
							      title:"Hello World!",
							      visible: true
							  });
							  marker.setMap(map);

			      		},500);

			      		
			      	}
			      	catch(e)
			      	{
			      		console.log(e);
			      	}

			      	
			    });
		}
				

		return $scope.Part1Errors;
	}

	$scope.ShowPart2Errors = function()
	{
		if($scope.Part2Errors)
			$('#signupErrorModal').modal('show');
		
		console.log('Part 2');

		


		return $scope.Part2Errors;
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
		if( $scope.formData.Username != undefined && $scope.formData.Username != '' && $scope.UsernameError != true )
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
		if( $scope.formData.Email != undefined && $scope.formData.Email != '' && $scope.EmailError != true )
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
		if( $scope.formData.Phone != undefined && $scope.formData.Phone != '' && $scope.PhoneError != true )
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

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	$scope.formData.Street = '';
	$scope.StreetError = false;
	$scope.StreetTouched = false;
	$scope.ValidateStreet = function()
	{
		$scope.StreetTouched = true;
		var reg = /^$/;
		$scope.StreetError = reg.test( $scope.formData.Street );
		$scope.CheckPart2Errors();
	}

	$scope.formData.Locality = '';
	$scope.LocalityError = false;
	$scope.LocalityTouched = false;
	$scope.ValidateLocality = function()
	{
		$scope.LocalityTouched = true;
		var reg = /^$/;
		$scope.LocalityError = reg.test( $scope.formData.Locality );
		$scope.CheckPart2Errors();
	}

	$scope.formData.City = '';
	$scope.CityError = false;
	$scope.CityTouched = false;
	$scope.ValidateCity = function()
	{
		$scope.CityTouched = true;
		var reg = /^$/;
		$scope.CityError = reg.test( $scope.formData.City );
		$scope.CheckPart2Errors();
	}

	$scope.formData.State = '';
	$scope.StateError = false;
	$scope.StateTouched = false;
	$scope.ValidateState = function()
	{
		$scope.StateTouched = true;
		var reg = /^$/;
		$scope.StateError = reg.test( $scope.formData.State );
		$scope.CheckPart2Errors();
	}

	$scope.formData.Country = 'India';

	$scope.formData.Zipcode = '';
	$scope.ZipcodeError = false;
	$scope.ZipcodeTouched = false;
	$scope.ValidateZipcode = function()
	{
		$scope.ZipcodeTouched = true;
		var reg = /^[0-9]{6,6}$/;
		$scope.ZipcodeError = !reg.test( $scope.formData.Zipcode );
		$scope.CheckPart2Errors();
	}

	$scope.Part2Errors = true;

	$scope.location = undefined;

    $scope.CheckPart2Errors = function()
    {
    	console.log('Part 2 Errors');
    	$scope.Part2Errors = !( 
    							($scope.StreetError == false)
    							&&
								($scope.StreetTouched == true)
								&&
								($scope.LocalityError == false)
    							&&
								($scope.LocalityTouched == true)
								&&
    							($scope.CityError == false)
    							&&
								($scope.CityTouched == true)
								&&
    							($scope.StateError == false)
    							&&
								($scope.StateTouched == true)
								&&
								($scope.ZipcodeError == false)
    							&&
								($scope.ZipcodeTouched == true)
								
    						  );

    	if( !$scope.Part2Errors )
    	{
    		var searchString = $scope.formData.Locality + ", " + $scope.formData.City + ", " + $scope.formData.State + ", " + $scope.formData.Zipcode + ", " +  $scope.formData.Country;

    		console.log( searchString );

    		$http.get('http://maps.google.com/maps/api/geocode/json?address='+searchString+'&sensor=false')
		    	.then(function(mapData) {
			      	try
			      	{
			      		console.log( mapData.data.results[0].geometry.location );



			      		window.setTimeout(function(){

			      			//var myLatLng = new google.maps.LatLng(-25.363882,131.044922);

			      			latLng = new google.maps.LatLng( mapData.data.results[0].geometry.location.lat , mapData.data.results[0].geometry.location.lng)
							  var mapOptions = {
							    center: latLng,
							    zoom: 16,
							    mapTypeId: google.maps.MapTypeId.ROADMAP
							  };
							  var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

							  var marker = new google.maps.Marker({
							      position: latLng,
							      title:"Hello World!",
							      visible: true
							  });
							  marker.setMap(map);

			      		},500);

			      		
			      	}
			      	catch(e)
			      	{
			      		console.log(e);
			      	}

			      	
			    });	
    	}
    }

    $scope.imageLoaded = false;

    var targetImage = undefined;

    $scope.setFile = function(e)
		{
			console.log( e.files );
			$scope.imageLoaded = false;

			for (var i = 0; i < e.files.length; i++) {
                //$scope.filesforupload.push(e.files[i])
                
                var reader = new FileReader();
                
                reader.onload = function(event)
    			{
                	//console.log( event.target);
                	
                	window.setTimeout(function(){
                	
                		console.log( 'File Read' );
                		console.log( $scope.imageLoaded );

                		if( event.target.result.indexOf("image/jpeg") != -1 || event.target.result.indexOf("image/png") != -1 )
                		{
                			$scope.$apply( $scope.imageLoaded = true );
                			targetImage = event.target.result;
                			$('#imageLoaded').attr('src', event.target.result);

       //          			$scope.$apply( $scope.filesforupload.push({"ImageUrl": event.target.result , "Status" : "valid" , "index": new String( event.target.result.toString() ).hashCode() , "UploadStatus" : "Uploading" }) );

       //          			//
       //          			var json = {
							// 	Email : $scope.currentUser.Email,
							// 	file : event.target.result,
							// 	id : new String( event.target.result.toString() ).hashCode(),
							// 	Type : $scope.currentUser.Type
							// };

							// $scope.stateDisabled = true;
							// showMasterProgress(true);

			    // 			$http({
						 //        url: '/uploadMediaSpaceImage',
						 //        method: "POST",
						 //        data: json,
						 //        json: true,
						 //        headers: {
							// 		        "content-type": "application/json",  // <--Very important!!!
							// 		    }
						 //    })
						 //    .then(function(response) {
						            
						 //    		if( response.data.message == 'Media Space Image Upload Failure' )
						 //            {
						 //            	$scope.fileUploadcount++;

						 //            	var index = response.data.Data.index;

						 //            	for( var i = 0 ; i < $scope.filesforupload.length ; i++ )
						 //            	{
						 //            		if( $scope.filesforupload[i].index == index )
						 //            		{
						 //            			$scope.filesforupload[i].UploadStatus = "Failed";
						 //            			break;
						 //            		}
						 //            	}
						 //            }
						 //            else if( response.data.message == 'Media Space Image Upload Success' )
						 //            {
						 //            	$scope.fileUploadcount++;

						 //            	var index = response.data.Data.index;

						 //            	for( var i = 0 ; i < $scope.filesforupload.length ; i++ )
						 //            	{
						 //            		if( $scope.filesforupload[i].index == index )
						 //            		{

						 //            			$scope.filesforupload.splice( i, 1);
						            			
						 //            			$scope.mediaspace.push( {"url": response.data.Data.url , "valuechecked" : false });

						 //            			break;
						 //            		}
						 //            	}

						 //            	if( $scope.fileUploadcount == e.files.length )
						 //            		showSnackBar('Media Space Upload Success','Green');

						 //            }

						 //            $scope.stateDisabled = false;
							// 		showMasterProgress(false);
						 //    }, 
						 //    function(response) { // optional
						 //            $scope.imageUpload = false;
							// 		$scope.stateDisabled = false;
							// 		showMasterProgress(false);
							// 		showSnackBar('Profile Pic Update Failure','Red');
						 //    });
                			//
                		}
                		else
                		{
                			$scope.$apply( $scope.filesforupload.push({"ImageUrl": event.target.result , "Status" : "invalid" , "index":  new String( event.target.result.toString() ).hashCode() , "UploadStatus" : "invalid" }) );
                			console.log( 'error' )
                		}
                		
                		
                	},100);
                	
    	  		};
    	  		
    	  		reader.readAsDataURL(e.files[i]);
            }

            
		};

    $scope.openFileChooser = function()
	{
		$('#trigger').trigger('click');
	};


    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };


    $scope.LoadPart2 = function()
    {
    	// $http.get('http://maps.google.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false')
    	// .then(function(mapData) {
	    //   	console.log( mapData.data.results[0].geometry.location )

	    //   	try
	    //   	{
	    //   		window.setTimeout(function(){

	    //   			//var myLatLng = new google.maps.LatLng(-25.363882,131.044922);

	    //   			latLng = new google.maps.LatLng(-8.064903, -34.896872)
					//   var mapOptions = {
					//     center: latLng,
					//     zoom: 16,
					//     mapTypeId: google.maps.MapTypeId.ROADMAP
					//   };
					//   var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

					//   var marker = new google.maps.Marker({
					//       position: latLng,
					//       title:"Hello World!",
					//       visible: true
					//   });
					//   marker.setMap(map);

	    //   		},500);

	      		
	    //   	}
	    //   	catch(e)
	    //   	{
	    //   		console.log(e);
	    //   	}

	      	
	    // });	
    }

    


 //    $http({
	//         url: 'https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Delhi&key=AIzaSyAmX6y4xVxgBDkB5VOIcPp_Uh3aNgFxQBY',
	//         method: "GET",
	//         json: true,
	//         headers: {
	// 			        'Access-Control-Allow-Origin' : '*',
	// 			'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json'
	// 			    }
	//     })
	// .then(function(response) {
	        
	//         console.log( response );
	// }, 
	// function(response) { // optional
	//         console.log( "Failed" );
	//         console.log( response );
	// });

}]);