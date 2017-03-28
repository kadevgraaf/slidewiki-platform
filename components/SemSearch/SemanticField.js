import React, {Component} from 'react';
import AnnotationStore from '../../stores/AnnotationStore';
import { connectToStores } from 'fluxible-addons-react';
import getDbpediaClasses from "../../actions/annotations/getDbpediaClasses";

class SemanticField extends Component {
    componentDidMount() {
        this.context.executeAction(getDbpediaClasses);
    }
    getEntities() {
        let { dbpediaClasses } = this.props.AnnotationStore;
        if (!dbpediaClasses.length) {
            return;
        }

        dbpediaClasses.map(dClass => {
            console.log(dClass);
        });

        return null;
    }
    render() {
        return (
            <div style={{marginTop: '1em'}}>
                <h3 className="ui header">
                    Search by annotation
                </h3>
                <form className="ui form success">
                    <div className="four fields">
                        <div className="field">
                            <label htmlFor="entity">Entity type</label>
                            <select name="entity" id="entity">
                                <option value=' '>Select Entity type</option>
                                { this.getEntities() }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="property">Property type</label>
                            <select name="property" id="property">
                                <option value=' '>Select Property</option>
                            </select>
                        </div>
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
