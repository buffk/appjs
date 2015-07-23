/**
 * Author  : Stanislav Kabin <me@h-zone.ru>
 * GitHub  : https://github.com/h-zone/appjs
 * License : MIT
 * Version : 20150723
 */
(function ( $ ) {
	$.App = function ( options ) {
		var config          = {
				debug      : false,
				serviceUrl : ''
			},
			plugin          = this;
		plugin.settings = {},
		plugin.events   = {},
		plugin.locale   = {};
		// INIT
		var init = function () {
			plugin.settings = $.extend( {}, config, options );
		};
		init();
	}
})( jQuery );

var app = new $.App( {
	debug     : true,
	serviceUrl: 'ajax.php'
} );
