import React from 'react';
import { Helmet } from "react-helmet";
// import { Link } from 'react-router-dom';

import config from '../../config';

import '../../styles/index.css';


export default class LoggedoutLayout extends React.Component {
	render() {
		const {
			children,
			title,
			themeName
		} = this.props;
		return (
			<>
				<Helmet {...config.layout} title={ title } />

				<p>
theme is&nbsp;
					{themeName}
				</p>
				<div>{children}</div>
			</>
		);
	}
}
