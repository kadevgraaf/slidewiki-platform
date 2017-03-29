/**
 * Created by korovin on 3/29/2017.
 */
export default function doSemSearch(context, payload, done) {
    const { type } = payload;
    context.service.read('semsearch.' + type, payload, {timeout: 20 * 1000}, (err, res) => {
        // TODO: parse here results
        context.dispatch('INIT_SEMSEARCH_RESULTS', res);
        done();
    });
}

function parse(res) {
    let response = JSON.parse(res.results)
    // TODO: iterate here and return array of search results
}
