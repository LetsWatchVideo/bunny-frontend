export default {
	data: {
		currentAccountID: null,
		lastEmail: null,
		accessToken: null,
		refreshToken: null
	},
	groups: ['authed'],
	persist: ['currentAccountID', 'lastEmail', 'accessToken', 'refreshToken'],
	routes: {
		login(request, username, password) {
			return request.post('auth/login', {
				username,
				password
			});
		},
		register(request, username, email, password) {
			return request.post('auth/register', {
				username,
				email,
				password
			});
		},
		getMe(request, token) {
			return request.get('auth/me', {
				Authorization: token
			});
		}
	},
	actions: {
		login({
			routes, base, accounts, request
		}, username, password) {
			if (base.accessToken) {
				return routes
					.getMe(base.accessToken)
					.then(res => {
						if (res.success !== 1) {
							return Promise.reject(res.error);
						}

						accounts.accessToken = res.accessToken;
						request.headers.Authorization = `Bearer ${res.accessToken}`;
						accounts.currentAccountID = res.user.id;
						accounts.collect(routes.account, 'authed');
						base.dataLoaded = true;
					});
			} else {
				return routes
					.login(username, password)
					.then(res => {
						if (res.success !== 1) {
							return Promise.reject(res.error);
						}

						accounts.accessToken = res.accessToken;
						request.headers.Authorization = `Bearer ${res.accessToken}`;
						base.isAuthenticated = true;
						accounts.lastEmail = res.user.email;
					})
					.then(() => actions.login());
			}
		},
		register({ routes }, username, email, password) {
			return routes.register(username, email, password).then(res => {
				if (res.success !== 1) {
					return Promise.reject();
				}
			});
		},
		async logout({ routes, base, undo }) {
			base.isAuthenticated = false;
			await routes.logout()
				.then(() => {
					return base.clearData();
				}).catch(undo);
		}
	},
	filters: {
		myAccount: ({ accounts }) => {
			return accounts.authed.find(t => t.id === accounts.currentAccountID);
		}
	}
};
