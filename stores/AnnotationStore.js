import BaseStore from 'fluxible/addons/BaseStore';

/**
 * Created by korovin on 3/11/2017.
 */
class AnnotationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.ranges = [];
    }
    handleRanges(ranges) {
        this.ranges = ranges;
        this.emitChange();
    }
    getState() {
        return {
            ranges: this.ranges
        }
    }
    dehydrate() {
        return {
            ranges: this.ranges
        };
    }
    rehydrate(state) {
        this.ranges = state.ranges;
    }
}

AnnotationStore.storeName = 'AnnotationStore';
AnnotationStore.handlers = {
    'UPDATE_RANGE_SELECTION': 'handleRanges',
    'REMOVE_RANGE_SELECTION': 'handleRanges'
};

export default AnnotationStore;
