import React, { Component } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import {withRouter} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import './StartupPage.css';

class StartupPage extends Component {
	state = {
        currStartup: '',
        currStartupId: 0,
    };

	constructor(props) {
		super(props);
		// this.displayInfo = this.displayInfo.bind(this);
	}

	componentDidMount() {
		console.log(this.props.location.search);
		const values = queryString.parse(this.props.location.search);
		console.log(values.filter); // "top"
		console.log(values.origin); // "im"
		console.log(values.id);
		var startupId = values.id;

        // const { id } = this.props.match.params;        
        // console.log(id);
        // const location = useLocation();
        // console.log(location.pathname);
        // this.setState({currStartupId:id});
        // console.log(this.state.currStartupId);
        axios
			.get('/api/companies/'+startupId)
			.then(res => {
                console.log(res);
                console.log(res.data);
				this.setState({ currStartup: res.data });
			})
			.catch(err => console.log(err));
	}

	// async displayInfo(userId) {
		
	// }

	render() {
        console.log(this.state.currStartup);
		var display = (<StartupProfile startup={this.state.currStartup}></StartupProfile>);

		return <div>{display}</div>;
	}
}

function StartupProfile(props) {
	return (
		<div>
			<div id="user-profile">
				<div id="chunk">
					<p id="header">
						{props.startup.name}
					</p>
					<p id="information"> Name: {props.startup.name}</p>
					<p id="information"> Industry: {props.startup.industry}</p>
					<p id="information"> Technology: {props.startup.technology}</p>
					<p id="information"> Region: {props.startup.region}</p>
					<p id="information"> Employee Count: {props.startup.employeeCount}</p>
					<p id="information"> Total Funding: {props.startup.totalFunding}</p>
					<p id="information"> Website Link: <a href={props.startup.websiteLink}>{props.startup.websiteLink}</a></p>
				</div>
			</div>
		</div>
	);
}



export default StartupPage;
