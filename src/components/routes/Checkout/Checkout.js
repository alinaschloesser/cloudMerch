import React, { Component } from 'react';
import Wrapper from '../../Wrapper';
import Header from '../../Header';
import Cart from '../../Cart';
import '../../../css/style.css';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			cartCache: [], 
			onlineCart: [],
			// cartItems: cartItems 
		};
		// this.addToCart = this.addToCart.bind(this)
	}

	componentWillMount() {
		const cachedHits = localStorage.getItem('cartCache');
		if (cachedHits) {
			var JSONCart = JSON.parse(cachedHits);
			let newCart = this.state;
			newCart.cartCache = JSONCart;
			this.setState({newCart});
			console.log(this.state.cartCache);

			this.state.cartCache.map((id) =>

				fetch('/products/' + id, {method: 'GET'})
					.then(res => res.json())
					.then(function(res) {
						// var result = res.json()
						var onlineCartArray = this.state.onlineCart.slice();
						onlineCartArray.push(res);
						console.log(onlineCartArray);
						this.setState({ onlineCart: onlineCartArray });
					}.bind(this)
					// newOnlineCartArray.push(res.json())
					// .then(
					// this.set

					// this.setState(state) => {onlineCart : state.onlineCart.concat([res]) }


					// (onlineCart) => {this.setState({ onlineCart: onlineCart })})
					// .then(res => res.json()))
					//     .then((items) => {this.setState({ onlineCart: items})})
					//  ) 
					// ).then(this.setState({ onlineCart: onlineCartArray })

					)
			);


		//             constructor(){
		//     this.state = {
		//       space_photos= []
		//     }
		// }

		// callback = (e) => {

		//     this.setState({space_photos: this.state.space_photos.concat(e)})

		// }
		// let newItem = this.this
		// newItem.onlineCart


		} else {
			console.log('The cart in local storage is empty');
		}

		// this.state.cartCache.map((item) =>
		//     fetch('/products/' + item._id, {method: 'GET'})
		//     .then(res => res.json())
		//     .then((items) => {this.setState({ onlineCart: items})})
		//  )
	}

	// addToCart() {
	//  newItem = this.state;
	//  newItem.cartItems.push(event.target.value);
	//  console.log(newItem)
	//  this.setState({newItem})
	// }

	// removeItem = id => {
	//   // Filter this.state.friends for friends with an id not equal to the id being removed
	//   const cartItems = this.state.cartItems.filter(cart => cart.id !== id);
	//   // Set this.state.friends equal to the new friends array
	//   this.setState({ cartItems });
	// };

	// Map over this.state.friends and render a FriendCard component for each friend object
	render() {

	// console.log(this.state.onlineCart)


		return (
			<div>
				<Header />
				<Wrapper>
					<div className="columns">
						<div className="column is-8">
							{this.state.onlineCart && this.state.onlineCart.length &&
						this.state.onlineCart.map(item =>
							<Cart
								id={item._id}
								key={item._id}
								removeItem={this.removeItem}
								img= {item.img}
								name={item.name}
								price= {item.price}
								quantity={1}
							/>
						)}
						</div>
				
						<div className="column is-4">
							<div className="box total-box">
								<h1 className="title checkout-title">Ready to checkout?</h1>

								<div className='field'>
									<label className='label'>Name on Card</label>
									<input className='control input' type='text' />
								</div>
				
							
								<div className='field'>
									<label className='label'>Card Number</label>
									<input autoComplete='off' className='input card-number'  type='text'/>
								</div>

							
								<div className='field'>
									<label className='label'>CVC</label>
									<input autoComplete='off' className='input card-cvc' placeholder='ex. 311' size='4' type='text'/>
								</div>

								<div className='field expiration required'>
									<label className='label'>Expiration</label>
									<input className='input card-expiry-month' placeholder='MM'  type='text'/>
									<input className='input card-expiry-year' placeholder='YYYY' type='text'/>
								</div>

								<div className='field' >        
									<div className='label'>
										Total:
										<span className='amount'>  $</span>
									</div>

								</div>
							
								<div className='field'>
									<button className='button' type='submit'>Pay</button>
								</div>
				
							</div>
						</div>
					</div>
				</Wrapper>
			</div>
		);
	}
}


export default Checkout;
