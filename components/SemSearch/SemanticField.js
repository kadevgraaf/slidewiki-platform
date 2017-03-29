import React, {Component} from 'react';
import AnnotationStore from '../../stores/AnnotationStore';
import { connectToStores } from 'fluxible-addons-react';
import getDbpediaClasses from "../../actions/annotations/getDbpediaClasses";

class SemanticField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: ''
        }
    }
    componentDidMount() {
        $(this._select).dropdown({
            onChange: (value, text, $selectedItem) => this.onChange(value, text, $selectedItem)
            // , onAdd: (value, text, $choice) => this.onAdd(value, text, $choice)
        });

        this.context.executeAction(getDbpediaClasses);
    }
    onChange(value, text, $selectedItem) {
        const uri = $selectedItem.attr('value');
        // TODO: init properties according to entity
    }
    getEntities(dbpediaClasses) {
        if (!dbpediaClasses.length) {
            return;
        }
        $(this._select).removeClass('loading');

        return dbpediaClasses.map(dClass => {
            return <div value={dClass.uri} key={dClass.uri} className="item">
                {dClass.label}
            </div>;
        });;
    }
    render() {
        let { dbpediaClasses } = this.props.AnnotationStore;

        return (
            <div style={{marginTop: '1em'}}>
                <h3 className="ui header">
                    Search by annotation
                </h3>
                <form className="ui form success">
                    <div className="four fields">
                        <div className="field">
                            <label htmlFor="entity">Entity type</label>
                            <div ref={select => this._select = select } className="ui fluid search selection dropdown loading">
                                <i className="dropdown icon" />
                                <div className="text">Select Entity type</div>
                                <div className="menu">
                                    { this.getEntities(dbpediaClasses) }
                                </div>
                            </div>
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
