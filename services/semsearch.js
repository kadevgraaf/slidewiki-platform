import rp from 'request-promise';
import { Microservices } from '../configs/microservices';

/**
 * Created by korovin on 3/29/2017.
 */
export default {
    name: 'semsearch',
    read: (req, resource, params, config, callback) => {
        switch (resource) {
            case 'semsearch.keyword':
                searchByKeywords(params, callback);
                break;
            case 'semsearch.semantic':
                searchBySemantic(params, callback);
                break;
            case 'semsearch.hybrid':
                searchHybrid(params, callback);
                break;
            default:
                callback(null, {success: false, results: {}});
                return;
        }
    }
};

function searchByKeywords(params, callback) {
    if (!params.keywords) {
        callback(null, {success: false, results: {}});
        return;
    }

    const { search } = Microservices;
    const uri = search.uri + '/search?' + getEncodedParams(params);
    rp.get({
        uri: uri
    }).then(results => {
        // TODO: parse results
        callback(null, {
            success: true,
            results: JSON.parse(JSON.stringify(results))
        });
    });
}

function encodeParam(encodedParams, key, value){
    if(value.trim() === '')
        return '';

    return ((encodedParams) ? '&' : '')
        + encodeURIComponent(key) + '=' + encodeURIComponent(value);
}

// TODO: awful copy-pasted code from Search Panel. will fix it one day
function getEncodedParams(params){
    let queryparams = {
        keywords: (params && params.keywords)
            ? params.keywords       // if keywords are set from redirection
            : (this.refs.keywords.getSelected().trim() || '*:*')
    };

    // encode params
    let encodedParams = '';
    for(let key in queryparams){
        if(queryparams[key] instanceof Array){
            for(let el in queryparams[key]){
                encodedParams += encodeParam(encodedParams, key, queryparams[key][el]);
            }
        }
        else{
            encodedParams += encodeParam(encodedParams, key, queryparams[key]);
        }
    }

    return encodedParams;
}

function searchBySemantic(params, callback) {

}

function searchHybrid(params, callback) {

}
