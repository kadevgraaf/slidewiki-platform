import React from 'react';
import AnnotationStore from "../../../stores/AnnotationStore";

/**
 * Created by korovin on 3/23/2017.
 */
class InputSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ''
        }
    }
    componentWillUpdate() {
        console.log('update');
    }
    handleValueChange(e) {
        e.preventDefault();
        console.log(e.target.value);
    }
    initInput() {
        const { curPropType } = this.props.AnnotationStore;
        return <div class="ui labeled input">
            <div class="ui label">
                http://
            </div>
            <input type="text" placeholder="lol" />
        </div>
    }
    render() {
        <div className="field">
            <label htmlFor="">Add value: </label>
            <input type="text" name="value" ref="propValue" onChange={ this.handleValueChange.bind(this) }
                   placeholder="value"
                   aria-required="true" disabled/>
        </div>
    }
}

InputSet.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

InputSet = connectToStores(InputSet, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    };
});

export default InputSet;

