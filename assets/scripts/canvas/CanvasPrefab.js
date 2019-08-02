var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        effectPrefabArray: {default: [], type: cc.Prefab}
    },

    onLoad: function () {
        return;
    },

    create: function (desc) {
        this.canvas = desc.canvas;

        return (0);
    }
});
