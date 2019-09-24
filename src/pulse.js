import Pulse from 'pulse-framework';
import React from 'react';

import config from '../config';

import accountsCol from './collections/accounts.collection';

export default new Pulse({
	request: {
		baseURL: config.site.baseURL,
		credentials: 'include',
		timeout: 1e4,
		headers: {
			'Access-Control-Allow-Origin': 'https://letswatch.video',
			origin: 'https://letswatch.video',
			Dev: process.env.NODE_ENV === 'development'
		},
		responseIntercept({ base }, res) {
			if (!base.responseInterceptErrorsDisable && res.data.statusCode !== 200) {
				base.isAuthenticated = false;
				base.clearData();
			}
		}
	},
	collections: {
		accounts: accountsCol,
	},
	data: {
		dataLoaded: false,
		themeName: 'dark'
	},
	persist: ['themeName', 'responseInterceptErrorsDisable'],
	actions: {
		clearData({ base, accounts }) {
			base.isAuthenticated = false;
			base.dataLoaded = false;
			base.themeName = 'dark';
			accounts.currentAccountID = null;
		},
		appState({ base, accounts, request }) {
			return {
				isAuthenticated: base.isAuthenticated,
				dataLoaded: base.dataloaded,
				lastEmail: accounts.lastEmail,
				requestHeaders: request.headers
			};
		}
	},
	jobs: {
		refresh: {
			interval: '1hr',
			startImmediate: false,
			execute: ({ accounts }) => {
				accounts.refresh();
			}
		}
	},
	config: {
		framework: React
	}
});
