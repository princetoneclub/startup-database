import React from 'react';
import './Submission.css';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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

    handleSubmitClick() {
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
            axios
			.post('/api/trialcompany/new', {
                name: this.state.name,
                technology: this.state.technology,
                industry: this.state.industry,
                region: this.state.region,
                employeeCount: this.state.employeeCount,
                totalFunding: this.state.totalFunding,
                websiteLink: this.state.websiteLink
			})
			.then(function (response) {
                console.log(response);
                const history = useHistory();
                history.push('/submitted');
            })
			.catch(function (error) {
				console.log(error);
			});
        }
    }

    render() {
        return (
            <div>
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
                        ph="3 Traits"
                        name="traits"
                        v={this.state.traits}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Industries:"
                        ph="Why Join"
                        name="whyjoin"
                        v={this.state.whyjoin}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Technologies:"
                        ph="Extracurriculars"
                        name="extracurr"
                        v={this.state.extracurr}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Region:"
                        ph="Idea"
                        name="idea"
                        v={this.state.idea}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Employee Count:"
                        ph="Resume"
                        name="resume"
                        v={this.state.resume}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Total Funding:"
                        ph="Portfolio"
                        name="portfolio"
                        v={this.state.portfolio}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Website Link:"
                        ph="Tigertrek Interest"
                        name="tigertrek"
                        v={this.state.tigertrek}
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

export default Submission;
