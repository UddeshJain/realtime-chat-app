import React from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';


class FileMpdal extends React.Component {

    state = {
        file: null,
        authorized: ['image/jpeg', 'image/pgn']
    }

    addFile = event => {
        const file = event.target.files[0];
        this.setState({file})
    }

    sendFile = () => {
        const { file } = this.state;
        const { uploadFile, closeModal } = this.props;

        if (file !== null) {
            if (this.isAuthorized(file.name)) {
                const metadata = { contentType: mime.lookup(file.name) };
                uploadFile(file, metadata);
                closeModal();
                this.clearFile();
            }
        }
    }

    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

    clearFile = () => this.setState({ file: null });

    render() {

        const { modal, closeModal } = this.props;

        return (
            <Modal open={modal} onClose={closeModal} size='tiny' dimmer='blurring' >
                <Modal.Header>Select an image file</Modal.Header>
                <Modal.Content>
                    <Input
                        fluid
                        label='File Types: jpg, pgn'
                        name='file'
                        type='file'
                        onChange={this.addFile}
                    />
                </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color='twitter'
                            onClick={this.sendFile}
                            size='tiny'
                        >
                            <Icon name='checkmark' /> Send
                        </Button>
                        <Button
                            color='red'
                            onClick={closeModal}
                            size='tiny'
                        >
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                
            </Modal>
        );
    }
}


export default FileMpdal;