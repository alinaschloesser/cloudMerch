import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Home from './components/routes/Home';
import UserView from './components/routes/UserView';
import Shop from './components/routes/Shop';
import Checkout from './components/routes/Checkout';
//import Header from './components/Header';
import Signup from './components/routes/Signup';
import SearchResults from './components/routes/SearchResults';
import LocalLogin from './components/routes/LocalLogin';
import AddNewStore from './components/routes/AddNewStore';


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
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
}

export default connect(null, actions)(App);
