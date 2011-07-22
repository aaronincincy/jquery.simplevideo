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
			swf:'',
			poster:''
		}
			
		var $this = $(this);

		defaults.mp4 = $this.attr('data-mp4');
		defaults.ogv = $this.attr('data-ogv');
		defaults.webm = $this.attr('data-webm');
		defaults.swf = $this.attr('data-swf');
		defaults.poster = $this.attr('data-poster');

		var settings = $.extend({}, defaults, o);
		var vidElement = document.createElement('video');

		var fallback = function(){
			var $obj = $('<object/>');
			$obj.attr('classid', 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000');
			$obj.attr('codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0');
			$obj.attr('width', settings.width);
			$obj.attr('height', settings.height);
			$obj.append('<param name="allowfullscreen" value="true" />');
			$obj.append('<param name="movie" value="' + settings.swf + '" />');
			var $embed = $('<embed/>');
			$embed.attr('width', settings.width);
			$embed.attr('height', settings.height);
			$embed.attr('allowfullscreen', 'true');
			$embed.attr('allowscriptaccess', 'always');
			$embed.attr('quality', 'high');
			$embed.attr('src', settings.swf);
			$embed.attr('type', 'application/x-shockwave-flash');
			$obj.append($embed);
			$this.append($obj);
		}

		if (typeof(vidElement.canPlayType) == 'undefinded'){
			//Fallback to swf
			fallback();
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
			if (vidElement.canPlayType('video/webm') && settings.webm){
				$src.attr('src', settings.webm);
				$src.attr('type', 'video/webm');
				compat = true;
			} else if (vidElement.canPlayType('video/mp4') && settings.mp4){
				$src.attr('src', settings.mp4);
				$src.attr('type', 'video/mp4');
				compat = true;
			} else if (vidElement.canPlayType('video/ogg') && settings.ogv){
				$src.attr('src', settings.ogv);
				$src.attr('type', 'video/ogg');
				compat = true;
			}
			if (compat){
				$video.append(src);
				$this.append($video);
			} else {
				//Fallback to flash
				fallback();
			}
		}
	}
});
})(jQuery);
