const passport = require('passport');

// Google OAuth ==============================================
module.exports = (app) => {
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email'],
		prompt: 'select_account',
	}));

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/user-login/59dacfd8b9267fbcb5d2de33');
		});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
