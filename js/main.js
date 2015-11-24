'use strict';

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.094681, lng: -94.582033},
        zoom: 12
    });

    function point(name, lat, long) {
        this.name = name;
        this.lat = ko.observable(lat);
        this.long = ko.observable(long);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            title: name,
            map: map
            // draggable: true
        });
    }

    var viewModel = {
        points: ko.observableArray([
            new point('Test1', 39.132073, -94.505719),
            new point('Test2', 39.174671, -94.577130),
            new point('Test3', 39.079857, -94.570263)
        ])
    };

    ko.applyBindings(viewModel);
}