import React from 'react';
import '../../css/style.css';

class UploadCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			form: {
				name: '',
				description: '',
				tags: '',
				price: '',
				img: '',
			},
		}; 
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let newState = this.state; 
		newState.form[event.target.name] = event.target.value; 
		this.setState(newState); 
	}

	handleSubmit() {
		this.props.onSubmit(this.state.form);
	}


	render() {
		const { form } = this.state;

		return ( 
			<div className="card">
				<div className="card-header subtitle upload-card-header">Upload New Product</div>
				<div className ="card-content form-card-content">
					<form onSubmit={this.handleSubmit}>
						<div className="field">
							<label htmlFor="name">Product name: </label>
							<input className="input new-product" type="text" name="name" value={form.name} onChange={this.handleChange} placeholder="Product name"/>
						</div>
						<div className="field">
							<label htmlFor="description">Description: </label>
							<input className="input new-product" type="text" name="description"  value={form.description} onChange={this.handleChange} placeholder="Description"/>
						</div>
						<div className="field">
							<label htmlFor="tags">Tags: </label>
							<input className="input new-product" type="text" name="tags"  value={form.tags} onChange={this.handleChange} placeholder="Tags"/>
						</div>
						<div className="field">
							<label htmlFor="price">Price: </label>
							<input className="input new-product" type="number" name="price" value={form.price} onChange={this.handleChange} placeholder="Price"/>
						</div>
						<div className="field">
							<label htmlFor="image">Upload image url: </label>
							<input className="input new-product" type="text" name="img" value={form.img} onChange={this.handleChange} placeholder="Image url" />
						</div>
						<button type="submit" className="button submit-button">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default UploadCard;
