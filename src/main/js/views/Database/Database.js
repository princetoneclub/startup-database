import React, { Component } from 'react';
import './Database.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
addStyle(Button, 'apply');

class Database extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div> Database here </div>;
	}
}

export default Database;
