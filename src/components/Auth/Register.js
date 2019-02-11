import React from 'react';
import { Grid, Button, Form, Segment, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordconfirmation: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
    }
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

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

    isPasswordVailid = ({ password, passwordconfirmation }) => {
        if (password < 6 || passwordconfirmation < 6) {
            return false;
        } else if (password !== passwordconfirmation) {
            return false
        } else {
            return true;
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormVailid()) {
            this.setState({ errors: [], loading: true })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                console.log('User saved');

                            });
                        })
                        .catch(err => {
                            console.error(err);
                            this.setState({ errors: this.state.errors.concat(err), loading: false })
                        })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false });
                })
        }
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    render() {
        const { username, email, password, passwordconfirmation, errors, loading } = this.state;
        
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" color="blue" textAlign="center">
                        <Icon fluid='true' name='houzz' />
                        Register to DevChat
                    </Header>
                    <Form>
                        <Segment>
                            <Form.Input
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                type="text"
                                onChange={this.handleChange}
                                value={username} />
                            <Form.Input
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                type="email"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, 'email')}
                                value={email} />
                            <Form.Input
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, 'password')}
                                value={password} />
                            <Form.Input
                                name="passwordconfirmation"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                type="password"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, 'password')}
                                value={passwordconfirmation} />
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="blue" fluid
                                size="large"
                                onClick={this.handleSubmit}>Submit
                            </Button>
                        </Segment>
                    </Form>
                    {this.state.errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            { this.displayErrors(this.state.errors) }
                        </Message>
                    )}
                    <Message>Already Registered ?<Link to='/login'> Login</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;