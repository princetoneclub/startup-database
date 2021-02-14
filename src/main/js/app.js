const ReactDOM = require('react-dom');
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
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
										Registered Startup Database
									</a>
								</Navbar.Brand>
								{/* <Navbar.Toggle /> */}
								<Nav pullRight>
									<NavItem eventKey={2} href="/submission">
										<a href="/submission" id="promo" class="button">Register</a>
									</NavItem>
								</Nav>
							</Navbar.Header>
							{/* <Navbar.Collapse>
								
								
							</Navbar.Collapse> */}
						</Navbar>
					</div>
					<Switch>
						<Route exact path="/" component={Database} />
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
