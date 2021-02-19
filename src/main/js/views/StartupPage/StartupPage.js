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
			<div class="some-fields"><SomeFields startup={props.startup}></SomeFields></div>
			<div class="tags"><Tags startup={props.startup}></Tags></div>  
			<div class="industry-hq"><IndustryHQ startup={props.startup}></IndustryHQ></div>
			<div class="about"><About startup={props.startup}></About></div>
			<div class="product-innovation"><ProductInnovation startup={props.startup}></ProductInnovation></div>
			<div class="traction"><Traction startup={props.startup}></Traction></div>
			<div class="future-plans"><FuturePlans startup={props.startup}></FuturePlans></div>
			<div class="one-liner"><OneLiner startup={props.startup}></OneLiner></div>
			<div class="founding-team"><FoundingTeam startup={props.startup}></FoundingTeam></div>
		</div>
	);
}

function StartupLogoName(props) {
	const data = props.startup.startupLogo;
	const imageString = "data:image/png;base64,"+data;
	console.log(imageString);
	return(
		<div>
			<img id="startupLogo" src={imageString} width="100" height="100"></img>
			<br />
			<b style={{'font-size': '30px'}}>{props.startup.name}</b>
			<hr style={{width:'60%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function SomeFields(props) {
	return(
		<div style={{'font-size':'16px'}}>
			Website: {props.startup.websiteLink}
			<br />
			Email: {props.startup.email}
			<br />
			Stage: {props.startup.stage}
			<hr style={{width:'60%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function Tags(props) {
	return(
		<div>
			<b style={{'font-size':'18px'}}>TAGS</b>
			<br />
			{props.startup.tags}
		</div>
	);
}

function IndustryHQ(props) {
	return(
		<div style={{'font-size':'16px',display:'flex'}}>
			<div class="industryhqtags">{props.startup.industry}</div>
			<div class="industryhqtags">{props.startup.region}</div>
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
