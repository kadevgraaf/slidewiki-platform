import React from 'react';
import Modal from 'react-modal';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { connectToStores } from 'fluxible-addons-react';
import AnnotationStore from '../../stores/AnnotationStore';
import addTempSelection from '../../actions/annotations/addTempSelection';
import removeTempSelection from '../../actions/annotations/removeTempSelection';
import getSuggestions from '../../actions/annotations/getSuggestions';
import removeUriSuggestions from "../../actions/annotations/removeUriSuggestions";
import EntityTypeForm from './EntityTypeForm';

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
 * Created by korovin on 3/11/2017.
 */
class AnnotationContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            type: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleAnnotate(e, data) {
        e.preventDefault();
        this.setState({type: data.type});
        this.context.executeAction(removeUriSuggestions);
        this.openModal();
    }
    getSuggestions(e) {
        let { types } = this.props.AnnotationStore;
        let typeList = types.map(type => 'Schema:' + type).join(',');

        this.context.executeAction(getSuggestions, {
            text: document.getElementById('inlineContent').innerText,
            types: typeList
        });
    }
    updateSelection() {
        this.context.executeAction(addTempSelection);
    }
    removeSelection() {
        this.context.executeAction(removeTempSelection);
    }
    openModal() {
        let {ranges} = this.props.AnnotationStore;
        if (!ranges || !ranges.length) {
            alert('Please select text');
            return;
        }

        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    getTypeItems(types) {
        return types.map(type => {
            return <MenuItem data={ {type: type} } key={ type } onClick={this.handleAnnotate.bind(this)}>Add { type }</MenuItem>
        });
    }
    render() {
        let { types } = this.props.AnnotationStore;

        return (
            <div>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal }
                    style={ customStyles }
                    contentLabel="Add Entity">
                    <EntityTypeForm type={ this.state.type } mode={ 'add' } onClose={ this.closeModal } />
                </Modal>
                <ContextMenu id="anno-context-menu"
                             onShow={ this.updateSelection.bind(this) }>
                    <SubMenu title="Add As Entity">
                        { this.getTypeItems(types) }
                    </SubMenu>
                    <MenuItem>Remove</MenuItem>
                    <MenuItem onClick={this.getSuggestions.bind(this)}>Get Suggestions</MenuItem>
                </ContextMenu>
            </div>
        );
    }
}

AnnotationContextMenu.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

AnnotationContextMenu = connectToStores(AnnotationContextMenu, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    };
});

export default AnnotationContextMenu;
