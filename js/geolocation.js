var watchID;
var geo;

// position options
var MAXIMUM_AGE = 1000;  // 1 second
var TIMEOUT = 300000;   // 5 minutes
var HIGHACCURACY = true;
var statusVal = "Start"

function getGeoLocation() {
    try {
        if( !! navigator.geolocation ) return navigator.geolocation;
        else return undefined;
    } catch(e) {
        return undefined;
    }
}

function show_coords(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log(lat + "," + lon);

    // Rebeka's location
    var reb_lat = 51.638082;
    var reb_lon = -0.178483;

    var request = "http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + reb_lat + "," + reb_lon + "&destinations=" + lat + "," + lon + "&mode=driving&sensor=false";
    
    $.getJSON( request, function( data ) {
        $("#distance").html("Your current position is <strong>" + data.rows[0].elements[0].distance.text + "</strong> away from Rebeka's setting.<br/>It would take you <strong>" + data.rows[0].elements[0].duration.text + "</strong> to drive there.");
        $("#distance, #other").slideDown();
    });
}

function geo_error(error) {
    stopWatching();
}

function stopWatching() {
    if(watchID) geo.clearWatch(watchID);
    statusVal = 'Start';
    watchID = null;
}

function startStopWatching() {
    console.log("HERE");
    if(statusVal == 'Start') {
        watchID = geo.watchPosition(show_coords, geo_error, {
            enableHighAccuracy: HIGHACCURACY,
            maximumAge: MAXIMUM_AGE,
            timeout: TIMEOUT
        });
        statusVal = 'Stop';
    } else {
        stopWatching();
        statusVal = 'Start';
    }
}

function initGeo() {
    if((geo = getGeoLocation())) {
        startStopWatching();
    }   
}