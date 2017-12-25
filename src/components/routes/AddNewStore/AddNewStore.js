import React, { Component } from 'react';
import Header from '../../Header';
import AddNewStoreAction from './AddNewStoreAction';
import '../../../css/style.css';

class Signup extends Component {
	
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			storeName: '', 
			description: '', 
			image: '',
		};
		// use post function from AddNewUserAction.js
		this.AddNewStoreAction = new AddNewStoreAction();

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
		this.AddNewStoreAction.addNewStore(this.state.storeName, this.state.description, this.state.image, this.props.match.params.id);
	}


	render () {
		return (
			<div>
				<Header />
				<section className="hero">
					<div className="hero-body">
						<div className="container store-name">
							<h1 className="title">Tell Us About Your Store</h1>
						</div>
					</div>
				</section> 
				<section>
					<div className="container form-container">  
						<form onSubmit={this.handleSubmit}>
							<div className="field">
								<label className="label">
								Store Name:
								</label>
								<input type="text" className="input" placeholder="Store Name" name="storeName" value={this.state.value} onChange={this.handleChange} />
							</div>
							<div className="field">
								<label className="label">
									Description of Your Store:
								</label>
								<input type="text" className="input" placeholder="Description of Your Store" name="description" value={this.state.value} onChange={this.handleChange} />
							</div>
							<div className="field">
								<label className="label">
									Image of Your Store:
								</label>
								<input type="password" className="input" placeholder="Paste a Link to an Image of Your Store" name="image" value={this.state.value} onChange={this.handleChange} />
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