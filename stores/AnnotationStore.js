import BaseStore from 'fluxible/addons/BaseStore';
import rangy from 'rangy/lib/rangy-core';
import 'rangy/lib/rangy-selectionsaverestore';

/**
 * Created by korovin on 3/11/2017.
 */
class AnnotationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.savedSel = null;
        this.savedSelActiveElement = null;
        this.ranges = [];
        this.annotations = [];
        this.suggestions = [];
    }
    loadAnnotations() {
        $('.r_entity').hover()
    }
    saveSelection() {
        if (this.savedSel) {
            rangy.removeMarkers(this.savedSel);
        }
        this.savedSel = rangy.saveSelection();
        this.savedSelActiveElement = document.activeElement;

        this.emitChange();
    }
    restoreSelection() {
        if (this.savedSel) {
            rangy.restoreSelection(this.savedSel, true);
            window.setTimeout(function() {
                if (this.savedSelActiveElement && typeof this.savedSelActiveElement.focus != 'undefined') {
                    this.savedSelActiveElement.focus();
                }
            }, 1);
        }
        this.emitChange();
    }
    removeSelection() {
        if (this.savedSel) {
            rangy.removeMarkers(this.savedSel);
            this.savedSel = null;
        }
        this.emitChange();
    }
    handleRanges(ranges) {
        this.ranges = ranges;
        this.emitChange();
    }
    saveAnnotation(anno) {
        this.annotations.push(anno);
        this.addOnHover(anno);
        this.emitChange();
    }
    addOnHover(anno) {
        let annotations = $('#inlineContent').find('span[anno_id="' + anno.id + '"]');
        annotations.mouseover(e => {
            e.stopPropagation();
            annotations.addClass('r_highlight');
        }).mouseout(_ => {
            annotations.removeClass('r_highlight');
        }).qtip({
            content: {
                title: 'Semantic Annotation',
                text: 'Type: ' + anno.type
            },
            position: {
                target: 'mouse', // Use the mouse position as the position origin
                adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
        }});
    }
    getSuggestions(payload) {
        console.log('init resources');

        if (!payload || !payload.results || (Object.keys(payload.results).length === 0)) {
            alert('Could not suggest anything');
            return;
        }

        let resources = JSON.parse(payload.results)['Resources'];
        console.log(resources);
        let suggestions = {};
        for (let resource of resources) {
            console.log(resource);
            let suggestion = {};
            suggestion.uri = resource['@URI'];
            suggestion.id = suggestion.uri.substring(28);
            suggestion.tag = suggestion.id.replace(/_/g, " ");
            suggestion.surface = resource['@surfaceForm'];

            if (resource['@types']) {
                suggestion.types = resource['@types'].split(',');
            }
            suggestions[suggestion.id] = suggestion;
        }
        this.suggestions = Object.keys(suggestions).map(key => { return suggestions[key]; });

        this.emitChange();
    }
    getWikipediaLinks(links) {
        console.log(links);
    }
    getState() {
        return {
            ranges: this.ranges,
            savedSel: this.savedSel,
            savedSelActiveElement: this.savedSelActiveElement,
            annotations: this.annotations,
            suggestions: this.suggestions
        }
    }
    dehydrate() {
        return {
            ranges: this.ranges,
            savedSel: this.savedSel,
            savedSelActiveElement: this.savedSelActiveElement,
            annotations: this.annotations,
            suggestions: this.suggestions
        };
    }
    rehydrate(state) {
        this.ranges = state.ranges;
        this.savedSel = state.savedSel;
        this.savedSelActiveElement = state.savedSelActiveElement;
        this.annotations = state.annotations;
        this.suggestions = state.suggestions;
    }
}

AnnotationStore.storeName = 'AnnotationStore';
AnnotationStore.handlers = {
    'SAVE_SELECTION': 'saveSelection',
    'RESTORE_SELECTION': 'restoreSelection',
    'REMOVE_SELECTION': 'removeSelection',
    'UPDATE_RANGE_SELECTION': 'handleRanges',
    'REMOVE_RANGE_SELECTION': 'handleRanges',
    'SAVE_ANNOTATION': 'saveAnnotation',
    'REMOVE_ANNOTATION': 'removeAnnotation',
    'GET_SUGGESTIONS': 'getSuggestions',
    'GET_WIKIPEDIA_LINKS': 'getWikipediaLinks'
};

export default AnnotationStore;
