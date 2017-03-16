import rangy from 'rangy/lib/rangy-core';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-serializer';
import Annotation from './classes/Annotation';

const PROPERTY_CLASS = 'r_prop';
const BASE_PROPERTY_CLASS = 'r_name';
const BASE_PROPERTY_TYPE = 'schema:name';

/**
 * Created by korovin on 3/11/2017.
 */
export default function addAnnotation(context, payload, done) {
    let { name, type, uri } = payload;
    context.dispatch('RESTORE_SELECTION');

    let anno = changeWithinTag(name, type, uri);
    console.log(anno);
    context.dispatch('REMOVE_SELECTION');
    context.dispatch('SAVE_ANNOTATION', anno);
    done();
}

function changeWithinTag(name, type, uri) {
    let savedSel = rangy.getSelection();
    let annotation = new Annotation(uri, type);
    let applier = rangy.createClassApplier(annotation.class, {
        elementProperties: {
            className: annotation.className
        },
        elementAttributes: {
            typeof: annotation.typeof,
            'data-id': annotation.id,
            resource: uri
        }
    });

    let highlighter = rangy.createHighlighter();
    highlighter.addClassApplier(applier);
    highlighter.highlightSelection(annotation.class);

    $('#inlineContent').find(`[data-id="${annotation.id}"]`).each(function(index) {
        let text = $(this).text();
        let htmlWrapper = annotation.toHtml(text);
        $(this).empty();
        $(this).wrapInner(htmlWrapper);
    });

    return {
        selection: rangy.serializeSelection(savedSel, true, document.getElementById('inlineContent')),
        type: annotation.type,
        class: annotation.class,
        className: annotation.className,
        id: annotation.id
    };
}
