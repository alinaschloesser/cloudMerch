import React, { Component } from 'react';
// import StoreCard from '../../StoreCard';
import ProductCard from '../../ProductCard';
import Header from '../../Header';
import StoreLogin from '../../StoreLogin';
import UploadCard from '../../UploadCard';

const Edit = props => (
	<div className="user-edit">
		<div onClick={() => props.deleteItem(props.id)}  className="remove">
			<button className="button remove">Remove Item</button>
		</div>
		<div>
			<div className="field">
				<label className="label">Update Quantity: </label>
				<div className="control">
					<input className="input" type="text" placeholder={props.quantity} />
				</div>
				<div className="control">
					<div onClick={() => props.updateQuantity(props.id)} className="update-quantity">
						<div className="button submit-new-quantity">Submit New Quantity</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

class UserView extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			storeInfo: '',
			// handlerValue: true
			form: {
				name: '',
				description: '',
				tags: '',
				price: '',
				img: '',
			},
		}; 
		this.deleteItem = this.deleteItem.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	componentDidMount() {
		fetch('/stores/' + this.props.match.params.id)
			.then(res => res.json())
			.then((storeInfo) => {
				this.setState({storeInfo});
			});
	}

	deleteItem(id) {
		//workaround - manually update state and then force update
		let newStoreInfo = this.state.storeInfo.products.filter(product => id !== product._id);
		this.state.storeInfo.products = newStoreInfo;
		this.forceUpdate();
		// then make request to db to delete product
		fetch('/products/' + id, {method: 'DELETE'})
			.then()
			.catch( err => console.error(err));
	}

	addItem(headingStuff)  {
		console.log(headingStuff);
		let newState = this.state;
		newState.form = headingStuff;
		console.log(newState);
		console.log((this.state.form));
		return fetch('/stores/' + this.props.match.params.id + '/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }, 
			body: JSON.stringify(this.state.form),
		}).then(response => response.json());
	}

	updateQuantity(id, value){
		console.log('update quantity of '+id+' to '+value);
	}

	render() {

		return (
			<div>
				<Header />
				<StoreLogin
					id={this.state.storeInfo._id}
					userName={this.state.storeInfo.name}
					userDescription={this.state.storeInfo.description}
				>

					{this.state.storeInfo.products && this.state.storeInfo.products.length &&
					this.state.storeInfo.products.map((product)  =>
						<ProductCard
							id={product._id}
							key={product._id}
							name={product.name}
							img={product.img}
							description={product.description}
							price={product.price}
							quantityText={'Quantity: '}
							quantity={product.quantity}
						>
							<Edit 
								id={product._id}
								deleteItem={this.deleteItem}
								quantity={product.quantity}
								updateQuantity={this.updateQuantity}
							/>
						</ProductCard>
					)}
					<UploadCard storeId={this.props.match.params.id} onSubmit={this.addItem}/>
				</StoreLogin>
			</div>
		);
	}
}


export default UserView;
