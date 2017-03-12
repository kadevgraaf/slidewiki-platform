import React from 'react';
import Modal from 'react-modal';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import AddAnnotation from './AddAnnotation';
import {connectToStores} from 'fluxible-addons-react';
import AnnotationStore from '../../stores/AnnotationStore';
import addTempSelection from '../../actions/annotations/addTempSelection';
import removeTempSelection from '../../actions/annotations/removeTempSelection';
import getSuggestions from '../../actions/annotations/getSuggestions';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        zIndex                : 15
    }
};

/**
 * Created by korovin on 3/11/2017.
 */
class AnnotationContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleAnnotate(e, data) {
        e.preventDefault();
        this.openModal();
    }
    getSuggestions(e) {
        this.context.executeAction(getSuggestions, {
            text: document.getElementById('inlineContent').innerText
        });
    }
    addSuggestionAsAnnotation(e, data) {
        console.log('Add suggestion: ' + data);
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
            return;
        }

        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    initSuggestionItem(suggestions) {
        if (!suggestions || !suggestions.length) {
            return <MenuItem onClick={this.getSuggestions.bind(this)}>Get Suggestions</MenuItem>
        }

        let suggestionSubMenus = suggestions.map(suggestion => {
            return <MenuItem key={ suggestion.id }
                             data={suggestion}
                             onClick={this.addSuggestionAsAnnotation.bind(this)}>{ suggestion.tag }</MenuItem>
        });

        return <SubMenu title="DBpedia Suggestions">{ suggestionSubMenus }</SubMenu>
    }
    render() {
        let { suggestions } = this.props.AnnotationStore;

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <AddAnnotation />
                </Modal>
                <ContextMenu id="anno-context-menu"
                             onShow={this.updateSelection.bind(this)}>
                    <SubMenu title="Add As Entity">
                        <MenuItem data={{type: 'Person'}} onClick={this.handleAnnotate.bind(this)}>Add Person</MenuItem>
                    </SubMenu>
                    <MenuItem>Remove</MenuItem>
                    { this.initSuggestionItem(suggestions) }
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
