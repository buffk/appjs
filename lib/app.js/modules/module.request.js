/**
 * Author  : Stanislav Kabin <me@h-zone.ru>
 * GitHub  : https://github.com/h-zone/appjs
 * License : MIT
 * Version : 20150723
 */
$.extend( true, app.events, {
	request: {
		errorHandler   : function( x, s/*, e*/ )
		{
			if( x.responseText && typeof( x.responseText ) != 'undefined' )
			{
				try
				{
					var j = $.parseJSON( x.responseText );
					if( j.error && typeof j.error != 'undefined' )
					{
						if( typeof j != 'undefined' && typeof( j.error ) != 'undefined' )
						{
							if( typeof j.error == 'array' || typeof j.error == 'object' )
							{
								for( var k in j.error )
								{
									app.alert( {
										type   : 'warning',
										content: j.error[ k ],
										id     : k + '-error'
									} );
								}
							}
							else
							{
								app.alert( {
									type   : 'error',
									content: j.error
								} );
							}
						}
					}
				}
				catch( ex )
				{
					if ( typeof x.responseText != 'undefined' && typeof x.responseText == 'string' )
					{
						app.alert( {
							type   : 'error',
							content: x.responseText
						} );
					}
					app.alert( {
						type   : 'error',
						content: ex
					} );
				}
			}
			else
			{
				app.alert( {
					type   : 'error',
					content: s
				} );
			}
		},
		defaultCallback: function( success, result )
		{
			var text = app.locale.request.notResponding;
			if( typeof result != 'undefined' && typeof( result.error ) != 'undefined' )
			{
				if( typeof result.error == 'array' || typeof result.error == 'object' )
				{
					for( var k in result.error )
					{
						app.alert( {
							type   : 'warning',
							content: result.error[ k ],
							id     : k + '-error'
						} );
					}
				}
				else
				{
					text = result.error;
					app.alert( {
						type   : 'error',
						content: text
					} );
				}
			}
		},
		complete       : function( callback )
		{
			return function( result, status )
			{
				if( status == 'success' && typeof( result.responseJSON ) == 'object' )
				{
					var success = status == 'success';
					if( result.responseJSON.error && typeof( result.responseJSON.error ) != 'undefined' )
					{
						callback = app.events.request.defaultCallback;
					}
					else
					{
						callback = callback || app.events.request.defaultCallback;
					}
					callback( success, result.responseJSON );
				}
				else
				{
					if( result.responseJSON && typeof( result.responseJSON.error ) != 'undefined' )
					{
						if( typeof result.responseJSON.error == 'array' || typeof result.responseJSON.error == 'object' )
						{
							for( var k in result.responseJSON.error )
							{
								app.alert( {
									type   : 'warning',
									content: result.error[ k ],
									id     : k + '-error'
								} );
							}
						}
						else
						{
							app.alert( {
								type   : 'error',
								content: result.responseJSON.error
							} );
						}
					}
				}
			}
		}
	}
} ),
	$.extend( true, app, {
			request: function( data, callback )
			{
				callback = callback || null;
				$.ajax( {
					dataType: 'json',
					cache   : false,
					type    : 'post',
					url     : app.settings.serviceUrl,
					data    : data,
					error   : app.events.request.errorHandler,
					complete: app.events.request.complete( callback )
				} );
			}
		}
	);
