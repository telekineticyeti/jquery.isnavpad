//	Navigation Padder - copyright 2014 http://internetstrategiesuk.com
//	Version 0.1
//	paul@internetstrategiesuk.com
//	-------------
//	Facilitates the creation of a horizontal navigation with equidistant
//	margin between items.
//	
//	Supports the declaration of 'reserved' space into the calculation.
//	This may be used for logotypes or other elements.
//	-------------
//	Usage: $('ul.yournav').isNavpad(options);
//	See defaults below for configuration options.

( function ($) {
	$.fn.isNavpad = function( userconfig ) {

	var nav = this;

	// Default Settings
	var config = $.extend({
		items				: nav.children(),			// The child navigation elements. defaults to the immediate children
		reserve				: 0							// The amount of pixels to reserve from the negative space. 
	}, userconfig );

	function calculateMargins () {
		var widths = config.items.map( function() { return $(this).width(); }).get();
		var totalwidth = eval(widths.join('+'));

		//	Calculate negative space between items and store as a reaminder. If a reserve
		//	is declared, include it in the calculation
		var remainder;
		if (config.reserve > 0) { remainder = nav.width() - totalwidth - config.reserve; }
		else { remainder = nav.width() - totalwidth; }

		//	Calculate margin and apply it to the appropriate navigation items.
		var margin = Math.floor(remainder / (config.items.length-1) );
		config.items.not(":eq(0)").css('margin-left', margin);

		//	Resolves a sub-pixel rounding issue that causes the last item to collapse to the next row
		nav.children().last().css('margin-left', '-='+1);
	}

	$(window).on('resize', function (e) {
		calculateMargins();
	});

	calculateMargins();

	} // end plugin;
} ( jQuery ) );