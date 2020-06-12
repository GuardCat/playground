const http = require("http");

function start(port = 1234) {
	http.createServer(onRequest).listen(port);

	function onRequest(request, response) {
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write(`Hello there! Now is ${new Date( )}`);
		response.end( );
	}

	console.log(`Started on ${port}`);
}

exports.start = start;