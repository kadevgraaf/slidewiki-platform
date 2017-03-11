/**
 * Created by korovin on 3/11/2017.
 */
export default function getSelection() {
    let range = [];

    if (typeof window.getSelection != "undefined") {
        let sel = window.getSelection();
        console.log(sel);
        if (sel.rangeCount) {
            console.log(sel.rangeCount);
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                range.push(sel.getRangeAt(i));
            }
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            let ranges = document.selection.createRange();

        }
    }

    return range;
}
