// var geoLocAPIkey = "AIzaSyCNGUqMSaQZeIH9R9nzczVkTEdz6dxtFDo";

// $("#location").click(function() {
// 	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+$("#location").text()+"&key="+geoLocAPIkey;
// 	// $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+$("#location").text()+"&key="+geoLocAPIkey, function(data) {
// 	// });
// 	$.getJSON(url, function(data) {
// 		$("#location").text(data.results[0].formatted_address);
// 	});
	
// 	//$("#location").text(url);
// 	//$("#location").text(data);
// })


// $('#uploadPic').click(function(){
// 	$("#fileLoc").text("Changed");
// });



// $(document).ready(function(){
//     $('#uploadPic').click(function(e){
//         e.preventDefault();
//         $(this).before("<input name='file[]' type='file'/>");
//     });
// });


$('#data').change( function(event) {
    $("#profileImg").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
});



// $('#uploadPic').click(function(e){
// 	$("#profileImg").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
//     // e.preventDefault();
//     // $(this).before("<input name='file[]' type='file'/>");
// });
