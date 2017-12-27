import React, { Component } from 'react';
import StoreCard from '../../StoreCard';
import Header from '../../Header';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { stores: [], query: '' };
	}

	// state = {
	//     stores: [],
	//     query: ''
	// }

	componentDidMount() {
		fetch('/stores/products', {method: 'GET'})
			.then(res => res.json())
			.then(stores => this.setState({stores}));
	}

	handleClick(e) {
		console.log('The link was clicked.' +  e.target.dataset.id);
		window.location = '/shop/' + e.target.dataset.id;
	}

	render() {

		return (
			<div>
				<Header />
				<div className="store-card-container">
					{this.state.stores && this.state.stores.length && this.state.stores.map((store)=>
						<StoreCard 
							key={store._id}
							id={store._id}
							name={store.name}
							storeImage={store.image}
							image1={store.products[0].img}
							image2={store.products[1].img}
							image3={store.products[2].img}
							description={store.description} 
							onClick={this.handleClick}           
						/>)
					}
				</div>
			</div>
		);
	}
}


export default Home;
