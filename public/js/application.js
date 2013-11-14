// function initialize() {
// ////////////////////////////////////////////////////////////////
//   var mapOptions = {
//     center: new google.maps.LatLng(37.760130, -122.441651),
//     zoom: 12,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   var map = new google.maps.Map(document.getElementById("map-canvas"),
//     mapOptions);
// ////////////////////////////////////////////////////////////////


// /////// automatically here when page loads //////////
//   var infowindow = new google.maps.InfoWindow({
//     content: "i made something happen"
//   });
//   var marker = new google.maps.Marker({
//     position: mapOptions.center,
//     map: map,
//     title: 'boom'
//   });
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.open(map,marker);
//   });
// ////////////////////////////////////////////////////////////////


// ///// me trying to get friggin infowindows   in right spot //////////
//   var createWindow = function(markered) {
//     return new google.maps.InfoWindow({
//       content: "this is where you clicked",
//       position: markered.position
//     });
//   }

//   var createMarker = function(location) {
//     return new google.maps.Marker({
//       position: location,
//       map: map
//     })
//   }

//   var addMarker = function(event) {
//     var markered = createMarker(event.latLng)
//     var infowindowClick = createWindow(markered)
//     infowindowClick.open(map,markered)
//   }

//   google.maps.event.addListener(map, 'click', addMarker);
// ////////////////////////////////////////////////////////////////
//   }
//   google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent('this shud show up')
  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
      // console.log(marker)
      google.maps.event.addListener(marker, 'click', function(e) { 
        marker.position = e.latLng;
        infowindow.setContent(marker.position.toString())
        infowindow.open(map, marker);
      });
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

 
}

google.maps.event.addDomListener(window, 'load', initialize);