/**
 * Created by korovin on 3/17/2017.
 */
export default class TooltipCreator {
    static addOnHover(anno, wiki) {
        let annotations = $('#inlineContent').find('span[data-id="' + anno.id + '"]');
        annotations.mouseover(e => {
            e.stopPropagation();
            annotations.addClass('r_highlight');
        }).mouseout(_ => {
            annotations.removeClass('r_highlight');
        }).qtip({
            content: {
                title: 'Semantic Annotation',
                text: 'Type: ' + anno.type + ' wiki:' + wiki
            },
            position: {
                target: 'mouse', // Use the mouse position as the position origin
                adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
            }});
    }
}
