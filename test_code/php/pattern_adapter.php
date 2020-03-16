<?php
//https://www.youtube.com/watch?v=vJAt-7VCz80
//Реализация паттернов ООП в PHP

interface WeatherService {
	//function setPosition( string $city );//PHP7
	function setPosition( $city );
	function getTemperature();
	function getWind();
	function getFeelsLikeTemperature();
}//end

class RussianWeather implements WeatherService {

	private $city = null;

	//public function setPosition( string $city) {//PHP7
	public function setPosition( $city) {
		$this->city = $city;
	}//end

	public function getTemperature() {
		switch( $this->city ){
			case "Moskow": return 25;
			case "Novosibirsk": return 18;
			default: return 0;
		}
	}//end

	public function getWind() {
		switch( $this->city ){
			case "Moskow": return 5;
			case "Novosibirsk": return 8;
			default: return 0;
		}
	}//end

	public function getFeelsLikeTemperature() {
		switch( $this->city ){
			case "Moskow": return 35;
			case "Novosibirsk": return 28;
			default: return 10;
		}
	}//end

}//end class



class USWeatherService {

	//public function getTemperature( float $latitude, float $longtitude ) {//PHP7
	public function getTemperature( $latitude, $longtitude ) {

		if( $latitude == 38.53 && $longtitude == 77.02 ) {//Washington
			return 86;
		}

		if( $latitude == 40.43 && $longtitude == 73.59 ) {//New York
			return 95;
		}

		return 80;
	}//end

	//public function getWind( float $latitude, float $longtitude ) {//PHP7
	public function getWind( $latitude, $longtitude ) {
		if( $latitude == 38.53 && $longtitude == 77.02 ) {//Washington
			return 1000;
		}

		if( $latitude == 40.43 && $longtitude == 73.59 ) {//New York
			return 2000;
		}

		return 1500;
	}//end

}//end class



class USWeatherAdapter  implements WeatherService {
	private $latitude;
	private $longtitude;
	private $service;

	public function __construct( USWeatherService $service ) {
		$this->service = $service;
	}//end

	public function getTemperature() {
		$temperature_f = $this ->service->getTemperature( $this->latitude, $this->longtitude );
		return ( $temperature_f-32)*5/9;// convert F -> C
	}//end

	public function getWind() {
		$wind_foot_min = $this ->service->getWind( $this->latitude, $this->longtitude );
		return $wind_foot_min/196.85;// convert ft/min -> m/s
	}//end

	public function getFeelsLikeTemperature() {
		$temperature = $this ->getTemperature();
		$wind = $this ->getWind();
		$feels_temperature = 1.04 * $temperature - $wind * 0.65-0.9;
		return $feels_temperature;
	}//end

	//public function setPosition( string $city ) {//PHP7
	public function setPosition( $city ) {

		switch( $city ){
			case "Washington": 
				$this->latitude = 38.53;
				$this->longtitude = 77.02;
				break;

			case "New York":
				$this->latitude = 40.43;
				$this->longtitude = 73.59;
				break;
		}

	}//end

}//end class


$service = new RussianWeather();
$city = "Moskow";
$service->setPosition( $city );

echo "<h2>$city</h2>\n";
echo "<ul>\n";
echo "<li>Temperature: " .$service->getTemperature()."</li>\n";
echo "<li>Wind (m/sec): " .$service->getWind()."</li>\n";
echo "<li>Feels is like temp.: " .$service->getFeelsLikeTemperature()."</li>\n";
echo "</ul>\n";

$service = new USWeatherAdapter( new USWeatherService() );
$city = "Washington";
$service->setPosition( $city );

echo "<h2>$city</h2>\n";
echo "<ul>\n";
echo "<li>Temperature: " .$service->getTemperature()."</li>\n";
echo "<li>Wind (m/sec): " .$service->getWind()."</li>\n";
echo "<li>Feels is like temp.: " .$service->getFeelsLikeTemperature()."</li>\n";
echo "</ul>\n";

?>
