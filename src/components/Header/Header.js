import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../css/style.css';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick() {
		window.location = /search-results/ + this.state.searchTerm;
	}

	handleChange(event) {
		let newState = this.state;
		newState[event.target.name] = event.target.value;
		this.setState(newState);
	}

	handleKeyPress(event) {
		if(event.key === 'Enter'){
			this.handleClick();
		}
	}

	renderContent() {
		switch (this.props.auth) {
		case null:
			return;
		case false:
			return (
				<span className="navbar-item">
					<a className="navbar-item header-links" href="/local-login">Login</a>
					<a className="navbar-item header-links" href="/auth/google">Login with Google</a>
					<a className="navbar-item header-links" href="/signup">Sell with us!</a>
				</span>
			);
		default:
			return (
				<span className="navbar-item">
					<a className="navbar-item header-links" href="/user-login">Dashboard</a>
					<a className="navbar-item header-links" href="/api/logout">Logout</a>
				</span>
			);
		}
	}

	render() {
		return (
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<div className="navbar-item">
						<Link to="/" className="logo">
							<div className="title"> cM </div>
							<div className="subtitle"> cloudMerch </div>
						</Link>
					</div>
				</div>
				<div className="navbar-menu">  
					<div className="navbar-item">
						<div className="search-input">
							<p className="control">
								<input className="input search-bar-input" name="searchTerm" type="text" placeholder="Search all stores"  value={this.state.searchTerm} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
							</p>
						</div>
						<button className="button nav" onClick={this.handleClick}>
							<i className="fa fa-search" />
						</button>
					</div>
					{this.renderContent()}
					<div className= "navbar-item">
						<Link to="/checkout" className="cart"><button className="button nav"><i className="fa fa-shopping-cart" /></button></Link>
					</div>
				</div>
				<div className="button navbar-burger">
					<div className="navbar-dropdown">
						<span className="navbar-item"><button className="button"> not working</button></span>
						<span className="navbar-item"><button className="button"> not working</button></span>
						<span className="navbar-item"><button className="button"> not working</button></span>
						<span className="navbar-item"><button className="button"> not working</button></span>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
