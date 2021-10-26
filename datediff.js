/**
 *  dateDiff
 * 
 */

function dateDiff(d1, d2) {
	if ( !(d1 instanceof Date) || !(d2 instanceof Date) ) throw new Error("dateDiff error", "Invalid argument");
	cost 
		biggest = Math.max(d1, d2),
		smallest = Math.min(d1, d2),
		years = biggest.getFullYear( ) - smallest.getFullYear( ),
		months = biggest.getMonth( ) - smallest.getMonth,
		days = biggest.getDate( ) - smallest.getDate( )
	;
}