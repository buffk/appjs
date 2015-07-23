/**
 * Author  : Stanislav Kabin <me@h-zone.ru>
 * GitHub  : https://github.com/h-zone/appjs
 * License : MIT
 * Version : 20150723
 */
$.extend( true, app.settings, {
	alert: {
		dialogOptions: {
			draggable  : true,
			maxHeight  : 600,
			maxWidth   : 600,
			modal      : false,
			position   : {
				my: "right top",
				at: "right top",
				of: window
			},
			resizable  : false,
			close      : function()
			{
				$( this ).remove();
			}
		}
	}
} ),
	$.extend( true, app, {
			alert: function( params )
			{
				var type = params.type || 'default',
					content = params.content || '',
					id = params.id || '',
					framework = params.framework || '';
				switch(type){
					case 'primary':
					case 'link':
					case 'default':
						type = 'info';
						break;
					case 'error':
						type = 'danger';
				}
				var ftype = framework || 'console';
				switch( ftype )
				{
					case 'bootstrap':
						var $a = $( '<div>' ).addClass( 'alert alert-'+type+' alert-dismissible' ).css({'max-width':'300px','cursor':'pointer'});
						if ( id && typeof id != 'undefined' )
							$a.attr( 'id', id );
						$a.attr( {
							'data-dismiss': 'alert',
							role:           'alert'
						} );
						$a.append( $( '<button>' ).addClass( 'close' ).attr( {
							type:           'button',
							'data-dismiss': 'alert',
							'aria-label':   app.locale.alert.close
						} ).append( $( '<span>' ).append( '&times;' ).attr( {'aria-hidden': true} ) ) ).append( $( '<h4>' ).text( app.locale.alert[type] ) ).append( content ).appendTo( $('#alerts') );

						break;
					default:
					case 'console':
						console.log( '=====================================================================' );
						console.log( 'ALERT:', type );
						console.log( content );
						console.log( '=====================================================================' );
					break;
				}
			}
		}
	);
