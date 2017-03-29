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
    const uri = search.uri + '/search?' + formQueryParams(params.keywords);
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

function formQueryParams(keywords) {
    
}

function searchBySemantic(params, callback) {

}

function searchHybrid(params, callback) {

}
