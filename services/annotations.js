import rp from 'request-promise';

/**
 * Created by korovin on 3/12/2017.
 */
export default {
    name: 'annotations',
    // At least one of the CRUD methods is Required
    read: (req, resource, params, config, callback) => {

        if (resource === 'annotations.suggestions') {
            processSuggestions(params, callback);
        } else if (resource === 'annotations.wikipedia') {
            getWikipediaLinks(params, callback);
        }
    }
};

function processSuggestions(params, callback) {
    if (!params.text) {
        callback(null, {success: false, results: {}});
    }

    let url = 'http://spotlight.sztaki.hu:2222/rest/annotate?text=';
    url = url + encodeURI(params.text) + '&confidence=0.4&support=20';

    rp.post({
        uri: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(JSON.stringify(res || null ))
        });
    }).catch((err) => {
        callback(null, {success: false, results: {}});
    });
}

function getWikipediaLinks(params, callback) {
    if (!params.links) {
        callback(null, {success: false, results: {}});
    }


}
