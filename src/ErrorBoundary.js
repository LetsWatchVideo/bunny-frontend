import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error });
		window.Raven.captureException(error, { extra: errorInfo });
	}

	render() {
		const { children } = this.props;
		const { error } = this.state;
		if (error) {
			// render fallback UI
			return (
				<div
					className="snap"
					onClick={() => Raven.lastEventId() && Raven.showReportDialog()}
					onKeyDown={() => {}}
				>
					<p>We are sorry — something has gone wrong.</p>
					<p>Our team has been notified, but click here fill out a report.</p>
				</div>
			);
		} else {
			// when there's not an error, render children untouched
			return children;
		}
	}
}
