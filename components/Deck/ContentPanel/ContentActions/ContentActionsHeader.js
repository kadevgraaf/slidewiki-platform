import React from 'react';
import Modal from 'react-modal';
import {NavLink, navigateAction} from 'fluxible-router';
import classNames from 'classnames/bind';
import {connectToStores} from 'fluxible-addons-react';
import ContentUtil from '../util/ContentUtil';
import DeckTreeStore from '../../../../stores/DeckTreeStore';
import UserProfileStore from '../../../../stores/UserProfileStore';
import addTreeNodeAndNavigate from '../../../../actions/decktree/addTreeNodeAndNavigate';
import deleteTreeNodeAndNavigate from '../../../../actions/decktree/deleteTreeNodeAndNavigate';

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

class ContentActionsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidUpdate(){

    }
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.refs.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    handleAddNode(selector, nodeSpec) {
        //selector: Object {id: "56", stype: "deck", sid: 67, spath: "67:2"}
        //nodeSec: Object {type: "slide", id: 0}
        this.context.executeAction(addTreeNodeAndNavigate, {selector: selector, nodeSpec: nodeSpec});
    }
    handleAnnotate(selector) {
        console.log('annotate');
        this.openModal();
    }
    handleDeleteNode(selector) {
        this.context.executeAction(deleteTreeNodeAndNavigate, selector);
    }
    handleEditNode(selector) {
        const nodeURL = ContentUtil.makeNodeURL(selector, 'edit');
        //user is not logged in
        if (this.props.UserProfileStore.username === '') {
            $('.ui.login.modal').modal('toggle');
        }else{
            this.context.executeAction(navigateAction, {
                url: nodeURL
            });
        }
    }
    render() {
        const contentDetails = this.props.ContentStore;
        //config buttons based on the selected item
        const addSlideClass = classNames({
            'item ui small basic left attached button': true
        });
        const addDeckClass = classNames({
            'item ui small basic left attached button': true
        });
        const annotateClass = classNames({
            'item ui small basic left attached button': true
        });
        const duplicateItemClass = classNames({
            'item ui small basic left attached button': true,
            'disabled': contentDetails.selector.id === contentDetails.selector.sid || contentDetails.selector.stype==='deck'
        });
        const dueleteItemClass = classNames({
            'item ui small basic left attached button': true,
            'disabled': contentDetails.selector.id === contentDetails.selector.sid
        });
        let selectorImm = this.props.DeckTreeStore.selector;
        let selector = {id: selectorImm.get('id'), stype: selectorImm.get('stype'), sid: selectorImm.get('sid'), spath: selectorImm.get('spath')};
        return (
            <div className="ui top attached tabular menu" role="tablist">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref="subtitle">Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
                <NavLink className={'item link' + (contentDetails.mode === 'view' ? ' active' : '')} href={ContentUtil.makeNodeURL(selector, 'view')} role={'tab'}>
                    <i></i>View
                </NavLink>
                {this.props.UserProfileStore.username === '' ? '' :
                <NavLink className={'item link' + (contentDetails.mode === 'edit' ? ' active' : '')} href={ContentUtil.makeNodeURL(selector, 'edit')} role={'tab'} tabIndex={'0'}>
                    <i className="ui large blue edit icon "></i> Edit
                </NavLink>
                }
                {this.props.UserProfileStore.username === '' ? '' :
                    <div className="right menu">
                        <button className={addSlideClass} onClick={this.handleAddNode.bind(this, selector, {type: 'slide', id: 0})} type="button" aria-label="Add Slide" data-tooltip="Add Slide">
                            <i className="icons">
                              <i className="grey file large text icon"></i>
                              <i className="inverted corner plus icon"></i>
                            </i>

                        </button>
                        <button className={addDeckClass} onClick={this.handleAddNode.bind(this, selector, {type: 'deck', id: 0})}  type="button" aria-label="Add Deck" data-tooltip="Add Deck">
                            <i className="medium icons">
                              <i className="yellow large folder icon"></i>
                              <i className="inverted corner plus icon"></i>
                            </i>

                        </button>
                        <button className={duplicateItemClass} onClick={this.handleAddNode.bind(this, selector, {type: selector.stype, id: selector.sid})}  type="button" aria-label="Duplicate" data-tooltip="Duplicate">
                            <i className="grey large copy icon"></i>

                        </button>
                        <button className={dueleteItemClass} onClick={this.handleDeleteNode.bind(this, selector)} type="button" aria-label="Delete" data-tooltip="Delete">
                            <i className="red large trash icon"></i>
                        </button>

                        <button className={annotateClass} onClick={this.handleAnnotate.bind(this, selector)} type="button" aria-label="Annotate" data-tooltip="Annotate">
                            <i className="red large icon"></i>
                        </button>
                        {/*
                        <button className="item ui small basic right attached disabled button">
                            <a className="" title="Settings">
                                <i className="black large setting icon"></i>
                            </a>
                        </button>
                        */}
                    </div>
                }
            </div>
        );
    }
}
ContentActionsHeader.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};
//it should listen to decktree store in order to handle adding slides/decks
ContentActionsHeader = connectToStores(ContentActionsHeader, [DeckTreeStore, UserProfileStore], (context, props) => {
    return {
        DeckTreeStore: context.getStore(DeckTreeStore).getState(),
        UserProfileStore: context.getStore(UserProfileStore).getState()
    };
});
export default ContentActionsHeader;
