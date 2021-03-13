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
import About from './views/About/About.js'

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div id="page-container">
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
						<Route path="/about-us" component={About} />
					</Switch>
					
					<footer id="footer">
						&copy; 2021 <a href="https://www.princetoneclub.com" target="_blank">The Princeton Entrepreneurship Club, Princeton University</a>
						<a href="https://www.facebook.com/Princetoneclub" class="fa fa-facebook"></a>
						<a href="https://www.instagram.com/princetoneclub" class="fa fa-instagram"></a>
						<a href="https://www.twitter.com/princetoneclub/" class="fa fa-twitter"></a>
					</footer>
					
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
