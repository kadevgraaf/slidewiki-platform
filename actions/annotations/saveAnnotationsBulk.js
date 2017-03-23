import Annotation from "./classes/Annotation";
import DeckPageStore from "../../stores/DeckPageStore";

/**
 * Created by korovin on 3/23/2017.
 */
export default function saveAnnotationsBulk(context, payload, done) {
    let annotationsHtml = $('#inlineContent').find('.r_entity');
    if (!annotationsHtml.length) {
        done();
        return;
    }

    const { selector: { id: deckId, sid: slideId } } = context.getStore(DeckPageStore).getState();
    
    let annotationsObj = annotationsHtml.map(html => {
        let anno = Annotation.deserializeRDFa(html);
        return {
            annotation: anno,
            html: anno.jqHTML[0].outerHTML,
            slide: slideId,
            deck: deckId
        };
    });

    context.service.create('annotations.savebulk', {
        annotations: annotationsObj
    }, {timeout: 20 * 1000}, (err, res) => {
        // TODO: check if result is succesfull
        done();
    });
}
