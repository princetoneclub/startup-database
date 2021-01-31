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
				<div>
					<Table names={this.state.companyList} />
				</div>
				{/* <div class="modal fade" id="DescModal" role="dialog">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
								<h3 class="modal-title">Job Requirements Description</h3>
							</div>
							<div class="modal-body">
								<h5 class="text-center">Hello. Below is the descripton and/or requirements for hiring consideration.</h5>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default " data-dismiss="modal">Apply!</button>
								<button type="button" class="btn btn-primary">Close</button>
							</div>
						</div>
					</div>		
				</div> */}
			</div>
		);
	}
}

export default Database;
