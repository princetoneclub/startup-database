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

import './About.css';

class About extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
        <div>
            <b style={{fontSize:'24px'}}>Development Team</b>
            <div class="about-pics">
                <div class="charlie-headshot"><Headshot name={"Charles An"} role={"Lead Developer"} img={"chuck"}></Headshot></div>
                <div class="wells-headshot"><Headshot name={"Alsten Carson"} role={"Creative Director"} img={"wells"}></Headshot></div>
                <div class="justin-headshot"><Headshot name={"Justin Curl"} role={"Tertiary Developer"} img={"curl"}></Headshot></div>  
                <div class="david-headshot"><Headshot name={"David Basili"} role={"Project Manager"} img={"david"}></Headshot></div>
                <div class="devin-headshot"><Headshot name={"Devin Plumb"} role={"Data Researcher"} img={"devin"}></Headshot></div>
                <div class="empty-headshot"><EmptyHeadshot></EmptyHeadshot></div>
                <div class="empty2-headshot"><EmptyHeadshot></EmptyHeadshot></div>
                <div class="empty3-headshot"><EmptyHeadshot></EmptyHeadshot></div>
                <div class="empty4-headshot"><EmptyHeadshot></EmptyHeadshot></div>
		    </div>
        </div>);
	}
}

function Headshot(props) {
	return (
		<div>
            {/* <b style={{fontSize:'18px'}}>Development Team</b> */}
			<br />
            <div id={props.img+"headshotLogo"}></div>
			{/* <img id="headshotLogo"  width="100" height='auto'></img> */}
			<br />
			<div style={{fontSize: '18px'}}>{props.name}, {props.role}</div>
        </div>
	);
}

function EmptyHeadshot(props) {
	return (
		<div>
            <div id="emptyheadshot"></div>
        </div>
	);
}


export default About;
