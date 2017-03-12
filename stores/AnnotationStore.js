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
        this.emitChange();
    }
    getState() {
        return {
            ranges: this.ranges,
            savedSel: this.savedSel,
            savedSelActiveElement: this.savedSelActiveElement,
            annotations: this.annotations
        }
    }
    dehydrate() {
        return {
            ranges: this.ranges,
            savedSel: this.savedSel,
            savedSelActiveElement: this.savedSelActiveElement,
            annotations: this.annotations
        };
    }
    rehydrate(state) {
        this.ranges = state.ranges;
        this.savedSel = state.savedSel;
        this.savedSelActiveElement = state.savedSelActiveElement;
        this.annotations = state.annotations;
    }
}

AnnotationStore.storeName = 'AnnotationStore';
AnnotationStore.handlers = {
    'SAVE_SELECTION': 'saveSelection',
    'RESTORE_SELECTION': 'restoreSelection',
    'REMOVE_SELECTION': 'removeSelection',
    'UPDATE_RANGE_SELECTION': 'handleRanges',
    'REMOVE_RANGE_SELECTION': 'handleRanges',
    'SAVE_ANNOTATION': 'saveAnnotation'
};

export default AnnotationStore;
