var 
	cluster = require('cluster'),
	numCPUs = require('os').cpus().length;

if( cluster.isMaster ) {

	for(var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker', worker.process.pid, 'died');
		cluster.fork();
	});


} else {

	require('./server.js');
	console.log('Worker', cluster.worker.id, 'running.');

}