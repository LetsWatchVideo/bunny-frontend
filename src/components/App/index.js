import React from 'react';

import { Switch } from 'react-router';

import { BrowserRouter, Route } from 'react-router-dom';


import My404Component from '../404';

import Layout from '../../layout';

import ErrorBoundary from '../../ErrorBoundary';
import pulseInst from '../../pulse';

function App(props) {
	const {
		pulse,
		title
	} = props;
	const {
		isAuthenticated,
		themeName
	} = pulse;
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Layout title={title} themeName={themeName}>
					<Switch>
						{
							isAuthenticated
							&& <Route></Route>
						}
						{
							!isAuthenticated
							&& <Route></Route>
						}
						<Route component={My404Component} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default pulseInst.wrapped(App, (ctx) => {
	return {
		isAuthenticated: ctx.base.isAuthenticated,
		themeName: ctx.base.themeName
	};
});
