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
						var text = new String(content);

						//-- replace title with line break
						text = text.replace(/<title>/gi, "[");
						text = text.replace(/<\/title>/gi, "]\n");

						//-- remove HR tags and replace them with line break
						text = text.replace(/<hr>/gi, "---------------------------------------------------------------------\n");
						text = text.replace(/<hr\s\/>/gi, "---------------------------------------------------------------------\n");
						text = text.replace(/<hr\/>/gi, "---------------------------------------------------------------------\n");

						//-- remove BR tags and replace them with line break
						text = text.replace(/<br>/gi, "\n");
						text = text.replace(/<br\s\/>/gi, "\n");
						text = text.replace(/<br\/>/gi, "\n");

						//-- remove HEADER-tags but preserve what's inside of them
						text = text.replace(/<\/h.*>/gi, "\n");

						//-- remove P and A tags but preserve what's inside of them
						text = text.replace(/<\/p>/gi, "\n");
						text = text.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

						//-- remove all inside SCRIPT and STYLE tags
						text = text.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
						text = text.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
						//-- remove all else
						text = text.replace(/<(?:.|\s)*?>/gi, "");

						//-- get rid of more than 2 multiple line breaks:
						text = text.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

						//-- get rid of more than 2 spaces:
						text = text.replace(/ +(?= )/g,'');

						//-- get rid of html-encoded characters:
						text = text.replace(/&nbsp;/gi," ");
						text = text.replace(/&amp;/gi,"&");
						text = text.replace(/&quot;/gi,'"');
						text = text.replace(/&lt;/gi,'<');
						text = text.replace(/&gt;/gi,'>');

						console.log( 'ALERT:', type );
						console.log( text );
						console.log( '=====================================================================' );
					break;
				}
			}
		}
	);
