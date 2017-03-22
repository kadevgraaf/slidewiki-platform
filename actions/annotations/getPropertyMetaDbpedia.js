/**
 * Created by korovin on 3/22/2017.
 */
export default function getPropertyMetaDbpedia(context, payload, done) {
    context.service.read('annotations.dbpedia_propmeta', payload, {timeout: 20 * 1000}, (err, res) => {
        context.dispatch('GET_DBPEDIA_PROPERTY_META', res);
        done();
    });
}
