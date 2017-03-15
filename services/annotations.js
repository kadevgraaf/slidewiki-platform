import rp from 'request-promise';

const SPARQL_QUERY = `PREFIX dbo:  <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?subj ?link WHERE
{
    ?subj foaf:isPrimaryTopicOf ?link.
    FILTER(?subj IN (`;

const SPOTLIGHT_BASE_URL = 'http://spotlight.sztaki.hu:2222/rest/annotate?text=';
const DBPEDIA_VIRTUOSO_BASE_URL = 'http://dbpedia.org/sparql';
const DBPEDIA_RESOURCE_PREFIX = 'dbo:';

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

    let url = SPOTLIGHT_BASE_URL + encodeURI(params.text) + '&confidence=0.4&support=20';

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
    if (!params.suggestions || !params.suggestions.length) {
        callback(null, {success: false, results: {}});
    }

    let sparqlLinks = params.suggestions.map(sug => {
        return DBPEDIA_RESOURCE_PREFIX + sug.id;
    }).join(',');

    rp.post({
        uri: DBPEDIA_VIRTUOSO_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            query: SPARQL_QUERY + sparqlLinks + '))}',
            format: 'application/json'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(res)
        });
    }).catch((err) => {
        callback(null, {success: false, results: {}});
    });

}
