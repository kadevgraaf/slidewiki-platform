import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class DateInput extends React.Component {
    componentDidMount() {
        // TODO: init calendar
    }
    render() {
        return (
            <div class="ui calendar" id="example2">
                <div class="ui input left icon">
                    <i class="calendar icon" />
                    <input type="text" placeholder="Date" />
                </div>
            </div>)
    }
}
