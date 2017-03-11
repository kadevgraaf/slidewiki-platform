import getSelection from './utils/getSelection';

/**
 * Created by korovin on 3/11/2017.
 */
export default function addTempSelection(context, payload, done) {
    let ranges = getSelection();
    console.log(ranges);

    context.dispatch('UPDATE_RANGE_SELECTION', ranges);
    done();
}
