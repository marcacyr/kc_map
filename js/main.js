'use strict';

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.076268, lng: -94.590043},
      zoom: 13
  });

  //maybe a for loop that doesn't create new points, but instead just
  //creates markers for each object in the model

  for (var i = 0; i < places.length; i++) {
    // places[i].name = name;
    // places[i].lat = ko.observable(lat);
    // places[i].long = ko.observable(long);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(places[i].lat, places[i].long),
      title: places[i].name,
      map: map
    });

    // marker.setMap(map);

    places[i].isVisible = ko.observable(false);

    places[i].isVisible.subscribe(function(currentState) {
      if (currentState) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    });

    places[i].isVisible(true);
  };
}

var places = [
  {name:"801 Chop House", lat: 39.096980, long: -94.582418},
  {name:"Grinders", lat: 39.091405, long: -94.578115},
  {name:"Jack Stack Barbecue", lat: 39.087237, long: -94.585817},
  {name:"Beer Kitchen", lat: 39.052808, long: -94.591287},
  {name:"Reserve", lat: 39.100631, long: -94.580513}
];

$(function() {

  var viewModel = {
    places: ko.observableArray(places),

    query: ko.observable(''),

    search: function(value) {
      viewModel.places([]);
      for(var x in places) {
        if(places[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          viewModel.places.push(places[x]);
        }
      }
    }
  };

  viewModel.query.subscribe(viewModel.search);

  ko.applyBindings(viewModel);
});