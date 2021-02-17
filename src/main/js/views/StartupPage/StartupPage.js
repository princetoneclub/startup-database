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
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		var startupId = values.id;

        axios
			.get('/api/companies/'+startupId)
			.then(res => {
                console.log(res);
                console.log(res.data);
				this.setState({ currStartup: res.data });
			})
			.catch(err => console.log(err));
	}

	render() {
        console.log(this.state.currStartup);
		var display = (<StartupProfile startup={this.state.currStartup}></StartupProfile>);

		return <div>{display}</div>;
	}
}

function StartupProfile(props) {
	return (
		<div class="grid-container">
			<div class="startup-logo"><StartupLogoName></StartupLogoName></div>
			<div class="some-fields"><SomeFields></SomeFields></div>
			<div class="tags"><Tags></Tags></div>  
			<div class="industry-hq"><IndustryHQ></IndustryHQ></div>
			<div class="about"><About></About></div>
			<div class="product-innovation"><ProductInnovation></ProductInnovation></div>
			<div class="traction"><Traction></Traction></div>
			<div class="future-plans"><FuturePlans></FuturePlans></div>
			<div class="one-liner"><OneLiner></OneLiner></div>
			<div class="founding-team"><FoundingTeam></FoundingTeam></div>
		</div>
	);
	// <div id="user-profile">
	// 			<div id="chunk">
	// 				<p id="header">
	// 					{props.startup.name}
	// 				</p>
	// 				<p id="information"> Name: {props.startup.name}</p>
	// 				<p id="information"> Industry: {props.startup.industry}</p>
	// 				<p id="information"> Technology: {props.startup.technology}</p>
	// 				<p id="information"> Region: {props.startup.region}</p>
	// 				<p id="information"> Employee Count: {props.startup.employeeCount}</p>
	// 				<p id="information"> Total Funding: {props.startup.totalFunding}</p>
	// 				<p id="information"> Website Link: <a href={props.startup.websiteLink}>{props.startup.websiteLink}</a></p>
	// 			</div>
	// 		</div>
}

function StartupLogoName(props) {
	return(<div>Text</div>);
}

function SomeFields(props) {
	return(<div>Text</div>)
}

function Tags(props) {
	return(<div>Text</div>)
}

function IndustryHQ(props) {
	return(<div>Text</div>)
}	

function About(props) {
	return(<div>Text</div>)
}

function ProductInnovation(props) {
	return(<div>Text</div>)
}

function Traction(props) {
	return(<div>Text</div>)
}

function FuturePlans(props) {
	return(<div>Text</div>)
}

function OneLiner(props) {
	return(<div>Text</div>)
}

function FoundingTeam(props) {
	return(<div>Text</div>)
}


export default StartupPage;
