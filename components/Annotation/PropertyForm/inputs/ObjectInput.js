import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class ObjectInput extends React.Component {
    render() {
        return (
            <div className="ui labeled input">
                <div className="ui label">
                    http://
                </div>
                <input type="text" placeholder="uri" />
            </div>)
    }
}
