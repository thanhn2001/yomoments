/*jslint unparam: true */
/*global window, $ */
Parse.initialize("RtOMiBwJs9jN3AhZsQNKKtiBbUxi5IzRyIRne1Tx", "dqgQgsXkFU1d2QrZX7XWxWnZSvKcf7NrXpbGrufE");

$(function () {
    'use strict';
		
		var getprofiles = function() {
				var Profile = Parse.Object.extend("Profile");
			
				var query = new Parse.Query(Profile);
			
				//query.equalTo('')
				query.find({success:function(results) {
						// success
						$('.ve-profiles > span').remove();
						$.each(results, function(idx, profile) {
							$('.ve-profiles').append(
	              '<span>' +
									'<a id="' + 
									profile.id +
									'" href="#page6"><img height="64" src="' + 
									profile.get('headshoturl') + 
									'"></a>' +
	              '</span>'
							);
						});
					},
					error: function(error) {
						// error
						alert('Error');
					}
				});
		
			};
			
			var getprofile = function(id) {
				var Profile = Parse.Object.extend("Profile");
			
				var query = new Parse.Query(Profile);
				query.get(id, {
				  success: function(event) {
				    // The object was retrieved successfully.
						$('#vp-name').text(event.get('name'));
						$('#vp-email').text(event.get('email'));
						$('#vp-facebook').text(event.get('facebook'));
						$('#vp-headshoturl').attr('src', event.get('headshoturl'));
				  },
				  error: function(object, error) {
				    // The object was not retrieved successfully.
				    // error is a Parse.Error with an error code and description.
				  }
				});
		
			};
			
		var getevents = function() {
			var Event = Parse.Object.extend("Event");
			
			var query = new Parse.Query(Event);
			
			//query.equalTo('')
			query.find({success:function(results) {
					// success
					$('.events > div').remove();
					$.each(results, function(idx, event) {
						$('.events').append(
              '<div class="ui-block-a">' +
								'<a id="' + 
								event.id +
								'" href="#page3"><img width="200" src="' + 
								event.get('logourl') + 
								'"></a>' +
              '</div>' +
              '<div class="ui-block-b">' +
		              '<p><b>' + event.get('title') + '</b></p>' +
		              '<p><span>' + event.get('location') + '</span></p>' +
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
		
		var getevent = function(id) {
			var Event = Parse.Object.extend("Event");
			
			var query = new Parse.Query(Event);
			query.get(id, {
			  success: function(event) {
			    // The object was retrieved successfully.
					$('#ve-title').text(event.get('title'));
					$('#ve-location').text(event.get('location'));
					$('#ve-date').text(event.get('date'));
					$('#ve-logourl').attr('src', event.get('logourl'));
					
					getprofiles();
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
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
			var ProfileObject = Parse.Object.extend("Profile");
			var newProfile = new ProfileObject();

			newProfile.set("name", $('#ap-name').val());
			newProfile.set("email", $('#ap-email').val());
			newProfile.set("facebook", $('#ap-facebook').val());
			if (data && data.url) {
				newProfile.set("headshoturl", data.url);
			}
			/*
			newProfile.save(null, {
				success: function(newProfile) {
					alert("Saved event");
					file = null;
					//getevent('upBSZQ5Zld');
          $.mobile.changePage("#page3-2");
				},
				error: function() {
					alert("Error saving event");
				}
			});		
			*/
      $.mobile.changePage("#page3-2");
						
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
		var currentEvent;

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
		
		/*
		$(document).delegate('#page3', 'pageshow', function() {
			getevent();
		});
		
		$(document).delegate('#page6', 'pageshow', function() {
			getprofile();
		});
		*/
		

		$('#create-event').submit(function() {
			uploadfile(createevent);
			return false;
		});
		
		$('#add-profile').submit(function() {
			uploadfile(addprofile);
			return false;
		});
	
		$('.events').delegate('a', 'click', function() {
			getevent($(this).attr('id'));
		});
		
		$('.ve-profiles').delegate('a', 'click', function() {
			getprofile($(this).attr('id'));
		});
		
});

