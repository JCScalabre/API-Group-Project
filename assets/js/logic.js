// // Crimes by date:
// var startdate = "2017-09-21";
// var enddate = "2017-09-22";

// var datequeryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%27" + startdate + "%27%20and%20%27" + enddate + "%27" 

// Crimes by location:
// Radius in meters:
var radius = 100;
// Lat and Long:
var latitude = 41.87073
var longitude = -87.631749


// This function performs an AJAX request using just the location URL and then puts all the crimes on the map:
function locationajax() {

    var locationqueryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location,%20" + latitude + ",%20" + longitude + ",%20" + radius + ")"

    $.ajax({
       url: locationqueryURL,
       method: "GET"
   }).done(function(response) {

       console.log(response);

       for (var i = 0; i < response.length; i++) {

          marker = new google.maps.Marker({
           position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
           map: map
       });

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

    var locationyearqueryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location,%20" + latitude + ",%20" + longitude + ",%20" + radius + ")&year=" + year; 

    $.ajax({
        url: locationyearqueryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
                map: map
            });

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
    console.log("You clicked the year 2001");
    year = 2005;
    locationyearajax();
});

// When the user selects a year from the drop down:
$("#year-dropdown").on("change", function() {
    var selectedYear = $("#year-dropdown :selected").attr("value");
    console.log("you changed the year drop down " + selectedYear);
   
    if (selectedYear === "2002") {
        year = 2002;
        locationyearajax();
    };

    if (selectedYear === "2001") {
        year = 2001;
        locationyearajax();
    };
    
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

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 41.8781, lng:-87.6298},
		zoom: 13,
		mapTypeId: 'roadmap'
	});

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
	searchBox.setBounds(map.getBounds());
});

var markers = [];

// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
	var places = searchBox.getPlaces();

	if (places.length == 0) {
		return;
	}

// Clear out the old markers.
markers.forEach(function(marker) {
	marker.setMap(null);
});
markers = [];

// For each place, get the icon, name and location.
var bounds = new google.maps.LatLngBounds();
places.forEach(function(place) {
	if (!place.geometry) {
		console.log("Returned place contains no geometry");
		return;
	}
	var icon = {
		url: place.icon,
		size: new google.maps.Size(71, 71),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(17, 34),
		scaledSize: new google.maps.Size(25, 25)
	};

// Create a marker for each place.
markers.push(new google.maps.Marker({
	map: map,
	icon: icon,
	title: place.name,
	position: place.geometry.location
}));

if (place.geometry.viewport) {
       // Only geocodes have viewport.
       bounds.union(place.geometry.viewport);

   } else {
   	bounds.extend(place.geometry.location);
   }
});
map.fitBounds(bounds);
});
}
    //     // Filtering links click handler, it uses the filtering values (data-filterby and data-filtervalue)
    //     // to filter the markers based on the filter (custom) property set when the marker is created.
    //     $(document).on('click', '.filters a', function (event) {
    //         event.preventDefault();
    //         var $target = $(event.target);
    //         var type = $target.data('filterby');
    //         var value = $target.data('filtervalue');

    //         $.each(map.markers, function () {
    //             if (this.filter[type] == value) {
    //                 if (this.map == null) {
    //                     this.setMap(map);
    //                 }
    //             } else {
    //                 this.setMap(null);
    //             }
    //         });
    //     });
    // };


//***//Global Variables - Don't Delete

var crimeOptions = ["ARSON","ASSAULT","BATTERY","BURGLARY","CONCEALED CARRY LICENSE VIOLATION","CRIMINAL SEXUAL ASSAULT","CRIMINAL DAMAGE","CRIMINAL TRESPASS","DECEPTIVE PRACTICE","HOMICIDE","INTERFERENCE WITH PUBLIC OFFICER","KIDNAPPING","MOTOR VEHICLE THEFT","NARCOTICS","OFFENSE INVOLVING CHILDREN","OTHER OFFENSE","PROSTITUTION","PUBLIC PEACE VIOLATION","ROBBERY","SEX OFFENSE","THEFT","WEAPONS VIOLATION"]
var radiusOptions = [.5,1,2,3]
var currentDate = new Date()

//***//Functions - Don't Delete


//Builds drop down options

function buildDropDownOptions(){

    //build dropdown options for Type of Crime
    for(var j = 0; j<crimeOptions.length; j++){

        var newOption = $('<option>')
        newOption.html(crimeOptions[j])
        newOption.attr("value", crimeOptions[j])
        $("#crime-type-dropdown").append(newOption)
    }

    //build dropdown options for Year
    for(var j = 2001; j<=currentDate.getFullYear(); j++){

        var newOption = $('<option>')
        newOption.html(j)
        newOption.attr("value", j)
        $("#year-dropdown").append(newOption)
    }

    //build dropdown options for Radius
    for(var j=0; j<radiusOptions.length; j++){

        var newOption = $('<option>')
        newOption.html(radiusOptions[j] + " miles")
        newOption.attr("value", radiusOptions[j]*1609.34)
        $("#radius-dropdown").append(newOption)
    }
}


//***//Startup Logic

buildDropDownOptions();



//***//Delete -- ??