$(document).ready(function() {
  ////////////////////////////////////////////////////////////////
  var mapOptions = {
    center: new google.maps.LatLng(37.760130, -122.441651),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
////////////////////////////////////////////////////////////////

///// me trying to get friggin infowindows   in right spot //////////
  var createWindow = function(markered) {
    return new google.maps.InfoWindow({
      content: "this is where you clicked",
      position: markered.position
    });
  }

  var createMarker = function(location) {
    return new google.maps.Marker({
      position: location,
      map: map
    })
  }

  var addMarker = function(event) {
    var markered = createMarker(event.latLng)
    var infowindowClick = createWindow(markered)
    infowindowClick.open(map,markered)
  }

  google.maps.event.addListener(map, 'click', addMarker);
////////////////////////////////////////////////////////////////
});
