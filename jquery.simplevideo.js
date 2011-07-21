(function($){
$.fn.extend({
	var simplevideo = function(o){
		var defaults = {
			width:320,
			height:240,
			autoplay:false,
			controls:true,
			loop:false,
			mp4:'',
			ogv:'',
			webm:'',
			swf:''
			poster:''
		}	
		var settings = $.extend({}, defaults, o);
		var $this = $(this);
		var vidElement = document.createElement('video');
		if (typeof(vidElement.canPlayType) == 'undefinded'){
			//Fallback to swf
		} else {
			var $video = $(vidElement);
			$video.attr('width', settings.width);
			$video.attr('height', settings.height);
			if (settings.poster !== ''){
				$video.attr('poster', settings.poster);
			}
			if (settings.controls === true){
				$video.attr('controls', 'controls');
			}
			if (settings.loop === true){
				$video.attr('loop', 'loop');
			}
			if (settings.autoplay === true){
				$video.attr('autoplay', 'autoplay');
			}
			var src = $('<source />');
			var compat = false;
			if (vidElement.canPlayType('video/mp4')){
				$src.attr('src', settings.mp4);
				$src.attr('type', 'video/mp4');
				compat = true;
			} else if (vidElement.canPlayType('video/ogg')){
				$src.attr('src', settings.ogv);
				$src.attr('type', 'video/ogg');
				compat = true;
			} else if (vidElement.canPlayType('video/webm')){
				$src.attr('src', settings.webm);
				$src.attr('type', 'video/webm');
				compat = true;
			}
			if (compat){
				$video.append(src);
				$this.append($video);
			} else {
				//Fallback to flash
			}
		}
	}
});
})(jQuery);
