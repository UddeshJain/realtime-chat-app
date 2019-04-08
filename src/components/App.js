import React from 'react';
import { Grid, Responsive, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

// prettier-ignore
const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => (
  <div>
    <Responsive minWidth={992}>
    <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
      <ColorPanel
        key={currentUser && currentUser.name}
        currentUser={currentUser}
      />
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
        primaryColor={primaryColor}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel
          key={currentChannel && currentChannel.name}
          userPosts={userPosts}
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>
      </Grid>
    </Responsive>
    <Responsive maxWidth={990}>
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Header as="h1" icon color="violet" textAlign="center">
              <Icon name='broken chain' />
            </Header>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Header as="h1" icon color="violet" textAlign="center">Sorry this app doesn't support small screen devices. We are still working on it.</Header>
          </Grid.Column>
        </Grid>

        <Divider vertical>opps</Divider>
      </Segment>
    </Responsive>
    </div>
);

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
	isPrivateChannel: state.channel.isPrivateChannel,
	userPosts: state.channel.userPosts,
	primaryColor: state.colors.primaryColor,
	secondaryColor: state.colors.secondaryColor,
});

export default connect(mapStateToProps)(App);
