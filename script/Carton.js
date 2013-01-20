/**
 * 
 */

function Carton(){
	this.generated = false;
	this.nodos = new Array(5);
	for(var i = 0; i <= 4; i++){
		this.nodos[i] = new Array(5);
	}
}

Carton.prototype.wasGenerated = function(){
	return this.generated;
};

Carton.prototype.setGenerated = function(generated){
	this.generated = generated; 
};

Carton.prototype.setNodos = function(nodos){
	this.nodos = nodos;
};

Carton.prototype.getNodos = function(){
	return this.nodos;
};

Carton.prototype.getRowValues = function (row){
	var arr = new Array();
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			if(i == row){
				if(this.getNodos()[i][j] != null){
					arr[arr.length] = this.getNodos()[i][j].getValor();					
				}
			}
		}
	}
	return arr;
};

Carton.prototype.getColValues = function (col){
	var arr = new Array();
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			if(j == col){
				if(this.getNodos()[i][j] != null){
					arr[arr.length] = this.getNodos()[i][j].getValor();					
				}
			}
		}
	}
	return arr;
};

Carton.prototype.getRowNodes = function (row){
	var arr = new Array();
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			if(i == row){
				if(this.getNodos()[i][j] != null){
					arr[arr.length] = this.getNodos()[i][j];					
				}
			}
		}
	}
	return arr;
};

Carton.prototype.getColNodes = function (col){
	var arr = new Array();
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			if(j == col){
				if(this.getNodos()[i][j] != null){
					arr[arr.length] = this.getNodos()[i][j];					
				}
			}
		}
	}
	return arr;
};

Carton.prototype.generarNodos = function(){
	var value, mixValue, maxValue;
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			maxValue = (j + parseInt(1))*15;
			minValue = maxValue-14;
			do{
				value = randomFromInterval(minValue, maxValue);
			}while(searchInArray(this.getColValues(j) , value));			
			nodo = new NodoCarton();
			nodo.setValor(value);
			nodo.setChildCarton(true);
			nodo.setFila(i);
			nodo.setColumna(j);
			if(i == 2 && j == 2){
				nodo.setValor(0);
			}
			this.getNodos()[i][j] = nodo;
		}
	}
	this.setGenerated(true);
};

Carton.prototype.generarDOM = function(nombreJugador){
	var carton, nodo, prueba;
	carton = document.createElement("div");
	carton.setAttribute("class", "carton");
	for (var i = 0; i <= 4; i++){
		var txtHeader;
		switch (i){
			case 0:
				txtHeader = "b";
				break;
			case 1:
				txtHeader = "i";
				break;
			case 2:
				txtHeader = "n";
				break;
			case 3:
				txtHeader = "g";
				break;
			case 4:
				txtHeader = "o";
				break;
		}
		div = document.createElement("div");
		div.setAttribute("class", "header");
		div.appendChild(document.createTextNode(txtHeader));
		carton.appendChild(div);
	}
	for (var i = 0; i <= 4; i++){
		for (var j = 0; j <= 4; j++){
			if(this.getNodos()[i][j] != null){
				carton.appendChild(this.getNodos()[i][j].generarDOM());				
			}
		}
	}
	playerName = document.createElement("div");
	playerName.setAttribute("class", "footer");
	playerName.appendChild(document.createTextNode("Jugador: "+nombreJugador));
	carton.appendChild(playerName);
	return carton;
};

Carton.prototype.marcar = function(numeroSeleccion){
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			if(this.getNodos()[i][j].getValor() == numeroSeleccion){
				this.getNodos()[i][j].setMarcado(true);
			}
		}
	}
};

Carton.prototype.checkLineaHorizontal = function(){
	var lineaFila;
	var contLineaFila = 0;
	for(var i = 0; i <= 4; i++){
		lineaFila = true;
		for(var j = 0; j <= 4; j++){
			if(!this.nodos[i][j].getMarcado() && !(i==2 && j==2)){
				lineaFila = false;
				break;
			}			
		}
		if(lineaFila){
			contLineaFila++;
			var arrLineaFila = this.getRowNodes(i);
			for(var k = 0; k < arrLineaFila.length ; k++ ){
				//alert(arrLineaFila[k].getValor()+ " "+i);
				arrLineaFila[k].setNodoFila(true);
			}
		}
	}
	return contLineaFila;
};

Carton.prototype.checkLineaVertical = function(){
	var lineaColumna;
	var contLineaColumna = 0;
	for(var j = 0; j <= 4; j++){
		lineaColumna = true;
		for(var i = 0; i <= 4; i++){
			if(!this.nodos[i][j].getMarcado() && !(i==2 && j==2)){
				lineaColumna = false;
				break;
			}
		}
		if(lineaColumna){
			contLineaColumna++;
			var arrLineaColumna = this.getColNodes(j);
			for(var k = 0; k < arrLineaColumna.length ; k++ ){
				//alert(arrLineaColumna[k].getValor+ " "+j);
				arrLineaColumna[k].setNodoFila(true);
			}
		}
	}
	return contLineaColumna;
};

Carton.prototype.checkBingo = function(){
	for(var i = 0; i <= 4; i++){
		for(var j = 0; j <= 4; j++){
			if(!this.nodos[i][j].getMarcado() && !(i==2 && j==2)){
				return false;
			}
		}
	}
	return true;
};