import React from 'react';
import firebase from '../../firebase';
// import { connect } from 'react-redux';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

class UserPanel extends React.Component {

    state = {
        user: this.props.currentUser
    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSighout}>Sign Out</span>
        }
    ];

    handleSighout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {console.log('Signed Out!')})
    }

    render() {

        const { user } = this.state;
        return (
            <Grid style={{ background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        <Header inverted floated='left' as='h2'>
                            <Icon name='code' />
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                        <Header style={{ padding: '0.25em' }} as='h4' inverted>
                            <Dropdown trigger={
                                <span>
                                    <Image src={user.photoUrl} spaced="right" avatar />
                                    {user.displayName}
                                </span>
                            } options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel;