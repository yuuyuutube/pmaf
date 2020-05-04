/*
 * pixelate.js
 * 43081j
 * Pixelate images with ease
 * License: MIT
 */
(function(window, $) {
	var pixelate = function() {
		var defaults = {
			value: 0.03,
			reveal: true,
			revealonclick: false
		};
		var options = arguments[1] || {};
		var element = this, //arguments[0],
			elementParent = element.parentNode;
		if(typeof options !== 'object') {
			options = { value: parseInt(arguments[1]) };
		}
		options = (function() {
			var opts = {};
			for(var k in defaults) {
				if(element.hasAttribute('data-' + k)) {
					opts[k] = element.getAttribute('data-' + k);
					continue;
				}
				if(k in options) {
					opts[k] = options[k];
					continue;
				}
				opts[k] = defaults[k];
			}
			return opts;
		})();
		var display = element.style.display,
			imgWidth = element.width,
			imgHeight = element.height,
			revealed = false;
		var canv = document.createElement('canvas');
		var canv2 = document.createElement('canvas');
		canv.width = imgWidth;
		canv.height = imgHeight;
		canv2.width = imgWidth;
		canv2.height = imgHeight;
		canv2.id = 'tempCanvas1';
		canv2.id = 'tempCanvas2';
		var ctx = canv.getContext('2d');
		var ctx2 = canv2.getContext('2d');
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		ctx2.mozImageSmoothingEnabled = false;
		ctx2.webkitImageSmoothingEnabled = false;
		ctx2.imageSmoothingEnabled = false;
		var width = imgWidth * options.value,
			height = imgHeight * options.value;
		ctx.drawImage(element, 0, 0, width, height);
		ctx2.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
		element.style.display = 'none';
		elementParent.insertBefore(canv, element);
		elementParent.insertBefore(canv2, element);
		if(options.revealonclick !== false && options.revealonclick !== 'false') {
			/*
			 * Reveal on click
			 */
			canv.addEventListener('click', function(e) {
				revealed = !revealed;
				if(revealed) {
					ctx.drawImage(element, 0, 0, imgWidth, imgHeight);
				} else {
					ctx.drawImage(element, 0, 0, width, height);
					ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
				}
			});
		}
		if(options.reveal !== false && options.reveal !== 'false') {
			/*
			 * Reveal on hover
			 */
			canv.addEventListener('mouseenter', function(e) {
				// if(revealed) return;
				// ctx.drawImage(element, 0, 0, imgWidth, imgHeight);
			});
			canv.addEventListener('mouseleave', function(e) {
				// if(revealed) return;
				// ctx.drawImage(element, 0, 0, width, height);
				// ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
			});
		}

      // save canvas image as data url (png format by default)
      var dataURL = canv.toDataURL();
      // console.log( dataURL );
      // window.open(dataURL);
      // set canvasImg image src to dataURL
      // so it can be saved as an image
      // document.getElementById('canvasImg').src = dataURL;
	};
	window.HTMLImageElement.prototype.pixelate = pixelate;
	if(typeof $ === 'function') {
		$.fn.extend({
			pixelate: function() {
				return this.each(function() {
					pixelate.apply(this, arguments);
				});
			}
		});
	}
	document.addEventListener('DOMContentLoaded', function(e) {
		var img = document.querySelectorAll('img[data-pixelate]');
		for(var i = 0; i < img.length; i++) {
			img[i].addEventListener('load', function() {
				this.pixelate();
			});
		};
	});
})(window, typeof jQuery === 'undefined' ? null : jQuery);
