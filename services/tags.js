import { Microservices } from '../configs/microservices';
import rp from 'request-promise';

export default {
    name: 'tags',
    read: (req, resource, params, config, callback) => {
        const { id } = params;

        switch (resource) {
            case 'tags.slide':
                // TODO: get tags for slide from real deck service
                callback(null, getTagsForSlide(id));
                break;
            case 'tags.deck':
                callback(null, getTagsForDeck(id));
                break;
        }
    },
    create: (req, resource, params, body, config, callback) => {
        const { id, tag } = params;

        switch (resource) {
            case 'tags.slide':
                // TODO: add tag to real service
                addTagToSlide(id, tag, callback);
                break;
            case 'tags.deck':
                addTagToDeck(id, tag, callback);
                break;
        }
    },
    update: (req, resource, params, body, config, callback) => {
        // TODO: implement update
    },
    delete: (req, resource, params, body, config, callback) => {
        // TODO: implement delete
    }
};

function getTagsForDeck(id) {
    return ['Tag1Deck', 'Tag2Deck'];
}

function getTagsForSlide(id) {
    return ['Tag1Slide', 'Tag2Slide'];
}

function addTagToDeck(id, tag, callback) {
    callback(null, { success: true, id: id, tag: tag });
}

function addTagToSlide(id, tag, callback) {
    callback(null, { success: true, id: id, tag: tag });
}