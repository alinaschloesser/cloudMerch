import React, { Component } from 'react';
// import StoreCard from '../../StoreCard';
import ProductCard from '../../ProductCard';
import Header from '../../Header';
import StoreLogin from '../../StoreLogin';
import '../../../css/style.css';


const AddToCartButton = props => (
	<span onClick={() => props.addToCart(props.id)}  className="remove">
		<div className="add-product-to-cart-button button">Add to cart</div>
	</span>
);


class Shop extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			storeInfo: '', 
			products: [], 
			cart: [],
		};  
		this.addToCart = this.addToCart.bind(this);
	}

	componentDidMount() {
		fetch('/stores/' + this.props.match.params.id, {method: 'GET'})
			.then(res => res.json())
			.then((storeInfo) => {
				this.setState({storeInfo});
			});
	}

	addToCart(id) {
		this.setState({ cart : this.state.cart.concat(id)});
		console.log(this.state);
		let cartCache = localStorage.getItem('cartCache');
		if (cartCache) {
			console.log(cartCache);
			let JSONCart = JSON.parse(cartCache);
			console.log(JSONCart);
			JSONCart.push(id);
			console.log(JSONCart);
			localStorage.setItem('cartCache', JSON.stringify(JSONCart));
		} else {
			console.log('Cart cache is empty');
			localStorage.setItem('cartCache', JSON.stringify(this.state.cart));
		}
	// localStorage.setItem('cartCache', JSON.stringify(this.state.cart))

	//     constructor(){
	//     this.state = {
	//       space_photos= []
	//     }
	// }

	// callback = (e) => {

	//     this.setState({space_photos: this.state.space_photos.concat(e)})

	// }


	// {cart: this.state.cart.concat(id)})
	// let newState = this.state
	// newState.cart = id
	// var newCart = this.state.cart.slice()
	// newCart.push(id)
	// const newCart = id;
	// this.setState({cart: newCart})
	
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
						> 
							<AddToCartButton
								id={product._id}  
								addToCart={this.addToCart}
							/>
						</ProductCard>
					)}
				</StoreLogin>
			</div>
		);
	}
}

export default Shop;
