'use strict';

/* global console */

angular.module('kibApp').directive('bgVideo', function(){
		return {
			scope: {
				videos: '=',
			},
			restrict: 'E',
			template: '<video id="bgvideo" muted poster="assets/images/video-poster.png"/>',
			link: function(scope, element) {
				var nextVideo = function(){
					if(scope.currentVideo !== undefined){
						scope.currentVideo += 1;
						if(scope.currentVideo > scope.videos.length - 1){
							scope.currentVideo = 0;
						}
					}else{
						scope.currentVideo = 0;
					}
					
					console.log('Playing video ' + scope.currentVideo + ' = ' + scope.videos[scope.currentVideo]);
				
					var video = element.find('video');
					var videofile = 'assets/video/' + scope.videos[scope.currentVideo];
					video.html(angular.element('<source src="' + videofile + '.ogv" type="video/ogg"/>'));
					video.append(angular.element('<source src="' + videofile + '.mp4" type="video/mp4"/>'));
					video.append(angular.element('<source src="' + videofile + '.webm" type="video/webm"/>'));
					
					video.get(0).load();
					video.get(0).play();
				};
			
				element.find('video').on('ended', function(){
					console.log('Video ended');
					nextVideo();
				});
				
				//Trigger playback start
				nextVideo();
			}
		};
	});