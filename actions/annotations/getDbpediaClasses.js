/**
 * Created by korovin on 3/28/2017.
 */
export default function getDbpediaClasses(context, payload, done) {
    context.service.read('annotations.allclasses', {}, {timeout: 20 * 1000}, (err, res) => {
        let bindings = res.results.results.bindings;
        if (bindings.length) {
            context.dispatch('GET_DBPEDIA_CLASSES', parse(bindings));
        }

        done();
    });
}

function parse(bindings) {
    console.log(bindings);
}
