var ConstantUtil = require('ConstantUtil');
var CanvasUtil = require('CanvasUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, type: cc.Node, visible: false},
        system: {default: null, visible: false},
        config: {default: null, visible: false},
        storage: {default: null, visible: false},
        db: {default: null, visible: false},
        headerNode: {default: null, type: cc.Node},
        header: {default: null, serializable: false, visible: false},
        footerNode: {default: null, type: cc.Node},
        footer: {default: null, serializable: false, visible: false},
        graphicNode: {default: null, type: cc.Node},
        graphic: {default: null, serializable: false, visible: false},
        soundNode: {default: null, type: cc.Node},
        sound: {default: null, serializable: false, visible: false},
        prefabNode: {default: null, type: cc.Node},
        prefab: {default: null, serializable: false, visible: false},
        layerNode: {default: null, type: cc.Node},
        layer: {default: null, serializable: false, visible: false}
    },

    onLoad: function () {
        this.canvas = this.getComponent(cc.Canvas);
        this.system = CanvasUtil.getSystem();
        this.config = this.system.config;
        this.storage = this.system.storage;
        this.db = this.system.db;
        this.header = this.headerNode.getComponent('CanvasHeader');
        this.footer = this.footerNode.getComponent('CanvasFooter');
        this.graphic = this.graphicNode.getComponent('CanvasGraphic');
        this.sound = this.soundNode.getComponent('CanvasSound');
        this.prefab = this.prefabNode.getComponent('CanvasPrefab');
        this.layer = this.layerNode.getComponent('CanvasLayer');

        return;
    },

    changeScene: function (name) {
        cc.director.loadScene(name);

        return;
    },
    
    restartScene: function () {
        this.sound.stopBGM();
        this.sound.stopSE();

        this.changeScene(ConstantUtil.CANVAS.ID_SCENE_NAME_ARRAY[ConstantUtil.CANVAS.ID.INIT]);

        return;
    },

    exitScene: function () {
        this.sound.stopBGM();
        this.sound.stopSE();

        cc.game.end();

        return;
    }
});
