$( document ).ready(function(){
  $('body').on('click', '#savebutton', function(){
    debugger
  })

})

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
        // var mobutton = document.getElementById('mobutton')
        var box = '<input id="description" type="text" placeholder="write a description!"> <input id="savebutton" type="submit" value="Save me!">'
        infowindow.setContent(box)
        infowindow.open(map, marker);
         
 
      })

    }

    // document.getElementById('#savebutton').addEventListener('submit', function(){
    //         debugger
    //       })

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

 
  var createMarker = function(location) {
    return new google.maps.Marker({
      position: location,
      map: map
    })
  }

  var addMarker = function(event) {
    var markered = createMarker(event.latLng)
    markers << markered
    google.maps.event.addListener(markered, 'click', function(e) { 
       markered.position = e.latLng;
       var button = '<input id="savebutton" type="button" value="Save me!">'
        // document.getElementById('mobutton').style.display = 'block'
        var description = '<input id="description" type="text" placeholder="write a description!">'
        infowindow.setContent(description + button)
        infowindow.open(map, markered);
    });
  }

  google.maps.event.addListener(map, 'click', addMarker)


 
}

google.maps.event.addDomListener(window, 'load', initialize);
