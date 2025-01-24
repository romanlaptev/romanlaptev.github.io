var landingObj = {};
console.log(landingObj);

document.addEventListener("DOMContentLoaded", function(e){
console.log(e.type);
//var msg = "-- document.readyState = " + document.readyState;
//console.log(msg);

	landingObj["cardCarousel"] = initCardCorousel();
	
},false);//end dom load

function initCardCorousel(){
	var _cardCarousel = document.querySelector("#card-carousel");
	if(!_cardCarousel){
console.error("error, not found cardCarousel");
	}
	
	var cardCarousel = {
		carousel:_cardCarousel,
		btnNext: document.querySelector("#card-carousel-btn-next"),
		btnPrev: document.querySelector("#card-carousel-btn-prev"),
		counterCurr: document.querySelector("#card-carousel-current"),
		counterTotal: document.querySelector("#card-carousel-total"),
		counter:null,
		total:null,
	}
	
	cardCarousel["counter"] = 1;
	cardCarousel["total"] = 6;

	cardCarousel["counterCurr"].textContent = cardCarousel["counter"];
	cardCarousel["counterTotal"].textContent = cardCarousel["total"];
	
	if(cardCarousel["btnNext"]){
		cardCarousel["btnNext"].addEventListener("click",function(e){
//console.log(e);
			cardCarousel["counter"]++;
			cardCarousel["counterCurr"].textContent = cardCarousel["counter"];
		});
	}
	if(cardCarousel["btnPrev"]){
		cardCarousel["btnPrev"].addEventListener("click",function(e){
//console.log(e);			
			cardCarousel["counter"]--;
			cardCarousel["counterCurr"].textContent = cardCarousel["counter"];
		});
	}
	return cardCarousel;
}//
