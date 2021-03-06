import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ResumeTable from './ResumeTable';
import history from './../history';
import localForage from "localforage";
import ProfileSummarySection from './ProfileSummarySection';
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        flex: 1
    },
});

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editProfileIsOn: false,
            loggedIn: false,
            userId: null,
            userName: "",
            numOfResume: 0,
            title : "",
            location : "",
            firstName: "",
            lastName: ""
        }

        this.addNewResume = this.addNewResume.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    // async clearData(){
    //     await localForage.setItem('loggedIn', false);
    //     await localForage.setItem('userId', null);
    //     await localForage.setItem('username', null);
    //     await localForage.setItem('numOfResume', 0);
    //     await localForage.setItem('title', null);
    //     await localForage.setItem('location', null);
    //     await localForage.setItem('firstName', null);
    //     await localForage.setItem('lastName', null);
    // }

    async componentDidMount() {
        try {
            // await this.clearData();
            const loggedIn = await localForage.getItem('loggedIn');

            if (loggedIn) {
                const userId = await localForage.getItem('userId');
                const username = await localForage.getItem('username');
                const numOfResume = await localForage.getItem('numOfResume');
                const title = await localForage.getItem('title');
                const location = await localForage.getItem('location');
                const firstName = await localForage.getItem('firstName');
                const lastName = await localForage.getItem('lastName');
                this.setState({
                    loggedIn: true,
                    userId: userId,
                    userName: username,
                    numOfResume: numOfResume,
                    title: title,
                    location: location,
                    firstName: firstName,
                    lastName: lastName,
                })
            } else {
                history.push('/login')
            }
        } catch (err) {
            // This code runs if there were any errors.
        }
    }

    addNewResume = () => {
        // alert("I want to add a new resume!");
        console.log("Add new Resume clicked!");
        history.push('/newresume');
    }

    editProfile() {
        // alert("Edit Profile clicked");
        // console.log("Edit Profile clicked!");

    }

    render() {
        console.log(this.state);
        if (this.state.loggedIn === false
            || this.state.userId === null
            || this.state.userName === ""
            || this.state.userName === undefined
            || this.state.userName === null
            || this.state.title === ""
            || this.state.location === ""){
            return (
                <Grid style={{height: '500px'}} container direction='row' justify='center' alignItems='center'>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container spacing={3}>
                    <Grid item xs/>
                    <Grid item xs={10}>
                        <h1>Profile Summary</h1>
                        <ProfileSummarySection isEditable = {false}/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.addNewResume}>
                            Add new Resume
                        </Button>
                        <h1>Resume List</h1>
                        <ResumeTable/>
                    </Grid>
                    <Grid item xs/>
                </Grid>
            );
        }
    }
}

export default HomePage;
