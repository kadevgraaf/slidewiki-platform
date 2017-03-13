import rangy from 'rangy/lib/rangy-core';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-textrange';

/**
 * Created by korovin on 3/13/2017.
 */
export default function applyAnnotationSuggestions(context, payload, done) {
    let { suggestions } = payload;

    if (!suggestions.length) return;

    let searchScopeRange = rangy.createRange();
    let range = rangy.createRange();
    let searchResultApplier = rangy.createClassApplier("r_highlight");
    let searchOptions = {
        caseSensitive: false,
        wholeWordsOnly: true
    };

    let nodeContentHtml = document.getElementById('inlineContent');

    range.selectNodeContents(nodeContentHtml);
    searchResultApplier.undoToRange(range);

    for (let suggestion of suggestions) {
        const surface = suggestion.surface;
        if (surface === '') return;
        console.log(surface);
        let i = 0;
        while (range.findText(surface, searchOptions) && i <= 1000) {
            searchResultApplier.applyToRange(range);
            range.collapse(false);
            i++;
        }
    }

    done();
}
