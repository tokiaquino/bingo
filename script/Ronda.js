/**
 * 
 */

function Ronda(nroRonda){
	this.nroRonda = nroRonda;
	this.carton = new Carton();
	this.linea = 0;
	this.bingo = false;
	this.puntos = 0;
}

Ronda.prototype.getRonda = function(){
	return this.nroRonda;
};

Ronda.prototype.setRonda = function(nroRonda){
	this.nroRonda = nroRonda;
};

Ronda.prototype.getCarton = function(){
	return this.carton;
};

Ronda.prototype.setCarton = function(carton){
	this.carton = carton;
};

Ronda.prototype.getLinea = function(){
	return this.linea;
};

Ronda.prototype.setLinea = function(linea){
	this.linea = linea;
};

Ronda.prototype.getBingo = function(){
	return this.bingo;
};

Ronda.prototype.setBingo = function(bingo){
	this.bingo = bingo;
};

Ronda.prototype.getPuntos = function(){
	if(this.getLinea() > 0){
		this.puntos = this.getLinea() * 2;
	}
	if(this.getBingo()){
		return parseInt(this.puntos) + parseInt(5);
	}
	return this.puntos;
};

Ronda.prototype.setpuntos = function(puntos){
	this.puntos = puntos;
};