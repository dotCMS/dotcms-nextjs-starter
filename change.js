const chokidar = require('chokidar');

// One-liner for current directory
chokidar.watch('.next').on('all', (event, path) => {
	console.log(event, path);
});
