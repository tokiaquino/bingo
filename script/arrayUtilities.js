/**
 * 
 */

function isAnArray(o){
	if(o instanceof Array){
		return true;
	}
	return false;
}

function areEqualArrays(array1, array2) {
   var temp1 = new Array();
   var temp2 = new Array();
   if( !(array1 instanceof Array) || !(array2 instanceof Array)){
	   return false;
   }
   if (array1.length != array2.length) {
      return false;
   }
   for (var i=0; i<array1.length; i++) {
	   key1 = (typeof array1[i]) + "~" + array1[i];
	   temp1[temp1.length] = key1;
	   key2 = (typeof array2[i]) + "~" + array2[i];
	   temp2[temp2.length] = key2;
   }
   for (var i=0; i<temp1.length; i++) {
	   if(temp1[i] != temp2[i]){
		   return false;
	   }
   }
   return true;
}

function searchInArray(arr, value){
	if(arr.length > 0){
		for(var i = 0; i <= arr.length; i++){
			if(typeof arr[i] == typeof value
					&& arr[i] == value){
				return true;
			}
			if(value instanceof Array){
				if( areEqualArrays(arr[i], value ) ){
					return true;
				}
			}
		}		
	}
	return false;
}