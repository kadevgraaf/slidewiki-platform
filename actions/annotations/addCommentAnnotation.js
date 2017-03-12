import AnnotationStore from "../../stores/AnnotationStore";
import rangy from 'rangy/lib/rangy-core';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-classapplier';

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
    context.dispatch('RESTORE_SELECTION');
    changeWithinTag(ranges[0], type);
    context.dispatch('REMOVE_SELECTION');
    //context.dispatch('NEW_COMMENT_ANNOTATION', payload);
    done();
}

function changeWithinTag(range, type) {
    let applier = rangy.createClassApplier(ENTITY_CLASS, {
        elementProperties: {
            className: ENTITY_CLASS_PREFIX + type.toLowerCase()
        },
        elementAttributes: {
            typeof: SCHEMA_TYPEOF_PREFIX + type + '"'
        }
    });
    let highlighter = rangy.createHighlighter();
    highlighter.addClassApplier(applier);
    highlighter.highlightSelection(ENTITY_CLASS);
}
