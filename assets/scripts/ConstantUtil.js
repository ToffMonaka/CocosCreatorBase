var APPLICATION = {
    DEBUG_FLAG: true,
    COMPANY_NAME: 'Toff Monaka Project',
    VERSION_NAME: '1.0.0'
};
Object.freeze(APPLICATION);

var MASTER = {
    STRING_EN_TABLE_FILE_PATH: 'mst/mst_string_en_tbl',
    STRING_JP_TABLE_FILE_PATH: 'mst/mst_string_jp_tbl',
    STRING_ID: cc.Enum({
        NONE: 0
    })
};
Object.freeze(MASTER);

var CANVAS = {
    ID: cc.Enum({
        NONE: 0,
        INIT: 1,
        MAIN: 2
    }),
    ID_SCENE_NAME_ARRAY: [
        '',
        'init',
        'main'
    ],
    ID_COMPONENT_NAME_ARRAY: [
        '',
        'InitCanvas',
        'MainCanvas'
    ],
    WAIT_MESSAGE_ARRAY: [
        '',
        'Please wait a second.',
        'ちょっと待ってね。'
    ]
};
Object.freeze(CANVAS);

var CANVAS_SYSTEM = {
    CONFIG_DATA_NAME: 'tmp4_conf_dat',
    OPTION_DATA_NAME: 'tmp4_opt_dat'
};
Object.freeze(CANVAS_SYSTEM);

var CANVAS_CONFIG = {
    LANGUAGE_TYPE: cc.Enum({
        NONE: 0,
        ENGLISH: 1,
        JAPANESE: 2
    }),
    LANGUAGE_TYPE_NAME_MASTER_STRING_ID_ARRAY: [
        MASTER.STRING_ID.NONE,
        MASTER.STRING_ID.ENGLISH,
        MASTER.STRING_ID.JAPANESE
    ]
};
Object.freeze(CANVAS_CONFIG);

var CANVAS_STORAGE = {
};
Object.freeze(CANVAS_STORAGE);

var CANVAS_DB = {
};
Object.freeze(CANVAS_DB);

var CANVAS_GRAPHIC = {
};
Object.freeze(CANVAS_GRAPHIC);

var CANVAS_SOUND = {
    BGM_FILE_PATH_ID: cc.Enum({
        NONE: 0,
        TITLE_BGM1: 1
    }),
    BGM_FADE_TYPE: cc.Enum({
        NONE: 0,
        IN: 1
    }),
    BGM_FADE_TIME: 1.5,
    SE_FILE_PATH_ID: cc.Enum({
        NONE: 0,
        NOTICE_SE1: 1
    })
};
Object.freeze(CANVAS_SOUND);

var CANVAS_PREFAB = {
};
Object.freeze(CANVAS_PREFAB);

var CANVAS_LAYER = {
    OPEN_TYPE: cc.Enum({
        NONE: 0,
        WORK1: 1
    })
};
Object.freeze(CANVAS_LAYER);

var TERMINAL_LAYER = {
    OPEN_TYPE: cc.Enum({
        NONE: 0,
        WORK1: 1
    })
};
Object.freeze(TERMINAL_LAYER);

var LOG_LAYER = {
    OPEN_TYPE: cc.Enum({
        NONE: 0,
        WORK1: 1
    })
};
Object.freeze(LOG_LAYER);

var TITLE_LAYER = {
    OPEN_TYPE: cc.Enum({
        NONE: 0,
        WORK1: 1,
        WORK2: 2,
        WORK3: 3
    })
};
Object.freeze(TITLE_LAYER);

var EFFECT = {
    MASTER_ID: cc.Enum({
        NONE: 0,
        FADE1: 1,
        NOTICE1: 2
    }),
    TYPE: cc.Enum({
        NONE: 0,
        ACTION: 1,
        ANIMATION: 2,
        PARTICLE: 3
    })
};
Object.freeze(EFFECT);

var EFFECT_MASTER_DATA = {
    ARRAY: [
        {
            ID: EFFECT.MASTER_ID.NONE, TYPE: EFFECT.TYPE.NONE
        },
        {
            ID: EFFECT.MASTER_ID.FADE1, TYPE: EFFECT.TYPE.ACTION
        },
        {
            ID: EFFECT.MASTER_ID.NOTICE1, TYPE: EFFECT.TYPE.ACTION
        },
    ],
    get: function (mst_id) {
        return (this.ARRAY[mst_id]);
    },
    getArray: function () {
        return (this.ARRAY);
    }
};
Object.freeze(EFFECT_MASTER_DATA);

module.exports = {
    APPLICATION: APPLICATION,
    MASTER: MASTER,
    CANVAS: CANVAS,
    CANVAS_SYSTEM: CANVAS_SYSTEM,
    CANVAS_CONFIG: CANVAS_CONFIG,
    CANVAS_STORAGE: CANVAS_STORAGE,
    CANVAS_DB: CANVAS_DB,
    CANVAS_GRAPHIC: CANVAS_GRAPHIC,
    CANVAS_SOUND: CANVAS_SOUND,
    CANVAS_PREFAB: CANVAS_PREFAB,
    CANVAS_LAYER: CANVAS_LAYER,
    TERMINAL_LAYER: TERMINAL_LAYER,
    LOG_LAYER: LOG_LAYER,
    TITLE_LAYER: TITLE_LAYER,
    EFFECT: EFFECT,
    EFFECT_MASTER_DATA: EFFECT_MASTER_DATA
};
