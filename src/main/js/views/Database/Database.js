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
		companyList: [],
		total:0
	};

	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		await axios
			.get('/api/companies')
			.then(res => {
				console.log(res.data.length);
				console.log(res.data);
				this.setState({ 
					companyList: res.data,
					total: res.data.length
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		return(
			<div>
				<div>
					<p>{this.state.total} Registered Startups</p>
					<Table names={this.state.companyList} total={this.state.total}/>
				</div>
			</div>
		);
	}
}

export default Database;
