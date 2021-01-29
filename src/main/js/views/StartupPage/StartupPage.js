import React, { Component } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import './StartupPage.css';

class StartupPage extends Component {
	state = {
        currStartup: '',
        currStartupId: 0,
    };

	constructor(props) {
		super(props);
        let { id } = useParams();
        this.setState({currStartupId:id});
		// this.displayInfo = this.displayInfo.bind(this);
	}

	async componentDidMount() {
        let { id } = useParams();
        console.log(id);
        console.log(this.state.currStartupId);
        await axios
			.get('/api/companies/'+id)
			.then(res => {
                console.log(res);
                console.log(res.data);
				this.setState({ currStartupId: res.data });
			})
			.catch(err => console.log(err));
	}

	// async displayInfo(userId) {
		
	// }

	render() {
        console.log(this.state.currStartup);
		display = (<StartupProfile startup={this.state.currStartup}></StartupProfile>);

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
					<p id="information"> Industry: {props.startup.industry}</p>
					<p id="information"> Technology: {props.startup.technology}</p>
					<p id="information"> Region: {props.startup.region}</p>
				</div>
			</div>
		</div>
	);
}



export default StartupPage;
