$(document).ready(function () {
	var moviecharacters = ["Pikachu", "Eevee", "Charizard", " lucario", "bulbasaur", "Squirtle", "Gengar"];

	// Add buttons for original movies array
	function renderButtons() {
		$("#movie-buttons").empty();
		for (i = 0; i < moviecharacters.length; i++) {
			$("#movie-buttons").append("<button class='btn btn-success movieButtons' data-movie='" + moviecharacters[i] + "'>" + moviecharacters[i] + "</button>");
		}
	}
    renderButtons();

	// Adding a button for movie entered
	$("#add-movie").on("click", function () {
		event.preventDefault();
		var movie = $("#movie-input").val().trim();
		moviecharacters.push(movie);
		renderButtons();
		return;
	});
$("#movie-buttons").on("click","button", function(){
	event.preventDefault();
	//javascript, jQuery "this var represent button that got click""put character as a serch query"
	var characters=$(this).data("movie");
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+characters+"&api_key=NwZknsEGeazP1ZpdiVrp2EvqRgOwctS9&limit=10");
xhr.done(function(data) {
	 console.log("success got data", data);
	 console.log(data.data);
	 $("#charactersmovie").empty();
	 var gifscontext="";
	 data.data.forEach(e => {
		 console.log(e);
		var gifContainer = $('<div>');
		gifContainer.addClass('charactergif');
		var imageContainer = $('<div>');
		var image = $('<img>').attr("data-animated", e.images.fixed_height.url);
		image.attr('src', e.images.fixed_height_still.url);
		var pTag = $('<div>').text("rating : " + e.rating);
		pTag.addClass('rating');
		imageContainer.append(image);
		gifContainer.append(imageContainer);
		gifContainer.append(pTag);
		$("#charactersmovie").append(gifContainer);
	 });
	 
	 });

});
$("#charactersmovie").on("click",".charactergif img",function(){
	console.log("click on this image");
	var animatedurl=$(this).data("animated");
	var src=$(this).attr("src");
	$(this).attr("src",animatedurl);
	$(this).data("animated",src);
	console.log ("data",$(this).data("animated"),"src",$(this).attr("src"));
})



});

