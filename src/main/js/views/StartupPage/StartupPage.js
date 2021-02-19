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
			<div class="startup-logo"><StartupLogoName startup={props.startup}></StartupLogoName></div>
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
}

function StartupLogoName(props) {
	const data = props.startup.startupLogo;
	console.log(data);
	return(
		<div>
			<img src={'data:image/jpeg;base64,${data}'}></img>
			<br />
			<b>{props.startup.name}</b>
		</div>
	);
}

function SomeFields(props) {
	return(
		<div>
			Text
		</div>
	);
}

function Tags(props) {
	return(
		<div>
			Text
		</div>
	);
}

function IndustryHQ(props) {
	return(
		<div>
			Text
		</div>
	);
}	

function About(props) {
	return(
		<div>
			Text
		</div>
	);
}

function ProductInnovation(props) {
	return(
		<div>
			Text
		</div>
	);
}

function Traction(props) {
	return(
		<div>
			Text
		</div>
	);
}

function FuturePlans(props) {
	return(
		<div>
			Text
		</div>
	);
}

function OneLiner(props) {
	return(
		<div>
			Text
		</div>
	);
}

function FoundingTeam(props) {
	return(
		<div>
			Text
		</div>
	);
}


export default StartupPage;
