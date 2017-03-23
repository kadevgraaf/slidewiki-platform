import React from 'react';
import PropertyDropdown from './PropertyDropdown';

/**
 * Created by korovin on 3/22/2017.
 */
export default class EntityPropertyForm extends React.Component {
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
