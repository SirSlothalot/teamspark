var geoLocAPIkey = "AIzaSyCNGUqMSaQZeIH9R9nzczVkTEdz6dxtFDo";

$("#location").click(function() {
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+$("#location").text()+"&key="+geoLocAPIkey;
	// $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+$("#location").text()+"&key="+geoLocAPIkey, function(data) {
	// });
	$.getJSON(url, function(data) {
		$("#location").text(data.results[0].formatted_address);
	});
	
	//$("#location").text(url);
	//$("#location").text(data);


})