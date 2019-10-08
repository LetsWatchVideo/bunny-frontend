import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import pulseInst from '../../pulse';

function App(props) {
	const {
		pulse,
	} = props;
	const {
		isAuthenticated,
	} = pulse;

	const [loginState, toggleLogin] = useState(false);
	const [joinState, toggleJoin] = useState(false);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	useEffect(() => {
		// setUsername('hi');
		// setPassword('***');
	}, []);

	return (
		<>
			<div className="absolute left-0 top-0 w-50 h-100 bg-gradient">
				<div className="absolute w-60 mw-100 top-50 left-50 pos-magic">
					<h1 className="f1 mb0">letswatch.video</h1>
					<h2 className="f4 tracked">Shared browser streaming service</h2>
					<p>Not available for public yet.</p>
					{
						!isAuthenticated && (
							<button
								type="button"
								onClick={() => toggleLogin(!loginState)}
								className="dib link tracked color-inherit pv2 ph3 nowrap lh-solid pointer br2 ba b--gray bg-gray"
							>
							Log In
							</button>
)
					}
					{
						isAuthenticated && (
							<button
								type="button"
								className="dib link tracked color-inherit pv2 ph3 nowrap lh-solid pointer br2 ba b--gray bg-gray"
							>
							Create Room
							</button>
)
					}
					<button
						type="button"
						onClick={() => toggleJoin(!joinState)}
						className="dib link tracked color-inherit pv2 ph3 ml2 nowrap lh-solid pointer br2 ba b--purple bg-purple"
					>
						Join Room
					</button>
					{
						loginState && !isAuthenticated && (
							<form className="pv3 ba b--transparent ph0 mh0 measure">
								<input type="text" onChange={(e) => setUsername(e.value)} value={ username } className="db f6 f5-l pa2 mv1 input-reset ba b--black-80 black-80 br2 bg-white w-100 w-75-m w-80-l" name="username" placeholder="Username" />
								<input type="text" onChange={(e) => setPassword(e.value)} value={ password } className="db f6 f5-l pa2 mv1 input-reset ba b--black-80 black-80 br2 bg-white w-100 w-75-m w-80-l" name="username" placeholder="Password" />
								<button
									type="button"
									onClick={() => pulse.accounts.login(username, password)}
									className="link tracked color-inherit flex pv2 ph3 nowrap lh-solid pointer br2 ba b--blue bg-blue"
								>
									Log In
								</button>
							</form>
						)
					}
				</div>
			</div>
			<div className="absolute left-50 top-0 w-50 h-100">
				<div className="mw-100 h-100 cover" style={{ backgroundImage: 'url(http://placekitten.com/g/1920/1080)' }}>
					<footer className="site-footer absolute bottom-0 left-0 white">
						<ul className="list flex flex-row pa0">
							<li><Link to="/about" className="link color-inherit pl2">About</Link></li>
							<li><Link to="/terms" className="link color-inherit pl2">Terms of Service</Link></li>
							<li><Link to="/dmca" className="link color-inherit pl2">DMCA</Link></li>
						</ul>
						<a className="github-button" href="https://github.com/LetsWatchVideo" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" data-show-count="false" aria-label="Follow @LetsWatchVideo on GitHub">Follow @LetsWatchVideo</a>
					</footer>
				</div>
			</div>
		</>
	);
}

export default pulseInst.wrapped(App, (ctx) => {
	console.log(ctx);
	return {
		isAuthenticated: ctx.base.isAuthenticated,
		accounts: ctx.accounts
	};
});
