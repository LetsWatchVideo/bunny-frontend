import React from 'react';
import { Helmet } from 'react-helmet';

import layoutConfig from '../../../config/layout';

export default class My404Component extends React.Component {
	render() {
		return (
			<div>
				<Helmet {...layoutConfig} title="Page not found" />
				<h2>404 - Page not found</h2>
				<p>{'Did you just try to head to something that doesn\x27t exist?'}</p>
			</div>
		);
	}
}
