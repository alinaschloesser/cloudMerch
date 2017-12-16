import axios from 'axios';
// import router from 'react-router-dom';

class SignupAction {

	signupUser(name, email, password) {
		axios.post('/signup', {
			name: name,
			email: email,
			password: password,
		})
			.then(res=> {
				console.log(res);
				// this.history.push('/add-user');

				// this.context.router.push({
				//      pathname: '/add-store',
				//      state: {email: this.state.email, name: this.state.name, id: res._id}  
				//  })

				// this.setState({
				// 	name: res.data.name,
				// 	email: res.data.email,
				// 	_id: res.data._id
				// )
				window.location = '/add-store/' + res.data._id;
				res.json();
			});
	}


}

export default SignupAction;