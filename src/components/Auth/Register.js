import React from 'react';
import { Grid, Button, Form, Segment, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordconfirmation: '',

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    isFormVailid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' }
            this.setState({ errors: errors.concat(error) })
            return false
        } else if (!this.isPasswordVailid(this.state)) {
            error = { message: 'Password is invailid' }
            this.setState({ errors: errors.concat(error) })
        } else {
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordconfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordconfirmation.length
    }

    isPasswordVailid = ({password, passwordconfirmation}) => {
        if (password < 6 || passwordconfirmation < 6) {
            return false;
        } else if (password !== passwordconfirmation) {
            return false
        } else {
            return true;
        }
    }

    handleSubmit = event => {
        if (this.isFormVailid()) {
            event.preventDefault();
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }


    render() {
        
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" color="blue" textAlign="center">
                        <Icon fluid='true' name='houzz' />
                        Register for Chat
                    </Header>
                    <Form>
                        <Segment>
                            <Form.Input name="username" icon="user" iconPosition="left" placeholder="Username" type="text" onChange={this.handleChange}/>
                            <Form.Input name="email" icon="mail" iconPosition="left" placeholder="Email Address" type="email" onChange={this.handleChange}/>
                            <Form.Input name="password" icon="lock" iconPosition="left" placeholder="Password" type="password" onChange={this.handleChange}/>
                            <Form.Input name="passwordconfirmation" icon="lock" iconPosition="left" placeholder="Password Confirmation" type="password" onChange={this.handleChange}/>
                            <Button color="blue" fluid size="large" onClick={this.handleSubmit}>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already Registered ?<Link to='/login'> Login</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;