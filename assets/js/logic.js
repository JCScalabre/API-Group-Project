// Global variables: ----------------------------------------

// Radius in meters:
var radius = 500;
// Lat and Long:
var latitude = 41.87073
var longitude = -87.631749
var selectedYear;
var selectedType;
var gmarkers = [];

// Functions: ------------------------------------------------

// This function removes markers on the map:
function removeMarkers(){
    for( i = 0; i < gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
}

// This function performs an AJAX request using just the location URL and then puts all the crimes on the map:
function locationajax() {

    var locationqueryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location,%20" + latitude + ",%20" + longitude + ",%20" + radius + ")"

    $.ajax({
        url: locationqueryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
                map: map
            });
            gmarkers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent("<p id = 'info-window'>"+response[i].primary_type+ "<br>" + moment(response[i].date).format("MMMM D YYYY") +"<br> <a href= 'https://new.tipsubmit.com/#/submit-tip/ChicagoPD' target='_blank'> Submit a tip </a> </p>"  );
                    infowindow.open(map, marker);
                }
            })(marker, i));
        };
    });
};

// This function performs an AJAX request using the location + year URL and puts the crimes for that year on the map:
function locationyearajax() {

    var locationyearqueryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location,%20" + latitude + ",%20" + longitude + ",%20" + radius + ")&year=" + selectedYear; 
    console.log(locationyearqueryURL);
    $.ajax({
        url: locationyearqueryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
                map: map
            });
            gmarkers.push(marker);


            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent("<p id = 'info-window'>"+response[i].primary_type+ "<br>" + moment(response[i].date).format("MMMM D YYYY") +"<br> <a href= 'https://new.tipsubmit.com/#/submit-tip/ChicagoPD' target='_blank'> Submit a tip </a> </p>"  );
                    infowindow.open(map, marker);
                }
            })(marker, i));
        };
    }); 
};

// This function performs an AJAX request using the location + crime type URL and puts the crimes for that year on the map:
function locationtypeajax() {

    var locationtypequeryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location,%20" + latitude + ",%20" + longitude + ",%20" + radius + ")&primary_type=" + selectedType; 
    console.log(locationtypequeryURL);
    $.ajax({
        url: locationtypequeryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
                map: map
            });
            gmarkers.push(marker);


            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent("<p id = 'info-window'>"+response[i].primary_type+ "<br>" + moment(response[i].date).format("MMMM D YYYY") +"<br> <a href= 'https://new.tipsubmit.com/#/submit-tip/ChicagoPD' target='_blank'> Submit a tip </a> </p>"  );
                    infowindow.open(map, marker);
                }
            })(marker, i));
        };
    }); 
};

// When the user presses the submit button:
$("#submit").on("click", function() {
    console.log("You clicked the submit button");
    locationajax();
});

// When the Test button is clicked:
$("#year2001").on("click", function() {
    console.log("You clicked the test button");
    removeMarkers();
});

// When the user selects a year from the drop down:
$("#year-dropdown").on("change", function() {
    selectedYear = $("#year-dropdown :selected").attr("value");
    console.log("You changed the year to: " + selectedYear);
    removeMarkers();
    locationyearajax();
});

// When the user selects a type from the drop down:
$("#crime-type-dropdown").on("change", function() {
    selectedType = $("#crime-type-dropdown :selected").attr("value");
    console.log("You changed the year to: " + selectedType);
    removeMarkers();
    locationtypeajax();
});

//Places Map with wither proper center, zoom, and style (NV)
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 12,
	center: new google.maps.LatLng(41.8781, -87.6298),
	mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:
    [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [

        {
            "color": "#ffffff"
        }

        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 13
        },
        {
            "visibility": "off"

        }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
        {
            "color": "#000000"
        }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#144b53"
        },
        {
            "lightness": 14
        },
        {
            "weight": 1.4
        }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
        {
            "color": "#08304b"
        }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [

        {
            "color": "#0c4152"
        },
        {
            "lightness": 5
        },

        {
            "color": "#0c4152"
        },
        {
            "lightness": 5

        },
        {
            "visibility": "off"

        }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
        {
            "color": "#000000"
        }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#0b434f"
        },
        {
            "lightness": 25
        }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
        {
            "color": "#000000"
        }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
        {
            "color": "#0b3d51"
        },
        {
            "lightness": 16
        }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
        {
            "color": "#000000"
        }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [

        {
            "color": "#146474"
        },

        {
            "color": "#51c9e1"
        }

        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
        {
            "color": "#021019"
        }
        ]
    }
    ]
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

var crimeOptions = ["ANY TYPE","ARSON","ASSAULT","BATTERY","BURGLARY","CONCEALED CARRY LICENSE VIOLATION","CRIMINAL SEXUAL ASSAULT","CRIMINAL DAMAGE","CRIMINAL TRESPASS","DECEPTIVE PRACTICE","HOMICIDE","INTERFERENCE WITH PUBLIC OFFICER","KIDNAPPING","MOTOR VEHICLE THEFT","NARCOTICS","OFFENSE INVOLVING CHILDREN","OTHER OFFENSE","PROSTITUTION","PUBLIC PEACE VIOLATION","ROBBERY","SEX OFFENSE","THEFT","WEAPONS VIOLATION"]
var radiusOptions = [.5,1,2,3]
var currentDate = new Date()

//Builds drop down options
function buildDropDownOptions() {

    // Build dropdown options for Type of Crime
    for(var j = 0; j < crimeOptions.length; j++) {

        var newOption = $('<option>')
        newOption.html(crimeOptions[j])
        newOption.attr("value", crimeOptions[j])
        $("#crime-type-dropdown").append(newOption)
    }

    // Build dropdown options for Year
    for(var j = 2001; j <= currentDate.getFullYear(); j++) {

        var newOption = $('<option>')
        newOption.html(j)
        newOption.attr("value", j)
        $("#year-dropdown").append(newOption)
    }

    // Build dropdown options for Radius
    for(var j=0; j < radiusOptions.length; j++) {

        var newOption = $('<option>')
        newOption.html(radiusOptions[j] + " miles")
        newOption.attr("value", radiusOptions[j]*1609.34)
        $("#radius-dropdown").append(newOption)
    }
}

//***//Startup Logic

buildDropDownOptions();