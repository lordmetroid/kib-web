var BaseURL = "http://kibdev.crabdance.com/modend/api";

angular.module('kibAdmin').factory('adminservice', function($resource, $http){
	var Page = $resource(BaseURL + "/page/:pageName");
	var Event = $resource(BaseURL + "/events/:eventId");
	var League = $resource(BaseURL + "/league/:leagueId");
	var Matches = $resource(BaseURL + "/league/matches/:matchId",null,null,{ stripTrailingSlashes: false });
	
	return {
		//PAGES
	
		NewPage: function(pageArg){
			page = new Page(pageArg);
			return page.$save();
		},
		
		SavePage: function(pageName, page){
			return page.$save({pageName: pageName});
		},
		
		DeletePage: function(pageName){
			return Page.delete({pageName: pageName});
		},
		
		//EVENTS
		
		NewEvent: function(eventArg){
			event = new Event(eventArg);
			return event.$save();
		},
		
		SaveEvent: function(eventId, eventArg){
			return eventArg.$save({eventId: eventId});
		},
		
		DeleteEvent: function(eventId) {
			return Event.delete({eventId: eventId});
		},
		
		//AUTH
		
		GetAuthInfo: function(callback) {
			$resource(BaseURL + "/authinfo/").get({}, function(value, headers){
				callback(value);
			});
		},
		
		//LEAGUE
		
		ReportMatch: function(leagueId, matchObj, callback){
			return $http.post(BaseURL + "/league/" + leagueId + "/reportmatch", matchObj);
		},
		
		GetNewLeague: function(){
			return new League();
		},
		
		//MATCHES
		
		GetMatches: function(){
			return Matches.query();
		}
	};
});