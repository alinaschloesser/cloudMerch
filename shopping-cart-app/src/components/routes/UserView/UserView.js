import React, { Component } from 'react';
import StoreCard from '../../StoreCard';
import ProductCard from '../../ProductCard';
import Wrapper from '../../Wrapper';
import Header from '../../Header';
import StoreLogin from "../../StoreLogin";
import Store from "../../Store";
import friends from '../../../friends.json';
import products from '../../../storeOwner.json';
import './UserView.css';

class UserView extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    products
  };

  removeItem = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const products = this.state.products.filter(products => products.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ products });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
     <div>
        <Header location="Search all stores"/>
         <Wrapper>
        {this.state.products.map(products => 
          <StoreLogin>
            <ProductCard
            removeItem={this.removeItem}
            id={products.id}
            key={products.id}
            name={products.name}
            img={products.img}
            description={products.description}
            />
          </StoreLogin>
        )}
      </Wrapper>
      </div>
    );
  }
}


export default UserView;
