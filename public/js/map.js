var map;
var infowindow;
var markers = [];  //temporarily displayed search markers
var saved_markers = []; //search markers populated from trip database
var box = '<form><input id="description" type="text" placeholder="write a description!" name="inputbox"> <input id="savebutton" type="submit" value="Save me!"><form>'
var selectedMarker;

$( document ).ready(function(){
  $('body').on('click', '#savebutton', function(e){
    e.preventDefault();
    var data = $('#description').serialize()
    $.ajax({
      url: '/savemarker',
      type: 'post',
      data: {'markerDescription': data, 'markerPostition': selectedMarker.position.toString()}
    }).done(function(){
      console.log('success')
      $('#description').parent().html('<form><input id="description" type="text" placeholder="write a description!" name="inputbox"> <input id="savebutton" type="submit" value="SAVED!"><form>')
    }).fail(function(){
      console.log('user must add desc')
    })
  })


  function initialize(){
    //Map definition centered on SF
    var sf = new google.maps.LatLng(37.783062, -122.41569);

    map = new google.maps.Map(document.getElementById('map-canvas'),{
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: sf,
      zoom: 11
    });
    
    //Defining bounds and infowindow object
    var bounds = new google.maps.LatLngBounds();
    infowindow = new google.maps.InfoWindow();
    
    //listener for changes in boundary
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });

    //add markers on clicks
    google.maps.event.addListener(map, 'click', function(e){
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }
      marker = createClickMarker(e)
      markers.push(marker)

    })

    //SearchBox definition
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); 
    var searchBox = new google.maps.places.SearchBox((input));
    
    //Populating search markers based on search
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();
      
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      } 
      
      for (var i = 0, place; place = places[i]; i++) {
        marker = createMarker(place)
        markers.push(marker)
      }
    })


    
    //Search Places Create Marker Function
    function createMarker(place){
      var placeLoc = place.geometry.location;
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function(e) {
        createClickMarker(e);
      });
      
    }

    //Click Function Create Marker
    function createClickMarker(e){
      var marker = new google.maps.Marker({
        map: map,
        position: e.latLng,
        title: "placeholder"
        //icon: "default"
      })
      
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(box);
        infowindow.open(map, this);
      });
      selectedMarker = marker
      return marker
    }

    var mapId = $('#map-canvas').data("map-id");

    $.get('/markers/' + mapId).done(function(data){
    // debugger

      for (var index in data.markers) {
        var m = data.markers[index]
        // debugger
        console.log(m.lat,m.long)
        var myLatLng = new google.maps.LatLng(m.lat, m.long)
        var marker = new google.maps.Marker({

          position: myLatLng // example => (37.783062, -122.41569)
           // this will be marker.title at some point
          //icon: "default"
        }).setMap(map);
      }
    });

  }
  google.maps.event.addDomListener(window, 'load', initialize);
  
});