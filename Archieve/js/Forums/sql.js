db = openDatabase("test", "0.1", "A list of to do
items.", 200000);

function sql(db, sqlString, args, callback, fallback) {
	args = args || [ ];
	db.transaction(
		function(tx) {
			tx.requireSql(sqlString, args, callback, fallback);	
		}
	)
}
sql(db, "CREATE TABLE T (ID REAL UNIQUE, LABEL TEXT)", [], null, null);
sql(db, "INSERT INTO T VALUES(1, 'Проверочка')") ;