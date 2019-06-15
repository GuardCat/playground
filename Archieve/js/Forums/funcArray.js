<!DOCTYPE html> <html> <head> <meta charset="utf-8" /> <title></title> </head> <body>

<script> function FuncArray( list ) { this._list = this.addFunctions( arguments ) || [ ]; }

FuncArray.prototype = {

_isRight: function( func ) { if ( !( ( typeof func ) === "function") ) {alert (1);return false;} if ( !( func.name ) ) return false; return true; },

filter: function( list ) { if ( !list[0] ) return list; if ( ( typeof list[0] ) === "array" ) return list[0].filter( this._isRight ); return Array.prototype.filter.call( list, this._isRight ); },

getFuncIdByName: function( name ) { for (var x = 0; x < this._list.length; x++) { if (!x in this._list.length) continue; if (this._list[x].name === name) return x; } return -1; },

addFunctions: function( list ) { var filteredList = this.filter( arguments ); if ( !filteredList.length ) return false; this._list.concat( filteredList ); },

getFuncByName: function( name ) { var id = this.getFuncIdByName( name ); if ( id === -1) return false; return getFuncById( id ); },

getFuncById: function( id ) { if (! id in this._list ) return false; return this._list[id]; },

delFunc: function( idOrName ) { if ( ! ( ( typeof idOrName ) === "number" ) ) idOrName = this.getFuncByName( idOrName ); if ( idOrName in this._list ) return delete this._list[id]; return false; },

length: function() { return this._list.length }

}

FuncArray.prototype.constructor = FuncArray;

arr1 = [ function test(x) { alert(x); },

function double(x) { return x * 2; },

function pow(x) { return x * x; },

function doublePow(x) { return x * x * 2; } ] fArr = new FuncArray( arr1 ); </script> </body> </html>