// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var Seller = require('../database/models/seller');

// expose this function to our app using module.exports
module.exports = function(passport) {
// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		Seller.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with name
		usernameField : 'name',
		passwordField : 'password',
		passReqToCallback : true, // allows us to pass back the entire request to the callback
	},
	function(req, name, password, done) {
		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function() {

		// find a user whose name is the same as the forms name
		// we are checking to see if the user trying to login already exists
			Seller.findOne({ 'name' :  name }, function(err, user) {
				// if there are any errors, return the error
				if (err)
					return done(err);
				// check to see if theres already a user with that name
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That name is already taken.'));
				} else {
					// if there is no user with that name
					// create the user
					var newSeller = new Seller();
					// set the user's local credentials
					newSeller.name    = name;
					newSeller.email = req.body.email;
					newSeller.password = newSeller.generateHash(password);
					// save the user
					newSeller.save(function(err) {
						if (err)
							throw err;
						return done(null, newSeller);
					});
				}
			});    
		});
	}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with name
		usernameField : 'name',
		passwordField : 'password',
		passReqToCallback : true, // allows us to pass back the entire request to the callback
	},
	function(req, name, password, done) { // callback with name and password from our form
	// find a user whose name is the same as the forms name
	// we are checking to see if the user trying to login already exists
		Seller.findOne({ 'name' :  name }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err) {
				return done(err);
			}
			// if no user is found, return the message
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
			}
			// if the user is found but the password is wrong
			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			}
			// all is well, return successful user
			return done(null, user);
		});

	}));

};
