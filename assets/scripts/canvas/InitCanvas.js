var ConstantUtil = require('ConstantUtil');
var CanvasUtil = require('CanvasUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, type: cc.Node, visible: false},
        config: {default: null, visible: false},
        system: {default: null, visible: false},
        storage: {default: null, visible: false},
        db: {default: null, visible: false},
        headerNode: {default: null, type: cc.Node},
        header: {default: null, serializable: false, visible: false},
        footerNode: {default: null, type: cc.Node},
        footer: {default: null, serializable: false, visible: false}
    },

    onLoad: function () {
        this.canvas = this.getComponent(cc.Canvas);
        this.system = CanvasUtil.getNewSystem();
        this.config = this.system.config;
        this.storage = this.system.storage;
        this.db = this.system.db;
        this.header = this.headerNode.getComponent('CanvasHeader');
        this.footer = this.footerNode.getComponent('CanvasFooter');

        cc.director.getPhysicsManager().enabled = true;

        return;
    },

    changeScene: function (name) {
        cc.director.loadScene(name);

        return;
    },

    restartScene: function () {
        this.changeScene(ConstantUtil.CANVAS.ID_SCENE_NAME_ARRAY[ConstantUtil.CANVAS.ID.INIT]);

        return;
    },

    exitScene: function () {
        cc.game.end();

        return;
    }
});
