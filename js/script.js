/*jslint unparam: true */
/*global window, $ */
Parse.initialize("RtOMiBwJs9jN3AhZsQNKKtiBbUxi5IzRyIRne1Tx", "dqgQgsXkFU1d2QrZX7XWxWnZSvKcf7NrXpbGrufE");

$(function () {
    'use strict';

		var getevents = function() {
			var Event = Parse.Object.extend("Event");
			
			var query = new Parse.Query(Event);
			
			//query.equalTo('')
			query.find({success:function(results) {
					// success
					$.each(results, function(idx, event) {
						$('.events').append(
              '<div class="ui-block">' +
								'<a href="#page3"><img width="200" src="' + 
								event.get('logourl') + 
								'"></a>' +
              '</div>'
						);
					});
				},
				error: function(error) {
					// error
					alert('Error');
				}
			});
		
		};
		
		var createevent = function(data) {
			var EventObject = Parse.Object.extend("Event");
			var newEvent = new EventObject();

			newEvent.set("title", $('#ce-title').val());
			newEvent.set("date", $('#ce-date').val());
			newEvent.set("location", $('#ce-location').val());
			if (data && data.url) {
				newEvent.set("logourl", data.url);
			}

			newEvent.save(null, {
				success: function(newEvent) {
					alert("Saved event");
					file = null;
          $.mobile.changePage("#page3");
				},
				error: function() {
					alert("Error saving event");
				}
			});
    };
		
		var addprofile = function(data) {
			var EventObject = Parse.Object.extend("Profile");
			var newEvent = new EventObject();

			newEvent.set("name", $('#ap-name').val());
			newEvent.set("email", $('#ap-email').val());
			newEvent.set("facebook", $('#ap-facebook').val());
			if (data && data.url) {
				newEvent.set("headshoturl", data.url);
			}

			newEvent.save(null, {
				success: function(newEvent) {
					alert("Saved event");
					file = null;
          $.mobile.changePage("#page3");
				},
				error: function() {
					alert("Error saving event");
				}
			});					
    };
		
		var uploadfile = function(callback) {
			if (!file) {
				callback();
			} else {
	      var serverUrl = 'https://api.parse.com/1/files/' + file.name;

	      $.ajax({
	        type: "POST",
	        beforeSend: function(request) {
	          request.setRequestHeader("X-Parse-Application-Id", 'RtOMiBwJs9jN3AhZsQNKKtiBbUxi5IzRyIRne1Tx');
	          request.setRequestHeader("X-Parse-REST-API-Key", 'x6qfuAl6Vd61NZiU5xjfyGB1f7JLlr1Yj3kJTspB');
	          request.setRequestHeader("Content-Type", file.type);
	        },
	        url: serverUrl,
	        data: file,
	        processData: false,
	        contentType: false,
	        success: callback,
	        error: function(data) {
	          var obj = jQuery.parseJSON(data);
	          alert(obj.error);
	        }
	      });
			}
		};
		
		
		// File uploads
    var file;

    // Set an event listener on the Choose File field.
    $('#ce-fileselect, #ap-fileselect').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

		getevents(); // on app load
		
		$(document).delegate('#page7, #page5', 'pageshow', function() {
			file = null;
		}); 
		
		$(document).delegate('#page1', 'pageshow', function() {
			getevents();
		});
		

		$('#create-event').submit(function() {
			uploadfile(createevent);
			return false;
		});
		
		$('#add-profile').submit(function() {
			uploadfile(addprofile);
			return false;
		});
		
});

