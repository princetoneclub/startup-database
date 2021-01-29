const ReactDOM = require('react-dom');
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import './app.css';
import Home from './views/Home/Home.js';
import Database from './views/Database/Database.js';
import Submission from './views/Submission/Submission.js';
import Submitted from './views/Submitted/Submitted.js';
import StartupPage from './views/StartupPage/StartupPage.js';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<div>
						<Navbar id="nav">
							<Navbar.Header>
								<Navbar.Brand>
									<div id="logo"> </div>
									<a href="/" id="application-portal">
										Startup Database
									</a>
								</Navbar.Brand>
								<Navbar.Toggle />
							</Navbar.Header>
							<Navbar.Collapse>
								<Nav pullRight>
									<NavItem eventKey={1} href="/database">
										<a href="/database" id="promo">
											Database
										</a>
									</NavItem>
									<NavItem eventKey={2} href="/submission">
										<a href="/submission" id="promo">
											Submit
										</a>
									</NavItem>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>
					<Switch>
						<Route exact path="/" component={Home} exact />
						<Route path="/database" component={Database} />
						<Route path="/submission" component={Submission} />
						<Route path="/submitted" component={Submitted} />
						<Route path="/startuppage/:id" component={StartupPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
