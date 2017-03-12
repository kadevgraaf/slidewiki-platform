/**
 * Created by korovin on 3/12/2017.
 */
export default function getSuggestions(context, payload, done) {
    context.service.read('annotations.suggestions', payload, {timeout: 20 * 1000}, (err, res) => {
        context.dispatch('GET_SUGGESTIONS', res);
        done();
    });
}
