import React, { Component } from 'react';
import './Home.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
addStyle(Button, 'apply');

class Home extends Component {
	constructor(props) {
		super(props);
		this.handleApplyClick = this.handleApplyClick.bind(this);
	}

	handleApplyClick() {
		this.props.history.push('/apply');
	}

	render() {
		let button = <ApplyButton onClick={this.handleApplyClick} />;
		return <div> {button} </div>;
	}
}

function ApplyButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div id="welcome-text">
					<p>E-Club Startup Database </p>
				</div>
				<Col>
					<div id="begin-button">
						<Button bsStyle="apply" bsSize="large" onClick={props.onClick}>
							View Startups
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Home;
