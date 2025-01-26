var landingObj = {};
console.log(landingObj);

document.addEventListener("DOMContentLoaded", function(e){
console.log(e.type);
//var msg = "-- document.readyState = " + document.readyState;
//console.log(msg);

	landingObj["cardCarousel"] = initCardCarousel();
	
},false);//end dom load

function initCardCarousel(){
	var _cardCarousel = document.querySelector("#card-carousel");
	if(!_cardCarousel){
console.error("error, not found cardCarousel");
		return false;
	}
	
	var cardCarousel = {
		carousel:_cardCarousel,
		btnNext: document.querySelector("#card-carousel-btn-next"),
		btnPrev: document.querySelector("#card-carousel-btn-prev"),
		counterCurr: document.querySelector("#card-carousel-current"),
		counterTotal: document.querySelector("#card-carousel-total"),
		counter:null,
		//total:null,
	}
	
	var slides = cardCarousel["carousel"].querySelectorAll(".card");
	if(!slides){
console.error("error, not found cardCarousel slides...");
		return false;
	}
	cardCarousel["counterCurr"].textContent = 3;
	cardCarousel["counterTotal"].textContent = slides.length;

	//detect total number of visible slides
	cardCarousel["numVisibleSlides"] = 0;
	for(var n=0; n < slides.length; n++){
//console.log(n,slides[n])
		var elm = slides[n];
		if(!elm.classList.contains("d-none")){
			cardCarousel["numVisibleSlides"]++;
		}
	}//next	
	
	if(cardCarousel["btnNext"]){
		cardCarousel["btnNext"].addEventListener("click",function(e){
//console.log(e);
			nextSlide();
		});
	}
	if(cardCarousel["btnPrev"]){
		cardCarousel["btnPrev"].addEventListener("click",function(e){
//console.log(e);			
			//cardCarousel["counter"]--;
			//cardCarousel["counterCurr"].textContent = cardCarousel["counter"];
			prevSlide();
		});
	}
	return cardCarousel;
}//


function nextSlide(){
	var slides = landingObj["cardCarousel"]["carousel"].querySelectorAll(".card");
	if(!slides){
console.error("error, not found cardCarousel slides...");
		return false;
	}
	
	//hide first visible slide
	var num = 0;
	slides[num].classList.add("d-none");
	
	//move first visible slide to the end slides
	var endNum = slides.length-1;
	//slides[5].after(slides[0]);
	slides[endNum].after(slides[num]);
	
	//show next slide (num + 3)
	//slides[3].classList.remove("d-none");
	var num = num + landingObj["cardCarousel"]["numVisibleSlides"];
	slides[num].classList.remove("d-none");
	
	//landingObj["cardCarousel"]["counterCurr"].textContent = landingObj["cardCarousel"]["numFirstVisibleSlide"];
	
}//

function prevSlide(){
	var slides = landingObj["cardCarousel"]["carousel"].querySelectorAll(".card");
//console.log(slides);
	if(!slides){
console.error("error, not found cardCarousel slides...");
		return false;
	}
	//move last slide to the start slides
	//slides[0].before("BEFORE!!!");

	var endNum = slides.length-1;
	slides[0].before(slides[endNum]);
	slides[endNum].classList.remove("d-none");

	//hide next slide (num + 3)
	slides[2].classList.add("d-none");
	var num = num + landingObj["cardCarousel"]["numVisibleSlides"];
	slides[num].classList.add("d-none");
/*	
	//refresh slides (change slides order!!!)
	slides = landingObj["cardCarousel"]["carousel"].querySelectorAll(".card");

	//move and hide second visible slide to the end slides
	var endNum = slides.length-1;
	slides[endNum].after(slides[1]);
	slides[1].classList.add("d-none");
*/
	
}//
