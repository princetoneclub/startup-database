import React from 'react';
import './Submission.css';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from "react-bootstrap";
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
        founder1Name:'',
        founder1Role:'',
        founder1Photo:'',
        founder1Linkedin:'',
        founder2Name:'',
        founder2Role:'',
        founder2Photo:'',
        founder2Linkedin:'',
        founder3Name:'',
        founder3Role:'',
        founder3Photo:'',
        founder3Linkedin:'',
        founder4Name:'',
        founder4Role:'',
        founder4Photo:'',
        founder4Linkedin:'',
        founder5Name:'',
        founder5Role:'',
        founder5Photo:'',
        founder5Linkedin:''
    };

    constructor(props, context) {
        super(props, context);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.updateState = this.updateState.bind(this);
        // this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    }

    updateState(e) {
        const name = e.target.name;
        // console.log(name);
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
        var startupLogo = this.state.startupLogo;
        var stage = this.state.stage;
        var about = this.state.about;
        var productInnovation = this.state.productInnovation;
        var traction = this.state.traction;
        var futurePlans = this.state.futurePlans;
        var email = this.state.email;
        var tags = this.state.tags;
        var oneLiner = this.state.oneLiner;
        var founder1Name = this.state.founder1Name;
        var founder1Role = this.state.founder1Role;
        var founder1Photo = this.state.founder1Photo;
        var founder1Linkedin = this.state.founder1Linkedin;
        var fields = [name, industry, technology, region, employeeCount, totalFunding, websiteLink, 
            startupLogo, stage, about, productInnovation, traction, futurePlans, email, tags, oneLiner, 
            founder1Name, founder1Role, founder1Photo, founder1Linkedin];
            /*
                founder2Name, founder2Role, founder2Photo, founder2Linkedin,
                founder3Name, founder3Role, founder3Photo, founder3Linkedin,
                founder4Name, founder4Role, founder4Photo, founder4Linkedin,
                founder5Name, founder5Role, founder5Photo, founder5Linkedin
            */
        var fieldsFilled = false;
        var count = 0;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i] == '') {
                this.setState({ errorMessage: 'Please fill out all fields except those marked "optional".' });
            }
            else {
                count += 1;
            }
        }
        if (count == fields.length) {
            fieldsFilled = true;
        }
        if (fieldsFilled == true) {
            const that=this;
            var tempStartupId = '';
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
                // startupLogo: this.state.startupLogo,
                stage: this.state.stage,
                about: this.state.about,
                productInnovation: this.state.productInnovation,
                traction: this.state.traction,
                futurePlans: this.state.futurePlans,
                email: this.state.email,
                tags: this.state.tags,
                oneLiner: this.state.oneLiner,
			})
			.then(async function (response) {
                console.log(response);
                tempStartupId = response.data.id;
                const formData = new FormData();
                console.log(that.state.startupLogo);
                formData.append('file', that.state.startupLogo);
                await axios
                    .post('/api/trialcompany/startuplogoupload/' + response.data.id, formData)
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

            console.log("TEMP STARTUP ID");
            console.log(tempStartupId);

            //Founder 1
            await axios
            .post('/api/founders/new', {
                founderName: this.state.founder1Name,
                founderRole: this.state.founder1Role,
                startupId: tempStartupId,
                companyId: 0,
                linkedin: this.state.founder1Linkedin
			})
			.then(async function (response) {
                if (that.state.founder1Photo!='') {
                    console.log(response);
                    const formData1 = new FormData();
                    console.log(that.state.founder1Photo);
                    formData1.append('file', that.state.founder1Photo);
                    await axios
                        .post('/api/founders/founderimageupload/' + response.data.id, formData1)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                        });
                }
            })
			.catch(function (error) {
				console.log(error);
            });

            //Founder 2
            await axios
            .post('/api/founders/new', {
                founderName: this.state.founder2Name,
                founderRole: this.state.founder2Role,
                startupId: tempStartupId,
                companyId: 0,
                linkedin: this.state.founder2Linkedin
			})
			.then(async function (response) {
                if (that.state.founder2Photo!='') {
                    console.log(response);
                    const formData1 = new FormData();
                    console.log(that.state.founder2Photo);
                    formData1.append('file', that.state.founder2Photo);
                    await axios
                        .post('/api/founders/founderimageupload/' + response.data.id, formData1)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                        });
                }
                
            })
			.catch(function (error) {
				console.log(error);
            });

            //Founder 3
            await axios
            .post('/api/founders/new', {
                founderName: this.state.founder3Name,
                founderRole: this.state.founder3Role,
                startupId: tempStartupId,
                companyId: 0,
                linkedin: this.state.founder3Linkedin
			})
			.then(async function (response) {
                if (that.state.founder3Photo!='') {
                    console.log(response);
                    const formData1 = new FormData();
                    console.log(that.state.founder3Photo);
                    formData1.append('file', that.state.founder3Photo);
                    await axios
                        .post('/api/founders/founderimageupload/' + response.data.id, formData1)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                        });
                }
            })
			.catch(function (error) {
				console.log(error);
            });

            //Founder 4
            await axios
            .post('/api/founders/new', {
                founderName: this.state.founder4Name,
                founderRole: this.state.founder4Role,
                startupId: tempStartupId,
                companyId: 0,
                linkedin: this.state.founder4Linkedin
			})
			.then(async function (response) {
                if (that.state.founder4Photo!='') {
                    console.log(response);
                    const formData1 = new FormData();
                    console.log(that.state.founder4Photo);
                    formData1.append('file', that.state.founder4Photo);
                    await axios
                        .post('/api/founders/founderimageupload/' + response.data.id, formData1)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                        });
                }
            })
			.catch(function (error) {
				console.log(error);
            });

            //Founder 5
            await axios
            .post('/api/founders/new', {
                founderName: this.state.founder5Name,
                founderRole: this.state.founder5Role,
                startupId: tempStartupId,
                companyId: 0,
                linkedin: this.state.founder5Linkedin
			})
			.then(async function (response) {
                if (that.state.founder5Photo!='') {
                    console.log(response);
                    const formData1 = new FormData();
                    console.log(that.state.founder5Photo);
                    formData1.append('file', that.state.founder5Photo);
                    await axios
                        .post('/api/founders/founderimageupload/' + response.data.id, formData1)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                        });
                }
            })
			.catch(function (error) {
				console.log(error);
            });

            this.props.history.push('/submitted');
        }
    }

    onStartupLogoChangeHandler = (e) => {
		e.preventDefault();
		this.setState({
			startupLogo: e.target.files[0]
		});
		console.log("UPLOADED DATA");
		console.log(e.target.files[0]);
	};
    onFounder1PhotoChangeHandler = (e) => {
		e.preventDefault();
		this.setState({
			founder1Photo: e.target.files[0]
		});
		console.log("UPLOADED DATA");
		console.log(e.target.files[0]);
	};
    onFounder2PhotoChangeHandler = (e) => {
		e.preventDefault();
		this.setState({
			founder2Photo: e.target.files[0]
		});
		console.log("UPLOADED DATA");
		console.log(e.target.files[0]);
	};
    onFounder3PhotoChangeHandler = (e) => {
		e.preventDefault();
		this.setState({
			founder3Photo: e.target.files[0]
		});
		console.log("UPLOADED DATA");
		console.log(e.target.files[0]);
	};
    onFounder4PhotoChangeHandler = (e) => {
		e.preventDefault();
		this.setState({
			founder4Photo: e.target.files[0]
		});
		console.log("UPLOADED DATA");
		console.log(e.target.files[0]);
	};
    onFounder5PhotoChangeHandler = (e) => {
		e.preventDefault();
		this.setState({
			founder5Photo: e.target.files[0]
		});
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
                    <SelectIndustryEntry
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
                    <SelectRegionEntry
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
						label="Upload Your Logo (1 MB PNG files only, square sizes display the best)"
						onChange={this.onStartupLogoChangeHandler}
					/>
                    <SelectStatusEntry
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
                        label="Founder 1 Name: (mandatory)"
                        ph="Founder 1 Name"
                        name="founder1Name"
                        v={this.state.founder1Name}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 1 Role: (mandatory)"
                        ph="Founder 1 Role"
                        name="founder1Role"
                        v={this.state.founder1Role}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 1 Linkedin: (mandatory)"
                        ph="Founder 1 Linkedin"
                        name="founder1Linkedin"
                        v={this.state.founder1Linkedin}
                        onChange={this.updateState}
                    />
                    <FileEntry
                        name="founder1Photo"
						label="Upload Your Founder 1 Photo (1 MB PNG file only) (mandatory)"
						onChange={this.onFounder1PhotoChangeHandler}
					/>

                    <ShortFormEntry
                        label="Founder 2 Name: (optional)"
                        ph="Founder 2 Name"
                        name="founder2Name"
                        v={this.state.founder2Name}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 2 Role: (optional)"
                        ph="Founder 2 Role"
                        name="founder2Role"
                        v={this.state.founder2Role}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 2 Linkedin: (optional)"
                        ph="Founder 2 Linkedin"
                        name="founder2Linkedin"
                        v={this.state.founder2Linkedin}
                        onChange={this.updateState}
                    />
                    <FileEntry
                        name="founder2Photo"
						label="Upload Your Founder 2 Photo (1 MB PNG file only) (optional)"
						onChange={this.onFounder2PhotoChangeHandler}
					/>

                    <ShortFormEntry
                        label="Founder 3 Name: (optional)"
                        ph="Founder 3 Name"
                        name="founder3Name"
                        v={this.state.founder3Name}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 3 Role: (optional)"
                        ph="Founder 3 Role"
                        name="founder3Role"
                        v={this.state.founder3Role}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 3 Linkedin: (optional)"
                        ph="Founder 3 Linkedin"
                        name="founder3Linkedin"
                        v={this.state.founder3Linkedin}
                        onChange={this.updateState}
                    />
                    <FileEntry
                        name="founder3Photo"
						label="Upload Your Founder 3 Photo (1 MB PNG file only) (optional)"
						onChange={this.onFounder3PhotoChangeHandler}
					/>

                    <ShortFormEntry
                        label="Founder 4 Name: (optional)"
                        ph="Founder 4 Name"
                        name="founder4Name"
                        v={this.state.founder4Name}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 4 Role: (optional)"
                        ph="Founder 4 Role"
                        name="founder4Role"
                        v={this.state.founder4Role}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 4 Linkedin: (optional)"
                        ph="Founder 4 Linkedin"
                        name="founder4Linkedin"
                        v={this.state.founder4Linkedin}
                        onChange={this.updateState}
                    />
                    <FileEntry
                        name="founder4Photo"
						label="Upload Your Founder 4 Photo (1 MB PNG file only) (optional)"
						onChange={this.onFounder4PhotoChangeHandler}
					/>  

                    <ShortFormEntry
                        label="Founder 5 Name: (optional)"
                        ph="Founder 5 Name"
                        name="founder5Name"
                        v={this.state.founder5Name}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 5 Role: (optional)"
                        ph="Founder 5 Role"
                        name="founder5Role"
                        v={this.state.founder5Role}
                        onChange={this.updateState}
                    />
                    <ShortFormEntry
                        label="Founder 5 Linkedin: (optional)"
                        ph="Founder 5 Linkedin"
                        name="founder5Linkedin"
                        v={this.state.founder5Linkedin}
                        onChange={this.updateState}
                    />
                    <FileEntry
                        name="founder5Photo"
						label="Upload Your Founder 5 Photo (1 MB PNG file only) (optional)"
						onChange={this.onFounder5PhotoChangeHandler}
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

function SelectIndustryEntry(props) {
    return (
        <FormGroup >
            <ControlLabel id="short-form-label">{props.label}</ControlLabel>
            <select id="status-select" class="form-control" name={props.name} onChange={props.onChange}>
                <option value="" selected></option>
                <option value="B2B Software and Services">B2B Software and Services</option>
                <option value="Education">Education</option>
                <option value="Consumer">Consumer</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Real Estate &amp; Construction">Real Estate &amp; Construction</option>
                <option value="Financial Technology">Financial Technology</option>
                <option value="Industrials">Industrials</option>
            </select>   
        </FormGroup>
    );
}

function SelectRegionEntry(props) {
    return (
        <FormGroup >
            <ControlLabel id="short-form-label">{props.label}</ControlLabel>
            <select id="status-select" class="form-control" name={props.name} onChange={props.onChange}>
                <option value="" selected></option>
                <option value="North America">North America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Central America">Central America</option>
                <option value="South America">South America</option>
                <option value="Oceania">Oceania</option>
            </select>   
        </FormGroup>
    );
}

function SelectStatusEntry(props) {
    return (
        <FormGroup >
            <ControlLabel id="short-form-label">{props.label}</ControlLabel>
            <select id="status-select" class="form-control" name={props.name} onChange={props.onChange}>
                <option value="" selected></option>
                <option value="Active">Active</option>
                <option value="Public">Public</option>
                <option value="Acquired">Acquired</option>
                <option value="Inactive">Inactive</option>
            </select>   
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
