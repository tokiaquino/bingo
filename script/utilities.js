/**
 * 
 */
function randomFromInterval(from,to){
    var ret = Math.floor(Math.random()*(to-from+1)+from);
    return ret;
}

function generarId(){
	var Dia = new Date();
	var d = Dia.getDay();
	var n = Dia.getMonth();
	var a = Dia.getFullYear();
	var m = Dia.getMinutes();
	var h = Dia.getHours();
	var s = Dia.getSeconds();
	var ms = Dia.getMilliseconds();
	var Num = "" + a + n + d + h + m + s + ms;
	return Num;
}

function generateStringTime(){
	var Dia = new Date();
	var d = Dia.getDay();
	var n = Dia.getMonth();
	var a = Dia.getFullYear();
	var m = Dia.getMinutes();
	var h = Dia.getHours();
	var s = Dia.getSeconds();
	var ret = a+ "/" +n+ "/" +d+ " " +h+ ":" +m+ ":" +s;	
	return ret;
}

function createElement(elem){
	return document.createElement(elem);
}

function removeAllChild(o){
	if(o.hasChildNodes()){
		while( o.hasChildNodes() ){
			o.removeChild(o.lastChild);
		}		
	}
}

function addBingoStringToValue(value){
	var ret;
	if(value > 0 && value < 16){
		ret = "B";
	}
	if(value > 15 && value < 31){
		ret = "I";
	}
	if(value > 30 && value < 46){
		ret = "N";
	}
	if(value > 45 && value < 61){
		ret = "G";
	}
	if(value > 60){
		ret = "O";
	}
	return ret+"-"+value;
}

function sleep(milliSeconds){
	var startTime = new Date().getTime(); // get the current time
	while (new Date().getTime() < startTime + milliSeconds){}; // hog cpu
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}