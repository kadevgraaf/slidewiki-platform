import AnnotationStore from "../../stores/AnnotationStore";

/**
 * Created by korovin on 3/11/2017.
 */
export default function addCommentAnnotation(context, payload, done) {
    let { comment } = payload;
    let { ranges } = context.getStore(AnnotationStore).getState();
    console.log(ranges);
    
    //context.dispatch('NEW_COMMENT_ANNOTATION', payload);
    done();
}
