app.controller("indexController",['$scope','$location','$window','$http','fileUpload','$filter',function(  $scope , $location, $window, $http,$fileUpload,$filter){

	console.log('index');

	$scope.data = 

	[
            {
                title: "Fast and furious 6",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt1905041/",
                start: new Date("2013/6/13 17:00"),
                end: new Date("2013/6/13 18:30")
            },
            {
                title: "The Internship",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt2234155/",
                start: new Date("2013/6/13 14:00"),
                end: new Date("2013/6/13 15:30")
            },
            {
                title: "The Perks of Being a Wallflower",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt1659337/",
                start: new Date("2013/6/13 16:00"),
                end: new Date("2013/6/13 17:30")
            },
            {
                title: "The Help",
                image: "images/mastback.jpg",
                imdb: "http://www.imdb.com/title/tt1454029/",
                start: new Date("2013/6/13 12:00"),
                end: new Date("2013/6/13 13:30")
            },
            {
                title: "Now You See Me",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt1670345/",
                start: new Date("2013/6/13 10:00"),
                end: new Date("2013/6/13 11:30")
            },
            {
                title: "Fast and furious 6",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt1905041/",
                start: new Date("2013/6/13 19:00"),
                end: new Date("2013/6/13 20:30")
            },
            {
                title: "The Internship",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt2234155/",
                start: new Date("2013/6/13 17:30"),
                end: new Date("2013/6/13 19:00")
            },
            {
                title: "The Perks of Being a Wallflower",
                image: "images/MB_black_small.png",
                imdb: "http://www.imdb.com/title/tt1659337/",
                start: new Date("2013/6/13 17:30"),
                end: new Date("2013/6/13 19:00")
            },
            {
                title: "The Help",
                image: "images/mastback.jpg",
                imdb: "http://www.imdb.com/title/tt1454029/",
                start: new Date("2013/6/13 13:30"),
                end: new Date("2013/6/13 15:00")
            },
            {
                title: "Now You See Me",
                image: "images/mastback.jpg",
                imdb: "http://www.imdb.com/title/tt1670345/",
                start: new Date("2013/6/13 12:30"),
                end: new Date("2013/6/13 14:00")
            }
        ];

    $scope.dataSource = new kendo.data.SchedulerDataSource({data: $scope.data});

	$(function() {
	    $("#scheduler").kendoScheduler({
	   	//$scope.schedulerOptions = {

	        date: new Date("2013/6/13"),
	        startTime: new Date("2013/6/13 10:00"),
	        endTime: new Date("2013/6/13 23:00"),
	        height: 600,
	        views: ["day", "agenda","month"],
	        editable: true,
	        eventTemplate: $("#event-template").html(),
			dataSource: $scope.dataSource
		//};
	     });
	 });

	$scope.DeleteItem = function(arg)
	{
		$scope.data.splice(arg,1);

		$scope.dataSource = new kendo.data.SchedulerDataSource({data: $scope.data});

		var scheduler = $("#scheduler").data("kendoScheduler");

		console.log( scheduler.view().title );

		var views = ["day", {type:"agenda",selected: true},"month"];

		switch( scheduler.view().title.toLowerCase() )
		{
			case "day": views = [{type:"day",selected: true},"agenda","month"]; break;
			case "agenda": views = ["day",{type:"agenda",selected: true},"month"]; break;
			case "month": views = ["day","agenda",{type:"month",selected: true}]; break;
		}

		scheduler.destroy();
		$("#scheduler").empty();
		$("#scheduler").kendoScheduler({
		    date: new Date("2013/6/13"),
	        startTime: new Date("2013/6/13 10:00"),
	        endTime: new Date("2013/6/13 23:00"),
	        height: 600,
	        views: views,
	        editable: true,
	        eventTemplate: $("#event-template").html(),
			dataSource: $scope.dataSource
		});

	}

}]);