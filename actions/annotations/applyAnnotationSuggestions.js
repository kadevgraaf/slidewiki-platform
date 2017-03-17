import getWikipediaLinks from "./getWikipediaLinks";
import TagWrapper from "./utils/TagWrapper";

/**
 * Created by korovin on 3/13/2017.
 */
export default function applyAnnotationSuggestions(context, payload, done) {
    let { suggestions } = payload;

    if (!suggestions.length) return;

    let annotations = TagWrapper.wrapSuggestions(suggestions);

    context.dispatch('SAVE_ANNOTATIONS', annotations);

    context.executeAction(getWikipediaLinks, {
        suggestions: suggestions
    });

    done();
}
