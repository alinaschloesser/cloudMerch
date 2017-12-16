const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Seller = mongoose.model('seller');

// PASSPORT ====================================================
passport.serializeUser((seller, done) => {
	done(null, seller.id);
});

passport.deserializeUser((id, done) => {
	Seller.findById(id)
		.then((seller) => {
			done(null, seller);
		});
});

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true,
}, async (accessToken, refreshToken, profile, done) => {
	const existingSeller = await Seller.findOne({ googleID: profile.id });
	if (existingSeller) {
		// we already have a record with the given profile ID
		done(null, existingSeller);
	} else {
		// we don't have a user record with this ID, make a new record
		const user = await new Seller({ googleID: profile.id }).save();
		done(null, user);
	}
}));
