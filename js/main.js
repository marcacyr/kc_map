'use strict';

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.076268, lng: -94.590043},
      zoom: 13
  });

  function point(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      title: name,
      map: map
    });

    this.isVisible = ko.observable(false);

    this.isVisible.subscribe(function(currentState) {
      if (currentState) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    });

    this.isVisible(true);
  }

  var viewModel = {
    points: ko.observableArray([
      new point('801 Chop House', 39.096980, -94.582418),
      new point('Grinders', 39.091405, -94.578115),
      new point('Jack Stack Barbecue', 39.087237, -94.585817),
      new point('Beer Kitchen', 39.052808, -94.591287),
      new point('Reserve', 39.100631, -94.580513)
    ]),

  };

  ko.applyBindings(viewModel);
}

///////////////////

var places = [
  {name:"801 Chop House"},
  {name:"Grinders"},
  {name:"Jack Stack Barbecue"},
  {name:"Beer Kitchen"},
  {name:"Reserve"},
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