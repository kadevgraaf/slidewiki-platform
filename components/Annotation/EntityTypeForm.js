import React from 'react';
import AnnotationStore from '../../stores/AnnotationStore';
import {connectToStores} from 'fluxible-addons-react';
import getUriSuggestions from "../../actions/annotations/getUriSuggestions";
import removeUriSuggestions from "../../actions/annotations/removeUriSuggestions";
import addAnnotation from "../../actions/annotations/addAnnotation";

const EDIT_BUTTON_MODE = 'edit';
const ADD_BUTTON_MODE = 'add';

/**
 * Created by korovin on 3/16/2017.
 */
class EntityTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            type: props.type,
            mode: ADD_BUTTON_MODE
        };
    }
    onAddAnnotation(e) {
        e.preventDefault();

        let { selectedText } = this.props.AnnotationStore;
        if (!selectedText || !this.state.type) {
            return;
        }

        this.context.executeAction(addAnnotation, {
            name: selectedText,
            type: this.state.type,
            uri: $(this.refs.uriDropdown).val()
        });
        this.props.onClose();
    }
    onAddSuggestions(e) {
        e.preventDefault();
        let { selectedText } = this.props.AnnotationStore;
        if (!selectedText || !this.state.type) {
            return;
        }
        this.context.executeAction(removeUriSuggestions);

        this.context.executeAction(getUriSuggestions, {
            keyword: selectedText,
            type: this.state.type
        });
    }
    onEditAnnotation(e) {
        console.log('edit annotation');
    }
    handleChangeType(e) {
        e.preventDefault();
        this.setState({type: e.target.value});
    }
    handleChangeUri(e) {
        e.preventDefault(e);
        this.changeUri(e.target.value);
    }
    changeUri(value) {
        this.setState({uri: value});
    }
    getButton(mode) {
        if (mode === EDIT_BUTTON_MODE) {
            return <button className="ui primary button" onClick={this.onAddAnnotation.bind(this)}>
                Add
            </button>
        } else if (mode === ADD_BUTTON_MODE) {
            return <button className="ui primary button" onClick={this.onAddAnnotation.bind(this)}>
                Update
            </button>
        } else {
            return <button className="ui primary button">Unknown edit mode</button>
        }
    }
    getSchemaOptions() {
        let { types } = this.props.AnnotationStore;
        return (
            <select className="ui search dropdown" value={ this.state.type } onChange={ this.handleChangeType.bind(this)} >
                { types.map(option => {
                    return (<option value={ option } key={ option } >{ option }</option>)
                }) }
            </select>
        )
    }
    getUriSuggestionDropdown() {
        let { uriSuggestions } = this.props.AnnotationStore;
        if (uriSuggestions && uriSuggestions.length) {
            let html = uriSuggestions.map(suggestion => {
                return (<option value={ suggestion } key={ suggestion } title={ suggestion }>{ suggestion }</option>)
            });
            
            return html;
        }
    }
    onCancel(e) {
        e.preventDefault();
        this.context.executeAction(removeUriSuggestions);
        this.props.onClose();
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <form className="ui form">
                            <h4 className="ui dividing header">{this.state.type}</h4>
                            <div className="field">
                                    <label htmlFor="">Entity URI</label>
                                <div className="ui grid">
                                    <div className="ten wide column">
                                        <select ref="uriDropdown" className="ui search dropdown" value={ this.state.uri } onChange={ this.handleChangeUri.bind(this) }>
                                            { this.getUriSuggestionDropdown() }
                                        </select>
                                    </div>
                                    <div className="four wide column">
                                        <button className="ui primary button" onClick={this.onAddSuggestions.bind(this)}>Suggest URI</button>
                                    </div>
                                </div>

                            </div>
                            <div className="field">
                                <label htmlFor="">Choose type</label>
                                { this.getSchemaOptions() }
                            </div>
                            { this.getButton(this.state.mode) }
                            <button className="ui red button" onClick={this.onCancel.bind(this)}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

EntityTypeForm.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

EntityTypeForm = connectToStores(EntityTypeForm, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    };
});

export default EntityTypeForm;
