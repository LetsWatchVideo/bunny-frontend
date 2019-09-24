/* eslint-enable */
import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import './pulse';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
