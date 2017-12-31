import React from 'react';
import { Link } from 'react-router-dom';

const StoreCard = props => (
	<Link to={`/shop/${props.id}`} data-id={props.id}>
		<div className="card store-card"  data-id={props.id}>
			<div className="card-header" data-id={props.id}>
				<div className="card-image" data-id={props.id}>
					<img className="image1" alt={props.name} src={props.image1} data-id={props.id}/>
					<img className="image2" alt={props.name} src={props.image2} data-id={props.id}/>
					<img className="image3" alt={props.name} src={props.image3} data-id={props.id}/>
				</div>
				<div data-id={props.id}>
					<img className="store-image" alt={props.name} src={props.storeImage} data-id={props.id}/>
				</div>
			</div>
			<div className="card-content store-card-content" data-id={props.id}>
				<p className="storeName subtitle" data-id={props.id}>{props.name}</p>
				<div className="description" data-id={props.id}>
					{props.description}
				</div>
			</div>
		</div>
	</Link>
);

export default StoreCard;
