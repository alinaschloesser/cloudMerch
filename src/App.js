import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Home from './components/routes/Home';
import UserView from './components/routes/UserView';
import Shop from './components/routes/Shop';
import Checkout from './components/routes/Checkout';
import Signup from './components/routes/Signup';
import SearchResults from './components/routes/SearchResults';
import LocalLogin from './components/routes/LocalLogin';
import AddNewStore from './components/routes/AddNewStore';
import './css/style.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	fetchUser() {
		axios
			.get('/api/current_user')
			// need to figure out how to read response if current_user is logged in then fix renderContent() in Header.js
			.then(res=>{console.log(res)})
			.catch(function (error) {
				console.log(error);
			  });

	}

	componentDidMount() {		
		this.fetchUser();		
	}
	render(){
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/user-login/:id" component={UserView} />
					<Route path="/shop/:id" component={Shop} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/signup" component={Signup} />
					<Route path="/search-results/:tag" component={SearchResults} />
					<Route path="/local-login" component={LocalLogin} />
					<Route path="/add-store/:id" component={AddNewStore} />
				</div>
			</Router>
		);
	}
};

export default hot(module)(App);
