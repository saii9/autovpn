	var autoVpnStatApp = angular.module('autoVpnStatApp', []);
    console.log("okay");
	autoVpnStatApp.controller('AutoVpnStatCtrl', function($scope, $http, $interval) {

		var loadStats = function(){
            $http.get(protocol+'://'+ domain +'/stats').then(
                function(response) {
                    console.log(response.data);
                    $scope.stats = response.data.stats;
                    $scope.ips = response.data.ips;
                    $scope.msgs = response.data.msgs;
                    console.log($scope.stats);
           });
        }

		function extractProtocol(url) {
	        return url.split('://')[0];
		}
		
		function extractDomain(url) {
		    var domain;
		    //find & remove protocol (http, ftp, etc.) and get domain
		    if (url.indexOf("://") > -1) {
		        domain = url.split('/')[2];
		    }
		    else {
		        domain = url.split('/')[0];
		    }
		    return domain;
		}

        $scope.keys = function(obj){
          return obj? Object.keys(obj) : [];
        }
		console.log("inside control");
		domain = extractDomain(window.location.href);
		protocol = extractProtocol(window.location.href);
		console.log("loading stats");
		loadStats();
		var delay = 5000;
		$interval(loadStats, delay, 0);

	});
