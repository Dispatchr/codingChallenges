var express = require('express'),
	config = require('./config'),
	auth = require('./auth'),
	redisClient = require('./redis_client'),
	routes = require('./routes'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	bodyParser = require('body-parser'),
	app = express();


app.use(express.static(__dirname + '/public'));
app.use(session({
	store: new RedisStore({
		host: 'localhost',
		port: 3679,
		client: redisClient
	}),
	secret: config.sessionSecret,
	saveUninitialized: true,
	resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// custom middleware
app.use(auth);

app.use('/api/user', routes.user);
app.use('/api/shop', routes.shop);
app.use('/api/admin', routes.admin);

app.listen(config.port, function() {
	console.log('Server listening on port %d', config.port);
});

