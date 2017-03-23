import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class YearInput extends React.Component {
    componentDidMount() {
        // TODO: init calendar
    }
    render() {
        return (
            <div class="ui calendar" id="example8">
                <div class="ui input left icon">
                    <i class="time icon" />
                    <input type="text" placeholder="Time" />
                </div>
            </div>)
    }
}
