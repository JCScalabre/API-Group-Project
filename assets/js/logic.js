var startdate = "2015-10-3";
var enddate = "2015-10-4";

var datequeryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%27" + startdate + "%27%20and%20%27" + enddate + "%27"

// Crimes where Latitude are between:
var lowerlat = 41.91673
var upperlat = 41.91676
var latqueryURL = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=latitude%20between%20" + lowerlat + "%20and%20" + upperlat;
console.log("Lat query URL: " + latqueryURL);


$.ajax({
	url: latqueryURL,
	method: "GET"
}).done(function(response) {
	console.log(response);
	for (var i = 0; i < response.length; i++) {
		console.log ("Crime #: " + i)
		console.log (response[i].primary_type)
		console.log (response[i].description);
	}
})