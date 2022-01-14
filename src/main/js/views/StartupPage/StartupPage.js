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
		founders: []
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
		axios
			.get('/api/companies/'+startupId+"/founders")
			.then(res => {
                console.log(res);
                console.log(res.data);
				this.setState({ founders: res.data });
			})
			.catch(err => console.log(err));
	}

	render() {
        console.log(this.state.currStartup);
		if (this.state.founders.length==0) {
			var display = (<div></div>);
		}
		else {
			var display = (<StartupProfile founders={this.state.founders} startup={this.state.currStartup}></StartupProfile>);
		}

		return <div>{display}</div>;
	}
}

function StartupProfile(props) {
	return (
		<div class="grid-container">
			<div class="startup-logo"><StartupLogoName startup={props.startup}></StartupLogoName></div>
			<div class="some-fields"><SomeFields startup={props.startup}></SomeFields></div>
			<div class="tags"><Tags startup={props.startup}></Tags></div>  
			{/* <div class="industry-hq"><IndustryHQ startup={props.startup}></IndustryHQ></div> */}
			<div class="about"><About startup={props.startup}></About></div>
			<div class="product-innovation"><ProductInnovation startup={props.startup}></ProductInnovation></div>
			<div class="traction"><Traction startup={props.startup}></Traction></div>
			<div class="future-plans"><FuturePlans startup={props.startup}></FuturePlans></div>
			<div class="one-liner"><OneLiner startup={props.startup}></OneLiner></div>
			<div class="founding-team"><FoundingTeam founders={props.founders} startup={props.startup}></FoundingTeam></div>
		</div>
	);
}

function StartupLogoName(props) {
	const data = props.startup.startupLogo;
	const imageString = "data:image/png;base64,"+data;
	// console.log(imageString);
	return(
		<div>
			<img id="startupLogo" src={imageString} width="100" height="auto"></img>
			<br />
			<b style={{fontSize: '30px'}}>{props.startup.name}</b>
			<hr style={{width:'95%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function SomeFields(props) {
	return(
		<div style={{fontSize:'16px'}}>
			<div style={{textAlign:'left',width:'60%',margin:'auto'}}>
				<b>Website:</b> <a class="web-link" href={"//"+props.startup.websiteLink} target="_blank">click here</a>
				<br />
				<b>Email:</b> <a class="web-link" href={"mailto:"+props.startup.email}>{props.startup.email}</a>
				<br />
				<b>Stage:</b> {props.startup.stage}
			</div>
			<hr style={{width:'95%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function Tags(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>TAGS</b>
			<br />
			<div style={{fontSize:'16px',display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'30px'}}>
				<div class="industryhqtags">{props.startup.industry}</div>
				<div class="industryhqtags">{props.startup.region}</div>
			</div>
		</div>
	);
}

function IndustryHQ(props) {
	return(
		<div style={{fontSize:'16px',display:'flex'}}>
			<div class="industryhqtags">{props.startup.industry}</div>
			<div class="industryhqtags">{props.startup.region}</div>
		</div>
	);
}	

function About(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>About</b>
			<br />
			<div class="middle-column">
				{props.startup.about}
			</div>
		</div>
	);
}

function ProductInnovation(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>Product Innovation</b>
			<br />
			<div class="middle-column">
				{props.startup.productInnovation}
			</div>
		</div>
	);
}

function Traction(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>Traction</b>
			<br />
			<div class="middle-column">
				{props.startup.traction}
			</div>
		</div>
	);
}

function FuturePlans(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>Future Plans</b>
			<br />
			<div class="middle-column">
				{props.startup.futurePlans}
			</div>
		</div>
	);
}

function OneLiner(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>One Liner</b>
			<br />
			<div class="left-column">
				{props.startup.oneLiner}
			</div>
			<hr style={{width:'95%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function FoundingTeam(props) {
	console.log(props.founders);
	const data = props.founders[0].founderPhoto;
	const imageString = "data:image/png;base64,"+data;
	return(
		<div>
			<b style={{fontSize:'18px'}}>Founding Team</b>
			<br />
			{/* <img id="founderLogo" src={imageString} width="100" height='auto'></img> */}
			<br />
			<div style={{fontSize: '15px'}}><a id="linkedinlink" href={props.founders[0].linkedin} target="_blank">{props.founders[0].founderName}, {props.founders[0].founderRole}</a></div>
			<div style={{fontSize: '15px'}}><a id="linkedinlink" href={props.founders[1].linkedin} target="_blank">{props.founders[1].founderName}, {props.founders[1].founderRole}</a></div>
			<div style={{fontSize: '15px'}}><a id="linkedinlink" href={props.founders[2].linkedin} target="_blank">{props.founders[2].founderName}, {props.founders[2].founderRole}</a></div>
			<div style={{fontSize: '15px'}}><a id="linkedinlink" href={props.founders[3].linkedin} target="_blank">{props.founders[3].founderName}, {props.founders[3].founderRole}</a></div>
			<div style={{fontSize: '15px'}}><a id="linkedinlink" href={props.founders[4].linkedin} target="_blank">{props.founders[4].founderName}, {props.founders[4].founderRole}</a></div>
		</div>
	);
}


export default StartupPage;
