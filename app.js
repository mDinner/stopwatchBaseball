
// packages AKA dependencies
var express    = require('express'); 		// call express
var app        = express(); 

app.get('*', function(req, res) {
	res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var port = process.env.PORT || 8888;
app.listen(port);
console.log('now serving on port ' + port);