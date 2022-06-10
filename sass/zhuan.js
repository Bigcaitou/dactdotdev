﻿(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function () {
	var count = 0;
	var id;

	$('body').disableSelection();

	$('body').on('click', function (e) {
		if (count == 0){
			$('#container').append('<img class="throbber" id="' + id +'" src="img/1.gif">');
			$('#' + id).css({marginTop: '50px'});
			count += 1;

			setTimeout(function () {
				$('p').text('网络连接不稳定，请点击屏幕任意位置重试');
			}, 1500);
		} else if (count == 1) {
			makeThrobber(e);
			setTimeout(function () {
				$('p').text('网络连接依然不稳定，请点击屏幕任意位置重试');
			}, 1000);
		} else if (count == 2) {
			makeThrobber(e);
			setTimeout(function () {
				$('p').text('网络连接怎么这么不稳定，请点击屏幕任意位置重试');
			}, 1000);
		} else {
			makeThrobber(e);
		}
	});

	function makeThrobber(e) {
		var throbber = '1.gif';
		id = 't' + count;

		$('#container').append('<img class="throbber" id="' + id +'" src="1.gif">');
		$('#' + id).css({position: 'absolute', top: e.pageY, left: e.pageX});
		$('#' + id).addClass('spin');

		count += 1;
	}
});
