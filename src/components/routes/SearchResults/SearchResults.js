import React, { Component } from 'react';
// import StoreCard from '../../StoreCard';
import ProductCard from '../../ProductCard';
import Wrapper from '../../Wrapper';
import Header from '../../Header';
import StoreLogin from '../../StoreLogin';
import './SearchResults.css';


const AddToCartButton = props => (
	<span onClick={() => props.addToCart(props.id)}  className="remove">
		<div className="add-product-to-cart-button button">Add to cart</div>
	</span>
);


class SearchResults extends Component {

	constructor(props) {
		super(props);
		this.state = { results: [], value: ''};	
	}

	componentDidMount() {
		fetch('/products/search/' + this.props.match.params.tag, {method: 'GET'})
			.then(res => res.json())
			.then((results) => {
				this.setState({results});
			});
	}
	handleClick(e) {
		console.log('The link was clicked.' +  e.target.value);
		this.setState({value: e.target.value});
		window.location = '/products/search/' + e.state.value;
	}

	addToCart(id){
		console.log(id);
		const cart = [];
		cart.push(this.id);
	}

	render() {
		return (
			<div>
				<Header 
					handleClick={this.handleClick}
					value={this.state.value}
				/>
				<Wrapper>
					<StoreLogin
						id="no id"
						userName="Search Results"
						userDescription=""
					>
						{this.state.results.map((product)  =>
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
						)
						}
					</StoreLogin>
				</Wrapper>
			</div>
		);
	}
}

export default SearchResults;
