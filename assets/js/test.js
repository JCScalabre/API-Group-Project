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

buildDropDownOptions();



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