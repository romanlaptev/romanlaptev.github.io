var landingObj = {};
console.log(landingObj);

document.addEventListener("DOMContentLoaded", function(e){
console.log(e.type);
//var msg = "-- document.readyState = " + document.readyState;
//console.log(msg);

	landingObj["cardCarousel"] = initCardCarousel();
	var intervalId = setInterval(function(){
	  landingObj.cardCarousel.nextSlide();
	}, 4000);

	document.addEventListener('keydown', event => {
	  if (event.key === "Escape" || event.keyCode === 27) {
		clearInterval(intervalId);
	  }
	});
	
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
		counter:1,
		//total:null,
		"nextSlide":_nextSlide,
		"prevSlide":_prevSlide,
	}
	
	var slides = cardCarousel["carousel"].querySelectorAll(".card");
	if(!slides){
console.error("error, not found cardCarousel slides...");
		return false;
	}

	//detect total number of visible slides
	cardCarousel["numVisibleSlides"] = 0;
	for(var n=0; n < slides.length; n++){
//console.log(n,slides[n])
		var elm = slides[n];
//console.log(n,elm.getBoundingClientRect().width);
		//if(elm.classList.contains("d-none")){
		if(elm.getBoundingClientRect().width === 0){
			continue;
		}
		cardCarousel["numVisibleSlides"]++;
	}//next	

	cardCarousel["counter"] = cardCarousel["numVisibleSlides"];
	cardCarousel["counterCurr"].textContent = cardCarousel["numVisibleSlides"];
	cardCarousel["counterTotal"].textContent = slides.length;
	
	if(cardCarousel["btnNext"]){
		cardCarousel["btnNext"].addEventListener("click",function(e){
//console.log(e);
			_nextSlide();
		});
	}
	if(cardCarousel["btnPrev"]){
		cardCarousel["btnPrev"].addEventListener("click",function(e){
//console.log(e);			
			cardCarousel["counter"]--;
			if(cardCarousel["counter"] < 1){
				cardCarousel["counter"] = slides.length;
			}
			cardCarousel["counterCurr"].textContent = cardCarousel["counter"];
			_prevSlide();
		});
	}
	return cardCarousel;
}//


function _nextSlide(){
	
	var cardCarousel = landingObj["cardCarousel"];
	if(!cardCarousel){
console.error("error, not found cardCarousel");
		return false;
	}
//console.log(cardCarousel);
	
	var slides = cardCarousel["carousel"].querySelectorAll(".card");
	if(!slides){
console.error("error, not found cardCarousel slides...");
		return false;
	}

	cardCarousel["counter"]++;
	if(cardCarousel["counter"] > slides.length){
		cardCarousel["counter"] = cardCarousel["numVisibleSlides"];
	}
	cardCarousel["counterCurr"].textContent = cardCarousel["counter"];
	
	//hide first visible slide
	var num = 0;
	slides[num].classList.add("d-none");
	
	//move first visible slide to the end slides
	var endNum = slides.length-1;
	//slides[5].after(slides[0]);
	slides[endNum].after(slides[num]);
	
	//show next slide (num + 3)
	//slides[3].classList.remove("d-none");
	num = cardCarousel["numVisibleSlides"];
//console.log(num);
	slides[num].classList.remove("d-none","d-none-375");
	
}//

function _prevSlide(){

	var cardCarousel = landingObj["cardCarousel"];
	if(!cardCarousel){
console.error("error, not found cardCarousel");
		return false;
	}

	var slides = cardCarousel["carousel"].querySelectorAll(".card");
//console.log(slides);
	if(!slides){
console.error("error, not found cardCarousel slides...");
		return false;
	}
	
	//move and show last slide to the start position slides
	//slides[0].before("BEFORE!!!");
	var endNum = slides.length-1;
	slides[0].before(slides[endNum]);
	slides[endNum].classList.remove("d-none","d-none-375");
	
	//refresh slides (because was changed slides order!!!)
	slides = cardCarousel["carousel"].querySelectorAll(".card");

	//hide last (pre-first) slide 
	var endNum = slides.length-1;
	slides[endNum].classList.add("d-none");

	//hide next slide (num + 3)
	//slides[2].classList.add("d-none");
	var num = cardCarousel["numVisibleSlides"];
	slides[num].classList.add("d-none");
	
}//
