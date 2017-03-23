import React from 'react';
import PropertyDropdown from './PropertyDropdown';
import InputSet from './InputSet';

/**
 * Created by korovin on 3/22/2017.
 */
export default class EntityPropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        }
    }
    onAddProperty(e) {
        e.preventDefault();
        // TODO: get all properties from store
    }
    handleValueChange(e) {
        e.preventDefault();
        console.log(e.target.value);
    }
    handleValueCalendarChange(date, text, mode) {
        console.log(date);
    }
    render() {
        return (
            <div className="ui container" style={ { height: '100%' } }>
                <div className="ui grid" style={ { height: '100%' } }>
                    <div className="sixteen wide column stretched">
                        <div className="ui form">
                            <h4 className="ui dividing header">{ this.props.type }</h4>
                            <div className="field">
                                <label htmlFor="">Choose property: </label>
                                <PropertyDropdown type={ this.props.type } />
                            </div>
                            <InputSet onChange={ this.handleValueChange.bind(this) }
                                      onCalendarChange={ this.handleValueCalendarChange.bind(this) }/>
                        </div>
                        <div className="field" style={{ marginTop: '130px' }}>
                            <button className="ui primary button" onClick={this.onAddProperty.bind(this)}>Add</button>
                            <button className="ui red button" onClick={this.props.closeModel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
