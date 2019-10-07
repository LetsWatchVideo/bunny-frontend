import React from 'react';

import pulseInst from '../../pulse';

function App(props) {
	const {
		pulse,
	} = props;
	const {
		authed
	} = pulse;
	return (
		<>
			<div className="absolute left-0 top-0 w-50 h-100">
				<div className="absolute w-60 mw-100 top-50 left-50 magic">
					<h2 className="f1 mb0">letswatch.video</h2>
					<h2 className="f4 tracked">Shared browser streaming service</h2>
					{authed}
				</div>
			</div>
			<div className="absolute left-50 top-0 w-50 h-100">
				<div className="mw-100 h-100 cover" style={{ backgroundImage: 'url(http://placekitten.com/g/1920/1080)' }}>
				</div>
			</div>
		</>
	);
}

export default pulseInst.wrapped(App, (ctx) => {
	console.log(ctx);
	return {
		authed: ctx.accounts.authed
	};
});
