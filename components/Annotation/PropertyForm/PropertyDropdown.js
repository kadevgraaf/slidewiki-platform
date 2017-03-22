import React from 'react';

/**
 * Created by korovin on 3/22/2017.
 */
export default class PropertyDropdown extends React.Component {
    componentDidMount() {
        $(this._select).dropdown();
    }

    initItemList() {
        const tempList = ['Option 1', 'Option 2'];

        return tempList.map(elem => {
            return (
                <div key={ elem } className="item">
                    { elem }
                </div>
            )
        })
    }
    render() {
        return (
            <div ref={select => this._select = select } className="ui floating dropdown labeled search icon button">
                <i className="filter icon" />
                <span className="text">Select Property</span>
                <div className="menu">
                    { this.initItemList() }
                </div>
            </div>
        )
    }
}
