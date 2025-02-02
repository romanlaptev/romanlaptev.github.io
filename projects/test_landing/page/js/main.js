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
	
	//----------
//console.log(window.screen.width);
	if(window.screen.width <= 375){
		landingObj["carousel2"] = initCarousel2();
	}
	
},false);//end dom load

function initCarousel2(){
	var _carousel = document.querySelector("#carousel2");
	if(!_carousel){
console.error("error, not found #carousel2");
		return false;
	}
	var carouselObj = {
		carousel:_carousel,
		btnNext: document.querySelector("#carousel2-btn-next"),
		btnPrev: document.querySelector("#carousel2-btn-prev"),
		controlDots: document.querySelector("#carousel2-control-dots"),
		counter:1,
		numClick:5
	}
	
	if(carouselObj["btnNext"]){
		carouselObj["btnNext"].addEventListener("click",function(e){
			_nextSlide();
		});
	}
	if(carouselObj["btnPrev"]){
		carouselObj["btnPrev"].addEventListener("click",function(e){
			_prevSlide();
		});
	}
	
	//move airplane photo
	carouselObj.carousel.before(
		carouselObj.carousel.querySelector(".cell-7 .section-photo-wrapper")
	);	
	document.querySelector(".s3 .section-photo-wrapper").classList.add("fix-size");
	
	//------ copy slides form .card-list
	carouselObj["slides"] = {
		"cell_1": carouselObj.carousel.querySelector(".cell-1").cloneNode("true"),
		"cell_2": carouselObj.carousel.querySelector(".cell-2").cloneNode("true"),
		"cell_3": carouselObj.carousel.querySelector(".cell-3").cloneNode("true"),
		"cell_4": carouselObj.carousel.querySelector(".cell-4").cloneNode("true"),
		"cell_5": carouselObj.carousel.querySelector(".cell-5").cloneNode("true"),
		"cell_6": carouselObj.carousel.querySelector(".cell-6").cloneNode("true"),
		"cell_7": carouselObj.carousel.querySelector(".cell-7").cloneNode("true"),
	};
	
	//------ remove slides, clear .card-list
	carouselObj.carousel.querySelector(".cell-1").remove();
	carouselObj.carousel.querySelector(".cell-2").remove();
	carouselObj.carousel.querySelector(".cell-3").remove();
	carouselObj.carousel.querySelector(".cell-4").remove();
	carouselObj.carousel.querySelector(".cell-5").remove();
	carouselObj.carousel.querySelector(".cell-6").remove();
	carouselObj.carousel.querySelector(".cell-7").remove();

	//------ insert start slides 1-2
	carouselObj.carousel.append(
		carouselObj["slides"]["cell_1"],
		carouselObj["slides"]["cell_2"]
	);	
	
	//-------
	carouselObj.controlDots.querySelector("svg:nth-child(1)").classList.add("active");
	
	return carouselObj;

	function _nextSlide(){
		carouselObj["btnNext"].classList.remove("disabled");
		carouselObj["btnPrev"].classList.remove("disabled");
		carouselObj["counter"]++;
		if(carouselObj["counter"] > carouselObj["numClick"]){
console.log("end of slides...", carouselObj["counter"]);
			carouselObj["counter"]=carouselObj["numClick"];
			carouselObj["btnNext"].classList.add("disabled");
			return false;
		}
		_drawSlides();
	}//		
	
	function _prevSlide(){
		carouselObj["btnNext"].classList.remove("disabled");
		carouselObj["btnPrev"].classList.remove("disabled");
		carouselObj["counter"]--;
		if(carouselObj["counter"] < 1){
console.log("end of slides...", carouselObj["counter"]);
			carouselObj["counter"]=1;
			carouselObj["btnPrev"].classList.add("disabled");
			return false;
		}
		_drawSlides();
	}//

	function _drawSlides(){
		carouselObj.carousel.innerHTML="";
		
		if( carouselObj["counter"] === 1){
			carouselObj.carousel.append(
				carouselObj["slides"]["cell_1"],
				carouselObj["slides"]["cell_2"]
			);	
		}
		
		if( carouselObj["counter"] === 2){
			carouselObj.carousel.append(
				carouselObj["slides"]["cell_3"]
			);	
		}
		
		if( carouselObj["counter"] === 3){
			carouselObj.carousel.append(
				carouselObj["slides"]["cell_4"],
				carouselObj["slides"]["cell_5"]
			);	
		}

		if( carouselObj["counter"] === 4){
			carouselObj.carousel.append(
				carouselObj["slides"]["cell_6"]
			);	
		}

		if( carouselObj["counter"] === 5){
			carouselObj.carousel.append(
				carouselObj["slides"]["cell_7"]
			);	
		}
		
		//------------
		//carouselObj.controlDots.querySelector("svg:nth-child(1)").classList.add("active");
		var dots = carouselObj.controlDots.querySelectorAll("svg");
//console.log(dots);
		dots.forEach(function(elm, num){
			elm.classList.remove("active");
			if( num+1 === carouselObj["counter"] ){
				elm.classList.add("active");
			}
		});//next
		
	}//
	
}//end initCarousel2()


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
	
}//end initCardCarousel()


