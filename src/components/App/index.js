import React from 'react';

import { Switch } from 'react-router';

import { BrowserRouter, Route } from 'react-router-dom';


import My404Component from '../404';

import Layout from '../../layout';

import ErrorBoundary from '../../ErrorBoundary';
import pulse from '../../pulse';

class App extends React.Component {
	render() {
		const { props } = this;
		const {
			isAuthenticated,
			themeName
		} = props.pulse;
		return (
			<ErrorBoundary>
				<BrowserRouter>
					<Layout title={props.title} themeName={themeName}>
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
}

export default pulse.wrapped(App, (ctx) => {
	return {
		isAuthenticated: ctx.base.isAuthenticated,
		themeName: ctx.base.themeName
	};
});
