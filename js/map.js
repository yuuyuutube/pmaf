//$("#map-canvas").height(sheight-208);

function initializemap() {
// Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#000000" },
        { saturation: -100 },
        { lightness: -70 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: -20 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { lightness: -30 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "all",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "simplified" }
      ]
    },{
      elementType: "labels.text.fill",
      stylers: [
        { color: "#808080" }
      ]
    }
  ];
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var myLatlng = new google.maps.LatLng(25.0081215,121.5359759);

  var mapOptions = {
    zoom: 17,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    center: {lat: 25.0081215, lng: 121.5359759},
    mapTypeControl: false,
    // scrollwheel: false,
    zoomControl: false,
    scaleControl: false,
    streetViewControl:false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var markerimage = {
      url: 'images/icon-marker-fayg.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(81,48),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(40, 48)
    };

  var marker = new google.maps.Marker({
      position: myLatlng,
      icon: markerimage,
      map: map,
      animation: google.maps.Animation.DROP,
      title: '台北市文山區汀州路四段88號'
  });
  marker.addListener('click', toggleBounce);
  function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
  // map.setOptions({ scrollwheel: false });

}

google.maps.event.addDomListener(window, 'load', initializemap());