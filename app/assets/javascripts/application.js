// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap
//= require opentok.min
var session,publisher,subcriber,
    publisherProperties = {insertMode: "append"},
    subscriberProperties = {insertMode: 'append'};

function connect(){
  session = OT.initSession(gon.opentok.apiKey, gon.opentok.sessionId);
  session.connect(gon.opentok.token, function(error) {
    if (error) {
      console.log("Error connecting: ", error.code, error.message);
    } else {
      console.log("Connected to the session.");
      subscribe();
    }
  });
}

function publish(){
  publisher = OT.initPublisher(publisherContainer);
    publisher.on({
    streamCreated: function (event) {
      console.log("Publisher started streaming.");
    },
    streamDestroyed: function (event) {
      console.log("Publisher stopped streaming. Reason: "
        + event.reason);
    }
  });
  if (session.capabilities.publish == 1) {
    session.publish(publisher);
  } else {
    console.log("You cannot publish an audio-video stream.");
  }
}

function unpublish(){
    publisher.destroy();
}

function subscribe(){
  session.on('streamCreated', function(event) {
    subscriber = session.subscribe(event.stream,
    'subscriberContainer',
    subscriberProperties,
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Subscriber added.');
      }
  });
});
}
