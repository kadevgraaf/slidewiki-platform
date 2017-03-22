/**
 * Created by korovin on 3/22/2017.
 */
export default function getPropertiesDbpedia(context, payload, done) {
    context.service.read('annotations.dbpedia_property', payload, {timeout: 20 * 1000}, (err, res) => {
        context.dispatch('GET_DBPEDIA_PROPERTIES', res);
        done();
    });
}
