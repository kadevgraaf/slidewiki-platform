import Annotation from './classes/Annotation';
import TagWrapper from './utils/TagWrapper';
import DeckPageStore from "../../stores/DeckPageStore";

/**
 * Created by korovin on 3/11/2017.
 */
export default function addAnnotation(context, payload, done) {
    let { type, uri, name } = payload;
    context.dispatch('RESTORE_SELECTION');
    let annotation = new Annotation(uri, type, name);
    let serialized = TagWrapper.wrapAnnotation(annotation);

    const { selector: { id: deckId, sid: slideId } } = context.getStore(DeckPageStore).getState();

    let body = {
        annotation: serialized,
        html: serialized.jqHTML[0].outerHTML,
        slide: slideId,
        deck: deckId
    };

    context.service.create('annotations.new', body, {timeout: 20 * 1000}, (err, res) => {
        context.dispatch('REMOVE_SELECTION');
        context.dispatch('SAVE_ANNOTATION', serialized);
        done();
    });
}
