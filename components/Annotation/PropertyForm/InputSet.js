import React from 'react';
import AnnotationStore from "../../../stores/AnnotationStore";
import { connectToStores } from 'fluxible-addons-react';
import ObjectInput from './inputs/ObjectInput';
import YearInput from './inputs/YearInput';
import DateInput from './inputs/DateInput';
import StringInput from './inputs/StringInput';
import PropertyHelper from "../../../actions/annotations/utils/PropertyHelper";

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
        if (!curPropType) {
            return;
        }

        if (curPropType.type === PropertyHelper.OBJECT_TYPE_VAL) {
            return <ObjectInput range={ curPropType.range } />
        } else if (curPropType.type === PropertyHelper.DATATYPE_TYPE_VAL) {
            switch (curPropType.range) {
                case 'date':
                    return <DateInput />;
                    break;
                case 'gYear':
                    return <YearInput />;
                    break;
                default:
                    return <StringInput />;
            }
        } else {
            return <StringInput />;
        }
    }
    render() {
        return <div className="field">
            <label htmlFor="">Add value: </label>
            { this.initInput() }
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
