import Slide from "./classes/Slide";
import customDate from '../../components/Deck/util/CustomDate';

const DECK_TYPE = 'deck';
const SLIDE_TYPE = 'slide';

/**
 * Created by korovin on 3/29/2017.
 */
export default function doSemSearch(context, payload, done) {
    const { type } = payload;
    let a = 1;
    context.service.read('semsearch.' + type, payload, {timeout: 20 * 1000}, (err, res) => {
        if (!res || !res.results) {
            return;
        }
        // parse here results
        context.dispatch('INIT_SEMSEARCH_RESULTS', parse(res));
        done();
    });
}

function parse(res) {
    let { response } = JSON.parse(res.results);
    let decks = {};
    let deckPromises = [];
    response.docs.forEach(doc => {
        if (doc.kind === DECK_TYPE) {
            deckParse(decks, doc);
        } else if (doc.kind === SLIDE_TYPE) {
            slideParse(decks, doc);
        }
    });
    return Object.keys(decks).map((key) => {
        return decks[key];
    });
    // TODO: iterate here and return array of search results
}

function deckParse(decks, deckObj) {
    const deckId = deckObj.db_id + '-' + deckObj.db_revision_id;
    let deck = null;
    if (decks.hasOwnProperty(deckId)) {
        deck = decks[deckId];
    } else {
        deck = decks[deckId] = {
            id: deckId,
            title: 'No title',
            link: '/deck/' + deckId
        };

        deck.slides = [];
    }

    deck.link = '/deck/' + deckObj.db_id + '-' + deckObj.db_revision_id;
    deck.kind = 'Deck';
    deck.title = (deckObj.title && deckObj.title.length > 70) ? deckObj.title.substring(0,70)+'...' : deckObj.title;
    deck.description = (deckObj.description && deckObj.description.length > 85) ? deckObj.description.substring(0,85)+'...' : deckObj.description;
    deck.lastUpdate = customDate.format(deckObj.lastUpdate, 'Do MMMM YYYY');
    deck.user = {
        id: deckObj.creator,
        username: '',
        link: ''
    };
}

function slideParse(decks, slideObj) {
    const deckId = slideObj.usage[0];

    let slide = new Slide(slideObj);

    if (!decks.hasOwnProperty(deckId)) {
        decks[deckId] = {
            id: deckId,
            title: 'No title',
            link: '/deck/' + slideObj.usage[0],
            slides: [],
            user: {
                id: '',
                username: '',
                link: ''
            }
        }
    } else {
        decks[deckId].slides.push(slide);
    }
}
