kibApp.controller('LeagueDetailsPageController', function($scope, kibservice){
	$scope.leagues = kibservice.GetLeagues();
	
	$scope.onSelectedLeague = function(league){
		console.log(league.Name);
	}
});