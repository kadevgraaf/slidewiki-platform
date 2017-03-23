import React from 'react';
import { MenuItem } from 'react-contextmenu';
import Modal from 'react-modal';
import EntityPropertyForm from './PropertyForm/EntityPropertyForm';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        zIndex                : 15,
        width                 : '450px',
        height                : '380px'
    }
};

/**
 * Created by korovin on 3/22/2017.
 */
export default class AddPropertyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            type: ''
        };
    }

    onClick(e) {
        e.preventDefault();
        if (this.props.chosen) {
            this.setState({
                modalIsOpen: true,
                type: this.props.chosen.attr('typeof')
            });
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
                    <EntityPropertyForm  type={ this.state.type } />
                </Modal>
                <MenuItem onClick={this.onClick.bind(this)}>Add Property</MenuItem>
            </div>
        )
    }
}
