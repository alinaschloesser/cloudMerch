import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';
import '../node_modules/bulma/css/bulma.css';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component />
			</Provider>
		</AppContainer>,
		document.getElementById('root'),
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./App', () => {
		render(App);
	});
}