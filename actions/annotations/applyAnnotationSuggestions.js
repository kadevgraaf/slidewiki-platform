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

    let nodeContentHtml = $('#inlineContent').find('> div')[0];
    let searchScopeRange = rangy.createRange();
    let range = rangy.createRange();
    let searchResultApplier = rangy.createClassApplier("r_highlight");
    let highlighter = rangy.createHighlighter();

    searchScopeRange.selectNodeContents(nodeContentHtml);
    range.selectNodeContents(nodeContentHtml);
    highlighter.addClassApplier(searchResultApplier);
    searchResultApplier.undoToRange(range);

    let searchOptions = {
        caseSensitive: false,
        wholeWordsOnly: false,
        withinRange: searchScopeRange
    };
    
    for (let suggestion of suggestions) {
        const surface = suggestion.surface;
        if (surface === '') continue;
        if (range.findText(surface, searchOptions)) {
            searchResultApplier.applyToRange(range);
            range.collapse(false);
        }
    }

    done();
}
