function initialize() {
////////////////////////////////////////////////////////////////
  var mapOptions = {
    center: new google.maps.LatLng(37.760130, -122.441651),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
////////////////////////////////////////////////////////////////


/////// automatically here when page loads //////////
  var infowindow = new google.maps.InfoWindow({
    content: "i made something happen"
  });
  var marker = new google.maps.Marker({
    position: mapOptions.center,
    map: map,
    title: 'boom'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
////////////////////////////////////////////////////////////////


/////// me trying to get friggin infowindows in right spot //////////
  function addMarker(location) {
    var markered = new google.maps.Marker({
      position: location,
      map: map
    });
    console.log(markered.getPosition())
      // markers.push(marker);
    }

  google.maps.event.addListener(map, 'click', function(event) {
    var infowindowClick = new google.maps.InfoWindow({
      content: "this is where you clicked",
      position: event.latLng
    });
    infowindowClick.open(map,addMarker(event.latLng))
  });
////////////////////////////////////////////////////////////////
  }
  google.maps.event.addDomListener(window, 'load', initialize);