import {BaseStore} from 'fluxible/addons';

class TagsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.tags = [];
        this.isEditMode = false;
        this.showAllTags = false;
        this.selectedIndex = -1;
        this.contentOwner = 0;
        this.selector = {};
    }
    loadTags(payload) {
        this.tags = payload.tags;
        this.selector = payload.selector;
        this.selectedIndex = -1;
        this.contentOwner = payload.owner;
        this.emitChange();
    }
    loadTagsFail(err) {
        this.tagError = err? err: 'Cannot load tags';
        this.emitChange();
    }
    updateTags(payload) {
        this.tags = payload.tags;
        this.selectedIndex = -1;
        this.emitChange();
    }
    newTag(payload) {
        this.tags.push(payload.tag);
        this.emitChange();
    }
    removeTag(payload) {
        this.tags = this.tags.filter((item) => item !== payload.tag);
        this.emitChange();
    }
    cancelEditTag() {
        this.selectedIndex = -1;
        this.emitChange();
    }
    handleShowAllTags() {
        this.showAllTags = true;
        this.emitChange();
    }
    changeMode(payload) {
        this.isEditMode = payload.isEditMode;
        this.emitChange();
    }
    getState() {
        return {
            tags: this.tags,
            showAllTags: this.showAllTags,
            tag: this.tag,
            selectedIndex: this.selectedIndex,
            contentOwner: this.contentOwner,
            selector: this.selector,
            isEditMode: this.isEditMode
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.tags = state.tags;
        this.showAllTags = state.showAllTags;
        this.selectedIndex = state.selectedIndex;
        this.contentOwner = state.contentOwner;
        this.selector = state.selector;
        this.isEditMode = state.isEditMode;
    }
}

TagsStore.storeName = 'TagsStore';
TagsStore.handlers = {
    'LOAD_TAGS_SUCCESS': 'loadTags',
    'LOAD_TAGS_FAILURE': 'loadTagsFail',
    'NEW_TAG': 'newTag',
    'SHOW_ALL_TAGS': 'handleShowAllTags',
    'UPDATE_TAGS_SUCCESS': 'updateTags',
    'CANCEL_EDIT_TAGS': 'cancelEditTag',
    'CHANGE_EDIT_MODE': 'changeMode',
    'REMOVE_TAG': 'removeTag'
};

export default TagsStore;