var Sellers = require('../database/models/seller');

module.exports = function(app, passport) {
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	// app.get('/', function(req, res) {
	//     // res.render('index.ejs'); // load the index.ejs file
	//     // test home page
	//     res.json('home page');
	// });
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		// res.render('login.ejs', { message: req.flash('loginMessage') }); 
		// test loging page
		res.json('login page');
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		// successRedirect : '/profile', // redirect to the secure profile section
		// failureRedirect : '/local-login', // redirect back to the signup page if there is an error
		// failureFlash : true // allow flash messages
	}), function(req, res){


		// res.json({redirect: '/'});
		// console.log(req.user._id);

		Sellers.findById(req.user._id)
			.populate('Stores')
			.exec(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					res.json(doc);
				}
			});
	});

	// =====================================
	// SIGNUP ==============================
	// =====================================

	// ----------------------------------------------------
	// SIGNUP PAGE DONE WITH REACT ROUTER
	// show the signup form 
	// app.get('/signup', function(req, res) {

	//     // render the page and pass in any flash data if it exists
	//     // res.render('signup.ejs', { message: req.flash('signupMessage') });
	//     res.json('signup page');
	// });
	// ----------------------------------------------------

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
	}), function(req, res) {
		var newSeller = new Sellers(req.body);

		newSeller.save(function(error, doc) {
			if (error) {
				console.log(error);
			} else {
				console.log('Seller posted to db'),
				res.send(doc);
			}
		}).then(function(req, res) {
			console.log('==============================================REQ: ' + req);
			console.log('==============================================RES: ' + res);
		});
	});

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {

		// test profile page
		// res.json("profile page")

		// search for seller profile and return their stores
		var sellerid = req.user._id;

		Sellers.findById(sellerid)

			.populate('Stores')

			.exec(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					res.json(doc.stores);
				}
			});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}