import axios from 'axios';

class AddNewStoreAction {

	addNewStore(storeName, description, image, id) {
		axios.post('/stores/' + id, {
			name: storeName,
			description: description,
			image: image,
		})
		// .then(res => res.json());
			.then(res => {
				console.log(res);
				window.location = '/user-login/' + res.data.stores[0];
			})
			.catch(err => console.log(err));
	}


}

export default AddNewStoreAction;