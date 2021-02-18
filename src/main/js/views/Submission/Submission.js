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
        errorMessage: '',
        startupLogo:'',
        stage:'',
        about:'',
        productInnovation:'',
        traction:'',
        futurePlans:'',
        email:'',
        tags:'',
        oneLiner:'',
        founderName:'',
        founderRole:'',
        founderPhoto:''
    };

    constructor(props, context) {
        super(props, context);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.updateState = this.updateState.bind(this);
        // this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
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
                status: 'unverified',
                startupLogo: this.state.startupLogo,
                stage: this.state.stage,
                about: this.state.about,
                productInnovation: this.state.productInnovation,
                traction: this.state.traction,
                futurePlans: this.state.futurePlans,
                email: this.state.email,
                tags: this.state.tags,
                oneLiner: this.state.oneLiner,
                founderName: this.state.founderName,
                founderRole: this.state.founderRole,
                founderPhoto: this.state.founderPhoto
			})
			.then(function (response) {
                console.log(response);
                const formData = new FormData();
                const formData1 = new FormData();
                formData.append('file', this.state.startupLogo);
                formData1.append('file', this.state.founderPhoto);
                axios
                    .post('/api/trialcompany/startuplogoupload/' + response.data.id, formData)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                    });
                axios
                    .post('/api/trialcompany/founderimageupload/' + response.data.id, formData1)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                    });
            })
			.catch(function (error) {
				console.log(error);
            });
            this.props.history.push('/submitted');
        }
    }

    onFileChangeHandler = (e) => {
		e.preventDefault();
        const name = e.target.name;
        this.setState({
            [name]: e.target.files[0]
        });
		// this.setState({
		// 	resumeFile: e.target.files[0]
		// });
		console.log("UPLOADED DATA");
		console.log(e.target.files[0]);
	};

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
                    <FileEntry
                        name="startupLogo"
						label="Upload Your Logo"
						onChange={this.onFileChangeHandler}
					/>
                    <ShortFormEntry
                        label="Stage:"
                        ph="Stage"
                        name="stage"
                        v={this.state.stage}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Email:"
                        ph="Email"
                        name="email"
                        v={this.state.email}
                        onChange={this.updateState}
                    />
                    <FormEntry
                        label="About:"
                        ph="About"
                        name="about"
                        v={this.state.about}
                        onChange={this.updateState}
                    />
                    <FormEntry
                        label="Product Innovation:"
                        ph="Product Innovation"
                        name="productInnovation"
                        v={this.state.productInnovation}
                        onChange={this.updateState}
                    />
                    <FormEntry
                        label="Traction:"
                        ph="Traction"
                        name="traction"
                        v={this.state.traction}
                        onChange={this.updateState}
                    />
                    <FormEntry
                        label="Future Plans:"
                        ph="Future Plans"
                        name="futurePlans"
                        v={this.state.futurePlans}
                        onChange={this.updateState}
                    />         
                    <ShortFormEntry
                        label="One Liner:"
                        ph="One Liner"
                        name="oneLiner"
                        v={this.state.oneLiner}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Tags:"
                        ph="Tags"
                        name="tags"
                        v={this.state.tags}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder Name:"
                        ph="Founder Name"
                        name="founderName"
                        v={this.state.founderName}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder Role:"
                        ph="Founder Role"
                        name="founderRole"
                        v={this.state.founderRole}
                        onChange={this.updateState}
                    />
                    <FileEntry
                        name="founderPhoto"
						label="Upload Your Founder Photo"
						onChange={this.onFileChangeHandler}
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

function FileEntry(props) {
	return (
		<FormGroup>
			<ControlLabel id="short-form-label">{props.label}</ControlLabel>
			<input id="file-upload-button" type="file" name="file" onChange={props.onChange} required />
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
