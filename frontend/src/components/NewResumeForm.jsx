import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PersonalInfoSection from './PersonalInfoSection';
import WorkExpSection from './WorkExpSection';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import BasicInfoSection from './BasicInfoSection';

import ResumeServices from '../Services/ResumeServices';
import ResumeController from '../controllers/ResumeController';
// import localForage from "localforage";
import {DataContext} from "../contexts/DataContext";
import localForage from "localforage";
import { Alert } from '@material-ui/lab';


class NewResumeForm extends Component {
    static contextType = DataContext;
    resumeService = null;

    state = {
        personalInfo: null,
        workExperiences: null,
        educationInfo: null,
        skills: null,
        basicInfo: null,
        isValid: false,
    };

    // user = useContext(DataContext)
    constructor(props) {
        super(props);
        this.resumeService = new ResumeServices();
        this.state= {
            isValid: true,
        }
    }

    getPersonalInfo = (childData) => {
        this.setState(
            {personalInfo: childData}
        );
    }

    getWorkExp = (childData) => {
        // console.log(childData);
        this.setState(
            {workExperiences: childData}
        );
    }
    getEducationInfo = (childData) => {
        // console.log(childData);
        this.setState(
            {educationInfo: childData}
        );
    }
    getSkills = (childData) => {
        // console.log(childData);
        this.setState(
            {skills: childData}
        );
    }
    getBasicInfo = (childData) => {
        // console.log(childData);
        this.setState(
            {basicInfo: childData}
        );
    }

    validate(data){
        if (data == null){
            this.state({
                isValid: false
            });
        } else{
            if (data.basicInfo == null ){
                this.setState({
                    isValid: false
                });
            } else {
                this.setState({
                    isValid: true
                });
            }
        }
    }
    async createNewResume(data) {
        this.validate(data);
        if (data.basicInfo != null){
            let resumeData = {
                userId: this.context.user.userId,
                content: JSON.stringify(data),
                title: data.basicInfo.title,
                level: data.basicInfo.level,
                company: data.basicInfo.company
            };
    
            let response = await ResumeController.addNewResume(resumeData);
            if (response.id !== null || response.id !== undefined) {
                //TODO: handle response in case error
                this.setState({
                    isValid : true,
                });
                let count = await ResumeController.getCountResumeByUserId(this.context.user.userId);
                this.context.user.setNumOfResume(count);
                
                await localForage.setItem('numOfResume', count);
                this.props.history.push('/');
                // return true;
                
            } else {
                this.setState({
                    isValid : false,
                });
            }
        }
        
    }

    async prepareResume() {
        console.log(this.state);
        await this.createNewResume(this.state);
    }

    render() {
        return (<React.Fragment>
            <div className="" style={{
                "width": "70%",
                "padding": "10px",
                "margin": "auto"
            }}>

                <Grid container>
                    <Grid item xs={12} sm={10}>
                        <Typography variant="h4" gutterBottom>
                            New Resume Form
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Button variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Button variant="contained" color="primary" onClick={() => this.prepareResume()} >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                {!this.state.isValid ? 
                        <Alert severity="error">Something wrong! Data is invalid!</Alert>
                        : ""}
                <BasicInfoSection set={this.getBasicInfo} isView={false}/>
                <br/>
                <PersonalInfoSection set={this.getPersonalInfo} isView={false}/>
                <br/>
                <WorkExpSection set={this.getWorkExp} isView={false}/>
                <br/>
                <SkillsSection set={this.getSkills} isView={false}/>
                <br/>
                <EducationSection set={this.getEducationInfo} isView={false}/>

            </div>
        </React.Fragment>);
    }
}

NewResumeForm.contextType = DataContext;
export default NewResumeForm;
