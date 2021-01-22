import React, { Component } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
addStyle(Button, 'apply');

class Submitted extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		let button = <ApplyButton />;
		return <div> {button} </div>;
	}
}

function ApplyButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div id="welcome-text">
					<p>Thank you. Your application has been submitted.</p>
				</div>
			</Row>
		</div>
	);
}

export default Submitted;
