// When ready...
window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});

// Catch touchevents on dont_scroll-objects
$(".container").bind("touchmove", {}, function(event){
  event.preventDefault();
});

window.onload = function() {

  var fileInput = document.getElementById('mainInput');
  fileInput.onchange = function() {
    /*$('#image-temp').css( "display", "none" );*/
    var file = fileInput.files[0];

    var abc = new FileReader();

    abc.readAsBinaryString(file);
    abc.onload = function(){

        var finalExif = EXIF.readFromBinaryFile(new BinaryFile(abc.result));
    
        //alert(finalExif.ImageHeight + " " + finalExif.DateTimeOriginal + " " +finalExif.Orientation);
        var mpImg = new MegaPixImage(file);

        var imgOrient = 1;

        if(finalExif.Orientation == 6){
            //alert("rotate it");
            imgOrient = 6;
            //alert("now change it to" + imgOrient);
        }else{
            imgOrient = 1;
        }

        //console.log(mpImg);
        //console.log(mpImg.srcImage);

         //Render resized image into canvas element.
        var resCanvas1 = document.getElementById('canvasImage');
        //mpImg.render(resCanvas1, {width: 193, height: 204, quality:1, orientation: imgOrient});
        mpImg.render(resCanvas1, {width: 54, maxHeight: 72, quality:1, orientation: imgOrient});
        console.log(canvasImage.toDataURL());

    }
    $("#hand-outline").fadeOut(400);
    $("#photo-button").fadeOut(400);
    $("#s4-camera").fadeOut(400);
    $("#text-2").fadeOut(400);
	$("#text-3").fadeIn(400);
    $("#final-camera").animate({"left": "0px"}, 800);
    ga('send', 'event', 'userAction', 'dualShotPictureTaken');
  };

};

$(document).ready(function() {


	 $("#home").hammer({prevent_default:true}).bind("swiperight", function(ev){

	 	//alert("swiperight"); 
	 	$("#landing-title, #sw-right, #landing-phone").fadeOut(200);
	 	$("#home").animate({"background-position-x": "-100px"}, 500)

	 });

	 $("#home").hammer({prevent_default:true}).bind("swipeup", function(ev){

	 	/*alert("swipeup"); 
	 	$("#landing-title, #sw-right, #landing-phone").fadeOut(200);
	 	$("#home").toggleClass("home-left");*/
	 	ga('send', 'event', 'navigation', 'swipeUpToDiscoverPage');  
	 	window.location.href = '/S4/discover.html';

	 });

	 /*relation page*/
	 $("#slidephone").hammer({prevent_default:true}).bind("swipeup", function(ev){
 		
 		ga('send', 'event', 'userAction', 'swipeUpToSlidePhone');
	 	$("#slidephone").animate({"top": "-75px"}, 600);

	 });

	 $("#slidephone").hammer({prevent_default:true}).bind("swipedown", function(ev){
 		
 		ga('send', 'event', 'userAction', 'swipeDownToSlidePhone');
	 	$("#slidephone").animate({"top": "275px"}, 600);

	 });

	 /*health page*/
	 $("#info-top").hammer().bind("hold", function(ev){
 		
 		ga('send', 'event', 'userAction', 'holdThePhoneToSeeHealthInfo');
	 	$("#info-top").animate({"opacity": "1"}, 300);

	 });

	 $("#tap-health-info").hammer().bind("tap", function(ev){
 		
 		ga('send', 'event', 'navigation', 'tapToHealthInfoPage');
	 	window.location.href = '/S4/healthpage-2.html';

	 });

	 $("#hotspot-for-health").hammer().bind("tap", function(ev){
 		
 		ga('send', 'event', 'navigation', 'backToHealthPage');
	 	window.location.href = '/S4/healthpage.html';

	 });


	  /*fun page*/
	  $("#s4-camera").hammer().bind("tap", function(ev){
 		
	 	$("#s4-camera").addClass("camera-straightened");
	 	$("#photo-button").fadeIn(400);
	 	$("#text-1").fadeOut(400);
	 	$("#text-2").fadeIn(400);

	 });

	 /*navigation*/
	 $("#fun").hammer().bind("tap", function(ev){

	 	ga('send', 'event', 'navigation', 'tapToFunPage');
	 	window.location.href = '/S4/funpage.html';

	 });

	 $("#relationship").hammer().bind("tap", function(ev){

	 	ga('send', 'event', 'navigation', 'tapToRelationshipPage');
	 	window.location.href = '/S4/relpage.html';

	 });

	 $("#health").hammer().bind("tap", function(ev){

	 	ga('send', 'event', 'navigation', 'tapToHealthPage');
	 	window.location.href = '/S4/healthpage.html';

	 });

	 $("#convenience").hammer().bind("tap", function(ev){

	 	ga('send', 'event', 'navigation', 'tapToConveniencePage');
	 	window.location.href = '/S4/conpage.html';

	 });

	 
});