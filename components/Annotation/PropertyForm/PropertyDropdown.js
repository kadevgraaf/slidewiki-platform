import React from 'react';
import getPropertiesDbpedia from "../../../actions/annotations/getPropertiesDbpedia";
import AnnotationStore from "../../../stores/AnnotationStore";
import { connectToStores } from 'fluxible-addons-react';

/**
 * Created by korovin on 3/22/2017.
 */
class PropertyDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        }
    }
    componentDidMount() {
        $(this._select).dropdown();

        this.context.executeAction(getPropertiesDbpedia, {
            type: this.state.type
        });
    }
    initItemList() {
        const { curProps } = this.props.AnnotationStore;

        if (!curProps.length) {
            return;
        }

        $(this._select).removeClass('loading');

        return curProps.map(elem => {
            return (
                <div key={ elem.uri } className="item">
                    { elem.label }
                </div>
            )
        })
    }
    render() {
        return (
            <div ref={select => this._select = select } className="ui floating dropdown labeled search icon button loading">
                <i className="filter icon" />
                <span className="text">Select Property</span>
                <div className="menu">
                    { this.initItemList() }
                </div>
            </div>
        )
    }
}

PropertyDropdown.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

PropertyDropdown = connectToStores(PropertyDropdown, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    };
});

export default PropertyDropdown;
