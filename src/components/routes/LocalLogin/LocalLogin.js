import React, { Component } from 'react';
import Wrapper from '../../Wrapper';
import Header from '../../Header';
import LocalLoginAction from './LocalLoginAction';
import './LocalLogin.css';

class LocalLogin extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',  
			password: '',
		};
		// use post function from LocalLoginAction.js
		this.LocalLoginAction = new LocalLoginAction();

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
		this.LocalLoginAction.loginUser(this.state.name, this.state.password);
	}


	render () {
		return (
			<div>
				<Header/>
				<Wrapper>
					<section className="hero">
						<div className="hero-body">
							<div className="container store-name">
								<h1 className="title">Sign In</h1>
							</div>
						</div>
					</section>
					<div className="container form-container"> 
						<form onSubmit={this.handleSubmit}>
							<div className="field">
								<label className="label">
							Username:
									<input type="text" name="name" placeholder="Username" className="input" value={this.state.value} onChange={this.handleChange} />
								</label>
							</div>
							<div className="field">
								<label className="label">
									Password:
									<input type="password" className="input" placeholder="Password" name="password" value={this.state.value} onChange={this.handleChange} />
								</label>
							</div>
							<button className="button signIn-button" type="submit">Sign In</button>
						</form>
					</div>
				</Wrapper>
			</div>
		);
	}
}

export default LocalLogin;