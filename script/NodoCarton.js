/**
 * 
 */

function NodoCarton(){
	this.id = generarId();
	this.valor = null;
	this.marcado = false;
	this.fila = null;
	this.columna = null;
	this.childCarton = false;
	this.nodoFila = false;
}

NodoCarton.prototype.getId = function(){
	return this.id;
};

NodoCarton.prototype.setId = function(id){
	this.id = id;
};

NodoCarton.prototype.getValor = function(){
	return this.valor;
};

NodoCarton.prototype.setValor = function(valor){
	this.valor = valor;
};

NodoCarton.prototype.getMarcado = function(){
	return this.marcado;
};

NodoCarton.prototype.setMarcado = function(marcado){
	this.marcado = marcado;
};

NodoCarton.prototype.getFila = function(){
	return this.fila;
};

NodoCarton.prototype.setFila = function(fila){
	this.fila = fila;
};

NodoCarton.prototype.getColumna = function(){
	return this.columna;
};

NodoCarton.prototype.setColumna = function(columna){
	this.columna = columna;
};

NodoCarton.prototype.isChildCarton = function(){
	return this.childCarton;
};

NodoCarton.prototype.setChildCarton = function(childCarton){
	this.childCarton = childCarton;
};

NodoCarton.prototype.isNodoFila = function(){
	return this.nodoFila;
};

NodoCarton.prototype.setNodoFila = function(nodoFila){
	this.nodoFila = nodoFila;
};

NodoCarton.prototype.generarDOM = function(){
	var nodo;
	nodo = document.createElement("div");
	nodo.setAttribute("id", this.getId());
	nodo.setAttribute("class", "s-"+this.getValor());		
	valorNumero = document.createElement("div");
	valorNumero.appendChild(document.createTextNode(this.getValor()));
	if( this.getMarcado() ){
		imgSelect = document.createElement("img");
		if(this.isNodoFila()){
			nodo.setAttribute("class", "s-fila s-"+this.getValor());
			valorNumero.setAttribute("class", "numeroNodoLinea");
			imgSelect.setAttribute("src", "images/checkLinea.png");

		}else{			
			valorNumero.setAttribute("class", "numeroNodoMarcado");
			imgSelect.setAttribute("src", "images/check.png");
		}
		imgSelect.setAttribute("alt", "sel");
		nodo.appendChild(imgSelect);
	}else{
		valorNumero.setAttribute("class", "numeroNodo");
	}
	nodo.appendChild(valorNumero);
	return nodo;
};

NodoCarton.prototype.generarLargeDOM = function(){
	var nodo;
	nodo = document.createElement("div");
	nodo.setAttribute("id", this.getId());
	nodo.setAttribute("class", "l-"+this.getValor());//si es que consigo que oscar haga las imagenes grandes
	valorNumero = document.createElement("div");
	valorNumero.setAttribute("class", "numeroNodoLarge");
	valorNumero.appendChild(document.createTextNode(addBingoStringToValue(this.getValor())));
	nodo.appendChild(valorNumero);
	return nodo;
};