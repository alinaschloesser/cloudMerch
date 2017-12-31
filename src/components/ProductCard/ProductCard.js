import React from 'react';

const ProductCard = props => (
	<div className="card product-card effect__hover">
		<div className="card__front">
			<div className="card-header product-card-header">
				<div className="card-image">
					<img className="image product-image" alt={props.name} src={props.img} />
				</div>
				<div>
				</div>
			</div>
			<div className="card-content product-card-content">
				<div className="product-price box"> &#36;{props.price}</div>
				<p className="productName">{props.name}</p>
				<div className="description">
					{props.description}
				</div>
			</div>

		</div>
		<div className="card__back">
			<div>{props.children}</div>
		</div>
	</div>
);

export default ProductCard;
