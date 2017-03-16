import React from 'react';
import AnnotationStore from '../../stores/AnnotationStore';
import {connectToStores} from 'fluxible-addons-react';

const EDIT_BUTTON_MODE = 'edit';
const ADD_BUTTON_MODE = 'add';
const DEFAULT_OPTION = 'Person';

/**
 * Created by korovin on 3/16/2017.
 */
class EntityTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            type: DEFAULT_OPTION,
            mode: EDIT_BUTTON_MODE
        };
    }
    onAddAnnotation(e) {
        console.log('add annotation');
    }

    onEditAnnotation(e) {
        console.log('edit annotation');
    }
    handleChange(e){
        e.preventDefault();
        this.setState({type: e.target.value});
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
        console.log('Get schema options');
        let { types } = this.props.AnnotationStore;
        return (
            <select className="ui search dropdown" value={ this.state.type } onChange={ this.handleChange.bind(this)} >
                { types.map(option => {
                    return (<option value={ option } key={ option } >{ option }</option>)
                }) }
            </select>
        )
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
                                <input type="text" name="uri" value={this.state.uri} placeholder="Entity URI"/>
                            </div>
                            <div className="field">
                                <label htmlFor="">Choose type</label>
                                { this.getSchemaOptions() }
                            </div>
                            { this.getButton(this.state.mode) }
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
