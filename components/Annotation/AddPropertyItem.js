import { MenuItem } from 'react-contextmenu';
import Modal from 'react-modal';
import React from 'react';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        zIndex                : 15,
        width                 : '450px'
    }
};

/**
 * Created by korovin on 3/22/2017.
 */
export default class AddPropertyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    onClick(e) {
        e.preventDefault();
        console.log(this.props.chosen);
        if (this.props.chosen) {
            this.setState({modalIsOpen: true});
            return;
        }

        alert('Please click over annotated entity');
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal }
                    style={ customStyles }
                    contentLabel="Add Property">
                    <h1>Add property</h1>
                </Modal>
                <MenuItem onClick={this.onClick.bind(this)}>Add Property</MenuItem>
            </div>
        )
    }
}
