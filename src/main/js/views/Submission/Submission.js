import React from 'react';
import './Submission.css';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
addStyle(Button, 'next');

class Submission extends React.Component {
    state = {
        name:'',
        industry:'',
        technology:'',
        region:'',
        employeeCount:'',
        totalFunding:'',
        websiteLink:'',
        errorMessage: ''
    };

    constructor(props, context) {
        super(props, context);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    async handleSubmitClick() {
        var name = this.state.name;
        var industry = this.state.industry;
        var technology = this.state.technology;
        var region = this.state.region;
        var employeeCount = this.state.employeeCount;
        var totalFunding = this.state.totalFunding;
        var websiteLink = this.state.websiteLink;
        var fields = [name, industry, technology, region, employeeCount, totalFunding, websiteLink];
        var fieldsFilled = false;
        var count = 0;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i] == '') {
                this.setState({ errorMessage: 'Please fill out all fields.' });
            }
            else {
                count += 1;
            }
        }
        if (count == fields.length) {
            fieldsFilled = true;
        }
        if (fieldsFilled == true) {
            await axios
			.post('/api/trialcompany/new', {
                name: this.state.name,
                technology: this.state.technology,
                industry: this.state.industry,
                region: this.state.region,
                employeeCount: this.state.employeeCount,
                totalFunding: this.state.totalFunding,
                websiteLink: this.state.websiteLink,
                status: 'unverified'
			})
			.then(function (response) {
                // console.log(response);
                // const history = useHistory();
                
            })
			.catch(function (error) {
				console.log(error);
            });
            this.props.history.push('/submitted');
        }
    }

    render() {
        return (
            <div id="submission-wrapper">
                <div id="title">
                    <p>Startup Submission Form</p>
                </div>
                <div
                    style={{
                        color: 'black',
                        display: 'flex',
                        'justify-content': 'center'
                    }}
                >
                    <span>&#9888;</span>
                    Please ensure correct spelling of all fields.
                </div>
                <form>
                    <ShortFormEntry
                        label="Name of company:"
                        ph="Name"
                        name="name"
                        v={this.state.name}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Industries:"
                        ph="Industries"
                        name="industry"
                        v={this.state.industry}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Technologies:"
                        ph="Technologies"
                        name="technology"
                        v={this.state.technology}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Region:"
                        ph="Region"
                        name="region"
                        v={this.state.region}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Employee Count:"
                        ph="Employee Count"
                        name="employeeCount"
                        v={this.state.employeeCount}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Total Funding:"
                        ph="Total Funding"
                        name="totalFunding"
                        v={this.state.totalFunding}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Website Link:"
                        ph="Link"
                        name="websiteLink"
                        v={this.state.websiteLink}
                        onChange={this.updateState}
                    />

                </form>
                <div
                    style={{
                        color: 'black',
                        display: 'flex',
                        'justify-content': 'center'
                    }}
                >
                    <mark>
                        {/* <span>&#9888;</span> */}
                        {this.state.errorMessage}
                    </mark>

                </div>
                <SubmitButton onClick={this.handleSubmitClick} />
            </div>
        );
    }
}

function FormEntry(props) {
    return (
        <FormGroup>
            <ControlLabel id="short-form-label">{props.label}</ControlLabel>
            <FormControl
                required
                id="long-form-answer"
                name={props.name}
                // type="text"
                componentClass="textarea"
                placeholder={props.ph}
                value={props.v}
                onChange={props.onChange}
            />
        </FormGroup>
    );
}

function ShortFormEntry(props) {
	return (
		<FormGroup>
			<ControlLabel id="short-form-label">{props.label}</ControlLabel>
			<FormControl
				required
				id="short-form-answer"
				name={props.name}
				type="text"
				placeholder={props.ph}
				value={props.v}
				onChange={props.onChange}
			/>
		</FormGroup>
	);
}

function SubmitButton(props) {
    return (
        <Row className="center-block text-center">
            <Col>
                <Button bsStyle="next" bsSize="large" onClick={props.onClick}>
                    Submit
				</Button>
            </Col>
        </Row>
    );
}

export default withRouter(Submission);
