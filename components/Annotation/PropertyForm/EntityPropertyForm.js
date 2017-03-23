import React from 'react';
import PropertyDropdown from './PropertyDropdown';

/**
 * Created by korovin on 3/22/2017.
 */
export default class EntityPropertyForm extends React.Component {
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
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <div className="ui form">
                            <h4 className="ui dividing header">{ this.props.type }</h4>
                            <div className="field">
                                <label htmlFor="">Choose property: </label>
                                <PropertyDropdown type={ this.props.type } />
                            </div>
                            <div className="field">
                                <label htmlFor="">Add value: </label>
                                <input type="text" name="value" ref="propValue" onChange={ this.handleValueChange.bind(this) }
                                       placeholder="value"
                                       aria-required="true" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
