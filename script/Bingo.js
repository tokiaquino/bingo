/**
 * 
 */
var nombres= ["Adam Levine - Maroon 5", "Adrian Smith - Iron Maiden", "Andy Summers - The Police","Angus John - ACDC","Ace Frehley - Kiss","Avril Lavigne", "Axel Rose - Guns and Roses", "B.B.king", "Billie Joe Amstrong - Green Day", "Jon Bon Jovi", "Bono - U2", "Bon Scott - ACDC", "Bruce Dickinson - Iron Maiden", "Chester Bennington - Linkin Park", "Dave Mustaine - Megadeth", "Ronnie James Dio - Black Sabbath", "The Edge - U2", "Elvis Presley", "flea - Red Hot Chili Peppers", "Fred Durnst  - Limp biskit", "Gene Simmons - Kiss", "George Harrison  - The Beatles", "Glenn Hughes - Def Leppard", "Dave  grohl - Foo Fighters", "Iggy Pop", "Michael Jackson", "James Hetfield - Metallica", "Jim Morrison - the Doors", "Jimmy Hendrix", "Joe Perry - Aerosmith", "Joey Ramone - The Ramones", "John Frusciante - Red Hot Chili Peppers", "Anthony Keidis - Red hot chili pepers", "Keith Richards - Rolling Stones", "Kerry kerrang - Slayer", "Jonathan Davis - Korn", "Kurt Cobain - Nirvana", "Larry Mullen jr. - U2", "Lars Ulrich - Metallica", "Lemmy Kilmister - MotorHead", "John Lennon - The Beatles", "Liam Gallagher - Oasis", "Brad Delson - Linkin Park","Lydon Collins - Sex Pistols", "Brian May - Queen", "Freddie Mercury - Queen", "Mick Jagger - Rolling Stones", "Noel Gallagher -  Oasis", "Ozzy Osbuorne - Black Sabbath","Paul Mcartney - The Beatles", "Peter Criss - Kiss", "Phil Collins", "Pul pul - Ska-p", "Thom Yorke - RadioHead", "Michael Stipes - R.E.M.", "Ringo Starr  - the Beatles", "Robert smith - The Cure", "Ron Wood - Rolling Stones", "Klaus Meine  - Scorpions", "Sid Vicius - sex Pistols", "Slash - GunsandRoses", "Billy Corgan - Smashing Pumpkins", "Paul Stanley - Kiss", "Steve harris -  Iron maiden", "Gordon Matthew Sumner - The police", "Deryck Whibley - Sum 41", "Tarja Turunen - NightWish", "Tommy Araya - Slayer", "Travis Barker - Blink 182", "Tre cool - Green day", "Steven Tyler -Aerosmith", "Vanilla Ice", "Gerard Way - My Chemical Romance", "Wes Borland - Limp Biskit", "Yngwie Malmsteen"];
function Bingo(){
	//variables globales para el bingo
	this.playing = false;
	this.nroRondas = 0; // Cantidad de Rondas a jugarse
	this.nroRonda = 0; // Nro de ronda jugandose actualmente
	this.jugadores = new Array();
	this.intervalId;
	this.nroJugada;
	this.linea = false; // Por ronda(Si es por ronda, no esta muy bien que declare aca, pero bue!!!!)
	this.sorteoTime = null; //Hora de sorteo;
	
	
	// Los 4 DIV's que estan en el index, 
	// para acceder cuando necesite nomas.
	// Cada uno tiene su getter!!!
	this.tablero = document.getElementById("tablero");
	this.puntajes = document.getElementById("puntajes");
	this.controles = document.getElementById("controles");
	this.sorteo = document.getElementById("sorteo");
	this.mesa = document.getElementById("mesa");
	this.consola = document.getElementById("consola");
	this.log = document.getElementById("log");
	
	this.resultados = new Array(75);
	for(var i = 0; i <= this.resultados.length-1; i++){
		this.resultados[i] = null;
	}
}

Bingo.prototype.getNroRondas = function(){
	return this.nroRondas;
};

Bingo.prototype.setNroRondas = function(nroRondas){
	this.nroRondas = nroRondas;
};

Bingo.prototype.getNroRonda = function(){
	return this.nroRonda;
};

Bingo.prototype.setNroRonda = function(nroRonda){
	this.nroRonda = nroRonda;
};

Bingo.prototype.getTablero = function(){
	return this.tablero;
};

Bingo.prototype.getPuntajes = function(){
	return this.puntajes;
};

Bingo.prototype.getControles = function(){
	return this.controles;
};

Bingo.prototype.getSorteo = function(){
	return this.sorteo;
};

Bingo.prototype.getMesa = function(){
	return this.mesa;
};

Bingo.prototype.getConsola = function(){
	return this.consola;
};

Bingo.prototype.getLog = function(){
	return this.log;
};

Bingo.prototype.setNroJugada = function(nroJugada){
	this.nroJugada = nroJugada;
};

Bingo.prototype.getNroJugada = function(){
	return this.nroJugada;
};

Bingo.prototype.setLinea = function(linea){
	this.linea = linea;
};

Bingo.prototype.isLinea = function(){
	return this.linea;
};


Bingo.prototype.getSorteoTime = function(){
	return this.sorteoTime;
};

Bingo.prototype.setSorteoTime = function(sorteoTime){
	this.sorteoTime = sorteoTime;
};

/* 
 * Para agregar cada letra de  la palabra BINGO
 * en el tablero antes de cada fila 
 */
Bingo.prototype.addString = function(valor){ 
	var add = false;
	switch (valor){
		case 1:
			txtHeader = "b";
			add=true;
			break;
		case 16:
			txtHeader = "i";
			add=true;
			break;
		case 31:
			txtHeader = "n";
			add=true;
			break;
		case 46:
			txtHeader = "g";
			add=true;
			break;
		case 61:
			txtHeader = "o";
			add=true;
			break;
	}
	if(add){
		div = document.createElement("div");
		div.setAttribute("class", "header");
		div.appendChild(document.createTextNode(txtHeader));
		this.getTablero().appendChild(div);		
	}
};

Bingo.prototype.load = function (){
	this.printPuntajes();
	this.printTablero();
	this.printControles();
	if(this.playing){
		this.printMesa();
	}
};

Bingo.prototype.init = function(){
	var cantRondas = document.getElementById("nroRondas");
	if(isNaN(cantRondas.value) || cantRondas.value < 1){
		alert("Por favor, ingrese un Nro de Rondas Valido!!!");
		cantRondas.select();
		cantRondas.focus();
		return;
	}
	if(this.jugadores.length < 2){
		alert("Por favor, ingrese por lo menos 2 Jugadores");
		cantRondas.value = null;
		cantRondas.focus();
		return;
	}
	this.setNroRondas(cantRondas.value);
	this.initRonda();
};

Bingo.prototype.initRonda = function(){
	if(this.getNroRonda() < this.getNroRondas()){
		this.setNroRonda(this.getNroRonda()+1);
		this.setNroJugada(1);
		for(var i = 0; i <= this.jugadores.length-1; i++ ){
			this.jugadores[i].getRondas()[this.jugadores[i].getRondas().length] = new Ronda(this.getNroRonda());
		}
		this.printTablero();
		this.playing = true;
		this.linea = false;
		this.continuePlay();		
	}
	this.load();
};

Bingo.prototype.existPlayer = function(playerName){
	for(var i = 0; i <= this.jugadores.length-1; i++ ){
		if(this.jugadores[i].getNombre() == capitaliseFirstLetter(trim(playerName)) ){
			return true;
		}
	}
	return false;
};

Bingo.prototype.addPlayer = function (){
	playerName = document.getElementById("playerName");
	if(this.existPlayer(playerName.value)){
		alert("El jugador "+playerName.value+" ya esta participando");
		playerName.select();
		playerName.focus();
		return;
	}
	if(playerName.value == null || playerName.value == ""){
		alert("Por favor, ingrese el nombre del jugador");
		playerName.select();
		playerName.focus();
		return;
	}
	var player = new Jugador();
	player.setNombre(capitaliseFirstLetter(trim(playerName.value.toLowerCase())));
	this.jugadores[this.jugadores.length] = player;
	playerName.value = "";
	playerName.focus();
	this.load();
};

Bingo.prototype.cleanTablero = function(){
	removeAllChild(this.getTablero());
};

Bingo.prototype.printTablero = function(){
	this.cleanTablero();
	for(var i = 1; i <= 75; i++){
		this.addString(i);
		if(!this.playing){
			nodo = new NodoCarton();
			nodo.setValor(0);
			this.resultados[i-1] = nodo;
		}
		this.getTablero().appendChild(this.resultados[i-1].generarDOM());
	}
};

Bingo.prototype.cleanControles = function(){
	controles = this.getControles();
	removeAllChild(controles);
};

Bingo.prototype.printControles = function (){
	this.cleanControles();
	controles = this.getControles();
	controles.appendChild(this.printBotonera());
	if(!this.playing){
		controles.appendChild(this.printAddPlayerForm());
	}
};

Bingo.prototype.clearSorteo = function(){
	var sorteo = this.getSorteo();
	if(sorteo != null){
		sorteo.parentNode.removeChild(sorteo);		
	}
};

Bingo.prototype.sortear = function(){
	this.setSorteoTime(generateStringTime());
	var random = randomFromInterval(1,75);
	while(this.resultados[random-1].getValor() != 0){
		random = randomFromInterval(1,75);
	}
	nodo = new NodoCarton();
	nodo.setValor(random);
	this.logger("Valor sorteado -> "+ addBingoStringToValue(random));
	this.resultados[random-1] = nodo;
	return random;
};

Bingo.prototype.printSorteo = function(){
	this.clearSorteo();//
	var sorteo = document.createElement("div");
	var nroSorteo = document.createElement("div");
	nroSorteo.setAttribute("class", "titulo");
	nroSorteo.appendChild(document.createTextNode("Ronda N° "+this.getNroRonda()+ " jugada " + this.getNroJugada()));
	var nombreNodo = document.createElement("div");
	nombreNodo.setAttribute("class", "nombre");
	
	
	var valorsorteo;//valor del sorteo... nooooooooo toques
	sorteo.setAttribute("id", "sorteo");
	sorteo.appendChild(nroSorteo);
	nodo = new NodoCarton();
	valorsorteo = this.sortear();
	nombreNodo.appendChild(document.createTextNode(nombres[valorsorteo-1]));	
	nodo.setValor(valorsorteo);
	this.nroJugada++;
	sorteo.appendChild(nodo.generarLargeDOM(valorsorteo));
	sorteo.appendChild(nombreNodo);
	this.marcarSorteo(valorsorteo);
	this.load();
	this.getControles().appendChild(sorteo);
	if(!this.isLinea()){
		this.evaluarLinea();		
	}
	this.evaluarBingo();
};

Bingo.prototype.printBotonera = function(){
	var btn = document.createElement("input");
	if(this.playing){	
		var row = document.createElement("tr");
		var col1 = document.createElement("td");
		var btn1 = document.createElement("input");
		btn1.setAttribute("type", "button");
		btn1.setAttribute("id", "startBingo");
		btn1.setAttribute("value", "Play");
		if(btn1.attachEvent){
			btn1.attachEvent("onclick", "javascript: b.continuePlay()");
		}else{
			btn1.setAttribute("onclick", "javascript: b.continuePlay()");
		}
		col1.appendChild(btn1);

		var col2 = document.createElement("td");
		var btn2 = document.createElement("input");
		btn2.setAttribute("type", "button");
		btn2.setAttribute("id", "startBingo");
		btn2.setAttribute("value", "Pausar");
		if(btn2.attachEvent){
			btn2.attachEvent("onclick", "javascript: b.pause()");
		}else{
			btn2.setAttribute("onclick", "javascript: b.pause()");
		}
		col2.appendChild(btn2);
		row.appendChild(col1);
		row.appendChild(col2);			
	}else{		
		btn.setAttribute("type", "button");
		var row = document.createElement("tr");
		var col1 = document.createElement("td");
		var col2 = document.createElement("td");
		var input = document.createElement("input");
		input.setAttribute("id", "nroRondas");
		col1.appendChild(document.createTextNode("Nro de Rondas"));
		col2.appendChild(input);
		row.appendChild(col1);
		row.appendChild(col2);
		
		btn.setAttribute("value", "Iniciar");
		btn.setAttribute("id", "initBingo");
		if(btn.attachEvent){
			btn.attachEvent("onclick", "javascript: b.init()");			
		}else{
			btn.setAttribute("onclick", "javascript: b.init()");
		}
	}
	var td = document.createElement("td");
	td.appendChild(btn);
	
	var tr = document.createElement("tr");
	tr.appendChild(td);
	var caption = document.createElement("caption");
	caption.appendChild(document.createTextNode("Controles"));
	var table = document.createElement("table");
	table.appendChild(caption);
	table.appendChild(row);
	if(!this.playing){
		td.setAttribute("colspan", "2");
		table.appendChild(tr);
	}
	var form = document.createElement("form");
	form.appendChild(table);
	var div = document.createElement("div");
	div.setAttribute("class", "form");
	div.appendChild(form);
	return div;
};

Bingo.prototype.printAddPlayerForm = function (){
	/*Primera Fila*/
	var col1Row1 = document.createElement("td");
	var col2Row1 = document.createElement("td");
	var label = document.createElement("label");
	var inputTxt = document.createElement("input");
	var row1 = document.createElement("tr");	
	label.appendChild(document.createTextNode("Nombre"));
	label.setAttribute("for", "playerName");
	col1Row1.appendChild(label);	
	inputTxt.setAttribute("type", "text");
	inputTxt.setAttribute("id", "playerName");
	col2Row1.appendChild(inputTxt);	
	row1.appendChild(col1Row1);
	row1.appendChild(col2Row1);
	/*Primera Fila*/
	/*Segunda Fila*/
	var col1Row2 = document.createElement("td");
	var inputBtn = document.createElement("input");
	var row2 = document.createElement("tr");
	col1Row2.setAttribute("colspan", "2");
	inputBtn.setAttribute("type", "button");
	inputBtn.setAttribute("value", "Agregar");
	if(inputBtn.attachEvent){
		inputBtn.attachEvent("onclick", "javascript: b.addPlayer();");
	}else{
		inputBtn.setAttribute("onclick", "javascript: b.addPlayer();");
	}
	col1Row2.appendChild(inputBtn);
	row2.appendChild(col1Row2);
	
	
	/*Segunda Fila*/
	var caption = document.createElement("caption");
	caption.appendChild(document.createTextNode("Agregar Jugador"));
	var table = document.createElement("table");
	table.appendChild(caption);
	table.appendChild(row1);
	table.appendChild(row2);
	var form = document.createElement("form");
	form.setAttribute("action", "javascript: b.addPlayer()");
	form.appendChild(table);
	var div = document.createElement("div");
	div.setAttribute("class", "form");
	div.appendChild(form);
	return div;
};

Bingo.prototype.clearMesa = function(){
	var mesa = this.getMesa();
	removeAllChild(mesa);
};

Bingo.prototype.printMesa = function(){
	this.clearMesa();
	var mesa = this.getMesa();
	for(var i = 0; i <= this.jugadores.length-1;i++){	
		if( !this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().wasGenerated() ){
			this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().generarNodos();			
		}
		mesa.appendChild(this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().generarDOM(this.jugadores[i].getNombre()));
	}
};

Bingo.prototype.cleanPuntajes = function(){
	var controles = this.getPuntajes();
	removeAllChild(controles);
};

Bingo.prototype.printPuntajes = function(){

	function printHeader(nroRonda){
		var row1 = document.createElement("tr");
		var row1Col1 = document.createElement("th");		
		row1Col1.appendChild(document.createTextNode("Jugador"));
		row1Col1.setAttribute("rowspan", "2");
		row1.appendChild(row1Col1);
			
		var row1Col2 = document.createElement("th");
		row1Col2.appendChild(document.createTextNode("Ronda"));
		row1Col2.setAttribute("colspan", nroRonda);
		row1.appendChild(row1Col2);
			
		var row1Col3 = document.createElement("th");
		row1Col3.appendChild(document.createTextNode("Total"));
		row1Col3.setAttribute("rowspan", "2");
		row1.appendChild(row1Col3);
		var row2 = document.createElement("tr");
		if(nroRonda > 0){
			for(var x = 1; x <= nroRonda; x++){
				var row1ColX  = document.createElement("th");
				row1ColX.appendChild(document.createTextNode(x));
				row2.appendChild(row1ColX);
			}
		}
		
		var thead = document.createElement("thead");
		thead.appendChild(row1);
		thead.appendChild(row2);
		return thead;
	}

	function printFooter(nroRonda){
		colspan = (parseInt(3)+parseInt(nroRonda));
		var col = document.createElement("td");
		col.setAttribute("colspan", colspan);
		col.appendChild(document.createTextNode("-:?, L:Linea, B:Bingo, P:Puntos"));
		var row = document.createElement("tr");
		row.appendChild(col);
		var tfoot = document.createElement("tfoot");
		tfoot.appendChild(row);
		return tfoot;
	}
	
	function printBody(nroRonda, jugadores){
		var tbody = document.createElement("tbody");
		for(var i = 0; i < jugadores.length; i++){ // Recorro todos los jugadores que hayan
			var row = document.createElement("tr");
			row.setAttribute("class", i%2 == 0 ? "odd" : "even");
			var colName = document.createElement("td");
			colName.appendChild(document.createTextNode(jugadores[i].getNombre()));
			row.appendChild(colName);
			var totalPuntos = 0;
			//for(var r = 0; r < jugadores[i].getRondas().length; r++){ // Recorro las rondas por jugador
			for(var r = 0; r < nroRonda; r++){ // Recorro las rondas por jugador
				var text = "";
				text += jugadores[i].getRondas()[r].getLinea() ? "L " : "- ";
				text += jugadores[i].getRondas()[r].getBingo() ? "B " : "- ";
				text += jugadores[i].getRondas()[r].getPuntos()+"P";
				totalPuntos = totalPuntos+jugadores[i].getRondas()[r].getPuntos();
				var colRondaPuntos = document.createElement("td");
				colRondaPuntos.appendChild(document.createTextNode(text));
				row.appendChild(colRondaPuntos);
			}
			if(nroRonda > 0){
				var colTotalPuntos = document.createElement("td");
				colTotalPuntos.appendChild(document.createTextNode(totalPuntos));
				row.appendChild(colTotalPuntos);				
			}
			tbody.appendChild(row);
		}
		return tbody;
	}

	this.cleanPuntajes();
	var tablero = document.createElement("div");
	tablero.setAttribute("class", "table");
	var tblPuntajes = document.createElement("table");
	var tblCaption = document.createElement("caption");
	tblCaption.appendChild(document.createTextNode("Puntajes"));
	tblPuntajes.appendChild(tblCaption);
	tblPuntajes.appendChild(printHeader(this.getNroRonda()));
	tblPuntajes.appendChild(printFooter(this.getNroRonda()));
	tblPuntajes.appendChild(printBody(this.getNroRonda(), this.jugadores));
	tablero.appendChild(tblPuntajes);
	this.getPuntajes().appendChild(tablero);
};

Bingo.prototype.marcarSorteo = function(valor){
	for(var i = 0; i <  this.jugadores.length; i++ ){
		this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().marcar(valor);
	}
};

Bingo.prototype.evaluarLinea = function(){	
	var cantLinea;
	var countLinea = 0;
	var lineaName = "";
	for(var i = 0; i < this.jugadores.length; i++){
		cantLinea = 0;
		cantLinea = this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().checkLineaHorizontal() + this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().checkLineaVertical();
		if(cantLinea > 0){
			this.jugadores[i].getRondas()[this.getNroRonda()-1].setLinea(cantLinea);
			this.logger("Linea del Jugador "+this.jugadores[i].getNombre()+" en la jugada Nro "+this.getNroJugada());
			lineaName = lineaName+", "+this.jugadores[i].getNombre();
			countLinea++;
			this.setLinea(true);
		}
	}
	if(this.isLinea()){
		var alertLinea = countLinea > 1 ? "Jugadores " : "Jugador ";
		alertLinea = alertLinea + "con linea en la jugada "+this.getNroJugada()+": " + lineaName.substring(1);
		alert(alertLinea);
	}
};

Bingo.prototype.evaluarBingo = function(){
	var bingo = false;
	var winCount = 0;
	var winName = "";
	for(var i = 0; i < this.jugadores.length; i++){
		if(this.jugadores[i].getRondas()[this.getNroRonda()-1].getCarton().checkBingo()){
			this.jugadores[i].getRondas()[this.getNroRonda()-1].setBingo(true);
			this.logger("BINGO!!! del Jugador "+this.jugadores[i].getNombre()+" en la jugada Nro "+this.getNroJugada());
			winName = winName+", "+this.jugadores[i].getNombre();
			winCount++;
			bingo = true;
		}
	}
	if(bingo){
		var alertBingo = winCount > 1 ? "Ganadores " : "Ganador ";
		alertBingo = alertBingo+" de la ronda "+this.getNroRonda()+": "+winName.substring(1);
		alert(alertBingo);
		this.pause();
		this.playing = false;
		this.initRonda();
	}
};

Bingo.prototype.logger = function(txt){
	var liItem = document.createElement("li");
	liItem.appendChild(document.createTextNode(this.getSorteoTime()+": "+txt));
	this.getLog().appendChild(liItem);
	
	var scroll = this.getLog().getElementsByTagName("li").length;
	this.getConsola().scrollTop = scroll*100;
	//this.getLog().scrollTop = scroll;
};

Bingo.prototype.continuePlay = function(){
	this.intervalId = setInterval("b.printSorteo()", 3000);
};

Bingo.prototype.pause = function(){
	clearInterval(this.intervalId);
};