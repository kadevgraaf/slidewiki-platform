import AnnotationStore from "../../stores/AnnotationStore";

const ENTITY_CLASS = 'r_entity';
const ENTITY_CLASS_PREFIX = 'r_';
const SCHEMA_TYPEOF_PREFIX = 'typeof="schema:';

/**
 * Created by korovin on 3/11/2017.
 */
export default function addCommentAnnotation(context, payload, done) {
    let { comment } = payload;
    let { type } = payload;
    let { ranges } = context.getStore(AnnotationStore).getState();
    if (ranges.length > 1) {
        changeMultipleTags(ranges, type);
    } else if(ranges.length === 1) {
        changeWithinTag(ranges[0], type);
    }
    //context.dispatch('NEW_COMMENT_ANNOTATION', payload);
    done();
}

function changeWithinTag(range, type) {
    let sel = window.getSelection();

    let clonedRange = range.cloneRange();
    let spanWrapper = $('<div/>').addClass(createWrapperClasses(type))[0];

    if (clonedRange.startContainer === clonedRange.endContainer) {
        clonedRange.surroundContents(spanWrapper);
    } else {
        spanWrapper.appendChild(clonedRange.extractContents());
        clonedRange.insertNode(spanWrapper);
    }

    sel.removeAllRanges();
    sel.addRange(range);
}

function createWrapperClasses(type) {
    return  ENTITY_CLASS +
            ' ' +
            ENTITY_CLASS_PREFIX +
            type.toLowerCase() +
            ' ' +
            SCHEMA_TYPEOF_PREFIX +
            type +
            '"';
}

function changeMultipleTags(range, type) {

}
