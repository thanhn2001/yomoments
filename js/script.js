/*jslint unparam: true */
/*global window, $ */

$(function () {
    'use strict';
		
    // Change this to the location of your server-side upload handler:
    var url = (window.location.hostname === 'blueimp.github.io' ||
                window.location.hostname === 'blueimp.github.io') ?
                '//jquery-file-upload.appspot.com/' : 'server/php/';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });
		
		$('#create-event2').submit(function() {
			
			Parse.initialize("RtOMiBwJs9jN3AhZsQNKKtiBbUxi5IzRyIRne1Tx", "dqgQgsXkFU1d2QrZX7XWxWnZSvKcf7NrXpbGrufE");
			
			var EventObject = Parse.Object.extend("Event");
			var newEvent = new EventObject();
			
			newEvent.set("title", $('#ce-title').val());
			newEvent.set("date", $('#ce-date').val());
			newEvent.set("location", $('#ce-location').val());

			newEvent.save(null, {
				success: function(newEvent) {
					alert("Saved event");
          $.mobile.changePage("#page3");
				},
				error: function() {
					alert("Error saving event");
				}
			});
			
			return false;
		});
});
