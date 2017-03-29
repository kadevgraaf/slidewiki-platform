import React, {Component} from 'react';
import AnnotationStore from '../../../stores/AnnotationStore';
import { connectToStores } from 'fluxible-addons-react';
import EntityDropdown from './EntityDropdown';
import ClassPropertyDropdown from './ClassPropertyDropdown';

class SemanticField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: null,
            prop: null
        }
    }
    onChangeProp(uri) {
        this.setState({prop: uri});
    }
    onChangeEntity(uri) {
        this.setState({entity: uri});
        if (this.state.prop) {
            let propDropdown = this.refs.classDropdown.refs.wrappedElement._propSelect;
            $(propDropdown).dropdown('clear');
            $(propDropdown).addClass('loading');
        }
    }
    render() {
        return (
            <div style={{marginTop: '1em'}}>
                <h3 className="ui header">
                    Search by annotation
                </h3>
                <form className="ui form success">
                    <div className="four fields">
                        <EntityDropdown entity={this.state.entity} prop={this.state.prop} onChangeEntity={this.onChangeEntity.bind(this)} />
                        <ClassPropertyDropdown ref="classDropdown" entity={this.state.entity} prop={this.state.prop} onChangeProp={this.onChangeProp.bind(this)} />
                        <div className="field">
                            <label htmlFor="filter">Filter</label>
                            <select name="filter" id="filter">
                                <option value=' '>Filter</option>
                                <option value='less'>Less (&lt;)</option>
                                <option value='greater'>Greater (&gt;)</option>
                                <option value='lesseq'>Less or equal (&lt;=)</option>
                                <option value='greatereq'>Greater or equal (&gt;=)</option>
                                <option value='regex'>Regex</option>
                                <option value='eqyals'>Equals (=)</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="value">Value</label>
                            <input type="text" name="value" ref="value"
                                   placeholder="Value"
                                   aria-required="true" disabled/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

SemanticField.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

SemanticField = connectToStores(SemanticField, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    }
});

export default SemanticField;
