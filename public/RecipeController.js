app.controller("RecipeController",['$scope','$location','$window','$http',function(  $scope , $location, $window, $http){

	console.log('Recipe');
	
	$scope.ingredients = [];

	$scope.addIngredient = function()
	{
		var json = {"ingredientName":"","ingredientQty":"","ingredientUnit":""};

		$scope.ingredients.push(json);

		//console.log( $scope.ingredients );
	}

	$scope.DeleteIngredient = function( arg )
	{
		$scope.ingredients.splice(arg,1);
	}

	$scope.step = [];

	$scope.addStep = function()
	{
		var json = {"step":"a"};

		$scope.step.push(json);

		//console.log( $scope.step );
	}

}]);