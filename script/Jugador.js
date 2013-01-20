/**
 * 
 */

function Jugador(){
	this.id = generarId();
	this.nombre = null;
	this.rondas = new Array();
	this.rondas[this.rondas.length] = new Ronda();//???
}

Jugador.prototype.getId = function(){
	return this.id;
};
Jugador.prototype.setId = function(id){
	this.id = id;
};
Jugador.prototype.getNombre = function(){
	return this.nombre;
};
Jugador.prototype.setNombre = function(nombre){
	this.nombre = nombre;
};
Jugador.prototype.getRondas = function(){
	return this.rondas;
};
Jugador.prototype.setRondas = function(rondas){
	this.rondas = rondas;
};
Jugador.prototype.addRonda = function(ronda){
	this.rondas[this.rondas.length] = ronda;
};