import shortid from 'shortid';

const ENTITY_CLASS = 'r_entity';
const ENTITY_CLASS_PREFIX = 'r_';
const RDFS_NS = 'http://www.w3.org/2000/01/rdf-schema#';
const DBO_NS = 'http://dbpedia.org/ontology/';
const PROPERTY_CLASS = 'r_prop';
const BASE_PROPERTY_CLASS = 'r_name';
const BASE_PROPERTY_TYPE = RDFS_NS + 'type';

/**
 * Created by korovin on 3/12/2017.
 */
export default class Annotation {
    constructor(uri, type, name) {
        this.className = ENTITY_CLASS_PREFIX + type.toLowerCase();
        this.id = ENTITY_CLASS_PREFIX + shortid.generate();
        this.typeof = DBO_NS + type;
        this.class = ENTITY_CLASS;
        this.type = type;
        this.uri = uri;
        this.name = name;
    }

    /**
     * @return {string}
     */
    static get BASE_ENTITY_CLASS() {
        return ENTITY_CLASS;
    }

    get jqHTML() {
        return $('#inlineContent').find('span[data-id="' + this.id + '"]');
    }

    toHtml(text) {
        return `<span class="${PROPERTY_CLASS} ${BASE_PROPERTY_CLASS}" property="${BASE_PROPERTY_TYPE}">${text}</span>`;
    }
}
