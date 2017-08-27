// $(document).ready(function() {

var topics = ["Einstein", "Porsche", "Ferrari", "Mercedes", "Nikoli Tesla", "Tesla", "Schrodinger"];

function createButtons(x) {
	var buttons = $("<buttons type=\"button\" class=\"btn btn-default\"id=\"button\">"); //creates button tag (opening and closing)
	if(x){
		buttons = $("<buttons type=\"button\" class=\"btn btn-default\"id=\"button\">"); //creates button tag (opening and closing)
		buttons.text(x);
		$("#buttons").append(buttons);
	}else{
		for(var i = 0; i < topics.length; i++){
			console.log(topics[i]);
			buttons = $("<buttons type=\"button\" class=\"btn btn-default\"id=\"button\">"); //creates button tag (opening and closing)
			buttons.text(topics[i]); //adds text to the button tag
			$("#buttons").append(buttons); //appends buttons to #buttons
		}
	}
}

function addButtons() {
		var theValue = $("#inputValue").val().trim();
		createButtons(theValue);
}

function queryGIPHY(){
	var queryGET = "https://api.giphy.com/v1/gifs/search?api_key=a2764bf8a038465b9e42b7fa8be69f6c&q="+$(this).text()+"&limit=10&offset=0&rating=G&lang=en";
	$.ajax({
		url: queryGET,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var responding = response.data;
		// console.log(response.data[0].images.fixed_height_still);
		for(var i = 0; i < response.data.length; i++) {
			var imageStill = responding[i].images.fixed_height_still;
			var imageAnimated = responding[i].images.fixed_height;
			var imageDiv = $("<div>");
			var imageP = $("<p/>");
			var imageTag = $("<img>");
			imageDiv.addClass("col-xs-4");
			imageTag.attr("src", imageStill.url);
			imageTag.attr("data-state","still");
			imageTag.attr("data-still",imageStill.url);
			imageTag.attr("data-animated",imageAnimated.url);
			imageTag.addClass("image");
			var rating = responding[i].rating;
			imageP.text("Rating: "+rating.toUpperCase());
			imageDiv.append(imageTag);
			imageDiv.append(imageP);
			$("#images").append(imageDiv);
		}
	});
}

// $(".image").on("click",function() {
// 	if($(this).attr("data-state") === "still") {
// 		var animatedUrl = $(this).attr("data-animated");
// 		$(this).attr("data-state","animated");
// 		$(this).attr("src",animatedUrl);
// 		console.log("In still");
// 	}else if($(this).attr("data-state") !== "still") {
// 		var stillUrl = $(this).attr("data-still");
// 		$(this).attr("data-state","still");
// 		$(this).attr("src",stillUrl);
// 		console.log("In not still");
// 	}else{
// 		console.log("Error: Data-State was neither still or not still");
// 	}
// });

$(document).on("click", ".image", function() {
	if($(this).attr("data-state") === "still") {
		var animatedUrl = $(this).attr("data-animated");
		$(this).attr("data-state","animated");
		$(this).attr("src",animatedUrl);
		console.log("In still");
	}else if($(this).attr("data-state") !== "still") {
		var stillUrl = $(this).attr("data-still");
		$(this).attr("data-state","still");
		$(this).attr("src",stillUrl);
		console.log("In not still");
	}else{
		console.log("Error: Data-State was neither still or not still");
	}
});

$("#resetImages").on("click",function(){
	$("#images").text("");
});

createButtons();
createButtons("Bugatti");
$("#submit").on("click",addButtons); //If #submit is clicked it runs addButtons
// $("#button").on("click",queryGIPHY); //If any #button is clicked it runs queryGIPHY
$(document).on("click", "#button", queryGIPHY);

// });