
export default function getSlideThumbnail(context, payload, done) {
    context.service.read('thumbnail.htmlcontent', payload, {timeout: 20 * 1000}, (err, res) => {
        if (err) {
            context.dispatch('GET_SLIDE_THUMBNAIL_FAILURE', err);
            console.log('Error en thumb');
        } else {
            console.log('getSlideThumbnail.SRC = '+ res.contents.src);
            context.dispatch('GET_SLIDE_THUMBNAIL_SUCCESS', res);
        }

        done();
    });
}