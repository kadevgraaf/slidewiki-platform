import shortid from 'shortid';

const ENTITY_CLASS = 'r_entity';
const ENTITY_CLASS_PREFIX = 'r_';
const SCHEMA_TYPEOF_PREFIX = 'typeof="schema:';

/**
 * Created by korovin on 3/12/2017.
 */
export default class Annotation {
    constructor(type) {
        this.className = ENTITY_CLASS_PREFIX + type.toLowerCase();
        this.id = shortid.generate();
        this.typeof = SCHEMA_TYPEOF_PREFIX + type + '"';
        this.class = ENTITY_CLASS;
        this.type = type;
    }
}
