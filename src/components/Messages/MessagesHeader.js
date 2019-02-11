import React from 'react';
import { Header, Input, Segment, Icon } from 'semantic-ui-react';


class MessagesHeader extends React.Component {
    render() {
        const { channelName, numUniqueUsers, handleSearchChange, searchLoading } = this.props;
        return (
            <Segment clearing>
                {/* channel title */}
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>
                        {channelName}
                        <Icon name={'star outline'} color='black' />
                    </span>
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>
                {/* channel Search Input */}
                <Header floated='right'>
                    <Input
                        size='mini'
                        icon='search'
                        name='searchTerm'
                        placeholder='Search Messages'
                        onChange={handleSearchChange}
                        loading={searchLoading}
                    />
                </Header>
            </Segment>
        );
    }
}

export default MessagesHeader;