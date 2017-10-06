// Crimes by date:
var startdate = "2017-09-21";
var enddate = "2017-09-22";

var datequeryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%27" + startdate + "%27%20and%20%27" + enddate + "%27" 


// Crimes by location:
// Radius in meters:
var radius = 300;
// Lat and Long:
var latitude = 41.91673
var longitude = -87.631749

var locationqueryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location,%20" + latitude + ",%20" + longitude + ",%20" + radius + ")"
console.log(datequeryURL);

// AJAX Request:
$.ajax({
	url: locationqueryURL,
	method: "GET"
}).done(function(response) {
	console.log(response);
	for (var i = 0; i < response.length; i++) {
		console.log ("Crime #: " + i)
		console.log (response[i])
	};
});