// Dependencies ================================================
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const routes = require('./controllers/routes');
const keys = require('./config/keys');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('./database/models/seller');
require('./services/passport');
// passport routes

// Create Instance of Express
const app = express();
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const PORT = process.env.PORT || 3001;

require('./config/passport')(passport); // pass passport for configuration

// Run Morgan and BodyParser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('./src'));

// webpack-dev-middleware and use webpack.config.js
// config file as a base.
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));
// COOKIE SESSION
app.use(cookieSession({
// cookie will last for 30 days
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey],
}));

// passport-local cookies
app.use(cookieParser()); // read cookies (needed for auth)
// session secret
app.use(session({
	secret: 'cloudmerch',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
}));

// PASSPORT ===================================================
app.use(passport.initialize());
app.use(passport.session());
require('./controllers/authRoutes')(app);

app.use(flash()); // use connect-flash for flash messages stored in session

// MONGODB STUFF ===============================================
const db = mongoose.connection;
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {
	useMongoClient: true,
});

db
	.on('error', (error) => {
		console.warn('Warning', error);
	})
	.once('open', () => {
		console.log('Successfully connected to database!');
	});


app.use(routes);
require('./controllers/passportLocal.js')(app, passport);

// tell Node/Express to serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('shopping-cart-app/build'));

// 	const path = require('path');
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'shopping-cart-app', 'build', 'index.html'));
// 	});
// }

// LISTEN TO process.env.PORT or 3001 ==========================
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
