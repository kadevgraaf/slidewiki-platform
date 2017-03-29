import React, {Component} from 'react';
import SemanticField from './SemanticField/SemanticField';
import KeywordField from './KeywordField';
import RadioboxSearchType from './RadioboxSearchType';

const KEYWORD_FIELD_TYPE = 'keyword';
const SEMANTIC_FIELD_TYPE = 'semantic';
const HYBRID_FIELD_TYPE = 'hybrid';

export default class SemSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'type': HYBRID_FIELD_TYPE
        }
    }
    componentDidMount() {
        $(this._keywordCont).show();
        $(this._semCont).show();
    }
    onSearch(e) {
        e.preventDefault();
    }
    onTypeChange(newType) {
        const { type } = this.state;
        if (newType === type) {
            return;
        } else {
            this.setState({ type: newType });
        }

        if (newType === KEYWORD_FIELD_TYPE) {
            $(this._keywordCont).show();
            $(this._semCont).hide();
        } else if (newType === SEMANTIC_FIELD_TYPE) {
            $(this._keywordCont).hide();
            $(this._semCont).show();
        } else if (newType === HYBRID_FIELD_TYPE) {
            $(this._keywordCont).show();
            $(this._semCont).show();
        }
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui content">
                    <h2 className="ui header" style={{marginTop: '1em'}}>
                        Semantic Search
                    </h2>
                    <RadioboxSearchType type={this.state.type} onChange={this.onTypeChange.bind(this)} />
                    <div ref={ keywordCont => this._keywordCont = keywordCont }>
                        <KeywordField />
                    </div>
                    <div ref={ semCont => this._semCont = semCont }>
                        <SemanticField />
                    </div>
                    <button className="ui primary button" onClick={this.onSearch.bind(this)} style={{marginTop: '1em'}}>Search</button>
                </div>
            </div>
        )
    }
}
