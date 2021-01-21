import React, { Component } from 'react';
import './Database.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import Table from './Table.js';
import axios from 'axios';

addStyle(Button, 'apply');

class Database extends Component {
	state = {
		companyList: []
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		axios
			.get('/api/companies')
			.then(res => {
				this.setState({ companyList: res.data});
			})
			.catch(err => console.log(err));
	}

	render() {
		return(
			<div>
				<Table names={this.state.companyList} />
			</div>
		);
	}
}

export default Database;
