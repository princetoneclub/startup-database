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
						<Navbar id="nav" className="justify-content-center">
								<Navbar.Brand className="mx-auto" href="/">
									<div id="logo"> </div>
								</Navbar.Brand>
								<Navbar.Brand className="mx-auto">
									<a href="/" id="application-portal">
											Registered Startup Database
									</a>
								</Navbar.Brand>
								<NavItem className="mx-auto" eventKey={2} href="/submission">
										<a href="/submission" id="promo">
											Register
										</a>
								</NavItem>
							{/* <Navbar.Collapse>
								
								<Nav pullRight>
									<NavItem eventKey={2} href="/submission">
										<a href="/submission" id="promo">
											Register
										</a>
									</NavItem>
								</Nav>
							</Navbar.Collapse> */}
						</Navbar>
					</div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/database" component={Database} />
						<Route path="/submission" component={Submission} />
						<Route path="/submitted" component={Submitted} />
						<Route path="/startuppage" component={StartupPage} />
					</Switch>
					<div>
						{/* <Navbar id="foot">
							Powered by: <a href="princetoneclub.com">The Princeton Entrepreneurship Club</a>
						</Navbar> */}
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
