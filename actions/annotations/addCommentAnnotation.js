import rangy from 'rangy/lib/rangy-core';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-serializer';
import Annotation from './classes/Annotation';

/**
 * Created by korovin on 3/11/2017.
 */
export default function addCommentAnnotation(context, payload, done) {
    let { comment } = payload;
    let { type } = payload;
    context.dispatch('RESTORE_SELECTION');

    let anno = changeWithinTag(type);
    console.log(anno);
    context.dispatch('REMOVE_SELECTION');
    context.dispatch('SAVE_ANNOTATION', anno);
    done();
}

function changeWithinTag(type) {
    let savedSel = rangy.getSelection();
    let annotation = new Annotation(type);
    let applier = rangy.createClassApplier(annotation.class, {
        elementProperties: {
            className: annotation.className
        },
        elementAttributes: {
            typeof: annotation.typeof,
            anno_id: annotation.id
        }
    });
    let highlighter = rangy.createHighlighter();
    highlighter.addClassApplier(applier);
    highlighter.highlightSelection(annotation.class);

    return {
        selection: rangy.serializeSelection(savedSel, true, document.getElementById('inlineContent')),
        type: annotation.type,
        class: annotation.class,
        className: annotation.className,
        id: annotation.id
    };
}
