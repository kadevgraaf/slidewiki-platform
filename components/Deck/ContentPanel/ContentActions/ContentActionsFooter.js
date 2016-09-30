import React from 'react';
import {NavLink} from 'fluxible-router';
import ContentUtil from '../util/ContentUtil';
import {connectToStores} from 'fluxible-addons-react';
import SlideControl from '../SlideModes/SlideControl';
import expandContentPanel from '../../../../actions/deckpagelayout/expandContentPanel';
import restoreDeckPageLayout from '../../../../actions/deckpagelayout/restoreDeckPageLayout';


class ContentActionsFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state={expanded: 0};
    }
    handleExpandClick(){
        this.context.executeAction(expandContentPanel, {});
        this.state.expanded = 1;
        return false;
    }
    handleCollapseClick(){
        this.context.executeAction(restoreDeckPageLayout, {});
        this.state.expanded = 0;
        return false;
    }
    getPresentationHref(){
        let presLocation = '/Presentation/' + this.props.ContentStore.selector.id + '/';
        if(this.props.ContentStore.selector.stype === 'slide'){
            // presLocation += this.props.ContentStore.selector.sid + '/';
            presLocation += '#/slide-' + this.props.ContentStore.selector.sid
        }
        return presLocation;
    }
    handlePresentationClick(e){
        if(process.env.BROWSER){
            e.preventDefault();
            window.open(this.getPresentationHref());
        }
    }
    getPrintHref(){
        return '/PresentationPrint/' + this.props.ContentStore.selector.id + '/?print-pdf';
    }

    handlePrintClick(e){
        if(process.env.BROWSER){
            e.preventDefault();
            window.open(this.getPrintHref());
        }

    }
    render() {
        return (
            <div className="ui">
                <div className="ui teal top attached progress slide-progress-bar" ref="slide-progressbar">
                    {this.props.ContentStore.selector.stype === 'slide' ? <div className="bar"></div> : ''}
                </div>
                <div className="ui bottom attached tabular menu" style={{'background': '#DCDDDE'}}>
                    {this.props.ContentStore.selector.stype === 'slide' ? <SlideControl mode={this.props.ContentStore.mode}/> : ''}
                    <div className="right menu">
                        <div className="ui icon buttons large right floated">

                            <NavLink onClick={this.handlePresentationClick.bind(this)} href={this.getPresentationHref()} target="_blank">
                                <button className="ui button">
                                    <i className="circle play large icon"></i>
                                </button>
                            </NavLink>
                            <NavLink onClick={this.handlePrintClick.bind(this)} href={this.getPrintHref()} target="_blank">
                                <button className="ui button">
                                    <i className="print large icon"></i>
                                </button>
                            </NavLink>
                            <button className="ui disabled button">
                                <i className="download large icon"></i>
                            </button>
                            <button className="ui disabled button">
                                <i className="share alternate large icon"></i>
                            </button>
                            {this.state.expanded ? <button className="ui button" onClick={this.handleCollapseClick.bind(this)} title="Reset Layout"><i className="large icon compress"></i></button> : <button className="ui button" onClick={this.handleExpandClick.bind(this)} title="Expand Content"><i className="large icon expand"></i></button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ContentActionsFooter.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};
export default ContentActionsFooter;
