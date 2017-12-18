import React, { Component } from 'react';

import Header from '../../Header';
import SignupAction from './SignupAction';
import '../../../css/style.css';

class Signup extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '', 
			email: '', 
			storeName: '', 
			password: '',
		};
		// use post function from SignupAction.js
		this.SignupAction = new SignupAction();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {		
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.SignupAction.signupUser(this.state.name, this.state.email, this.state.password);		
	}


	render () {
		return (
			<div>
				<Header />
				<section className="hero">
					<div className="hero-body">
						<div className="container store-name">
							<h1 className="title">Sign up today!</h1>
						</div>
					</div>
				</section> 
				<section>
					<div className="container form-container">  
						<form onSubmit={this.handleSubmit}>
							<div className="field">
								<label className="label">
								Name:
								</label>
								<input type="text" className="input" placeholder="Name" name="name" value={this.state.value} onChange={this.handleChange} />
							</div>
							<div className="field">
								<label className="label">
									Email:
								</label>
								<input type="text" className="input" placeholder="Email" name="email" value={this.state.value} onChange={this.handleChange} />
							</div>
							<div className="field">
								<label className="label">
									Password:
								</label>
								<input type="password" className="input" placeholder="Password" name="password" value={this.state.value} onChange={this.handleChange} />
							</div>
							<button className="button signup-button"type="submit">Submit</button>
						</form>
					</div>
				</section>
			</div>
		);
	}
}

export default Signup;