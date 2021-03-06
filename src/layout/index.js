import React from 'react';
import { Helmet } from "react-helmet";
// import { Link } from 'react-router-dom';

import config from '../../config';

import '../../styles/index.css';


export default class LoggedoutLayout extends React.Component {
	render() {
		const {
			children,
			title
		} = this.props;
		return (
			<>
				<Helmet {...config.layout} title={ title } />
				<section className="w-100 vh-100 flex flex-column">
					{children}
				</section>
			</>
		);
	}
}
