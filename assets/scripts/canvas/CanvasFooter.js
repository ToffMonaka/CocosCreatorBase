var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        canvasID: {default: ConstantUtil.CANVAS.ID.NONE},
        createUpdateCount: {default: -1, visible: false},
        waitNode: {default: null, type: cc.Node},
        waitLabel: {default: null, type: cc.Label}
    },

    onLoad: function () {
        this.canvas = this.node.parent.getComponent(ConstantUtil.CANVAS.ID_COMPONENT_NAME_ARRAY[this.canvasID]);

        this.createUpdateCount = 0;

        this.waitNode.active = true;
        this.waitLabel.string = ConstantUtil.CANVAS.WAIT_MESSAGE_ARRAY[this.canvas.system.config.data.languageType];

        return;
    },

    update: function (time) {
        if (this.createUpdateCount >= 0) {
            switch (this.canvasID) {
            case ConstantUtil.CANVAS.ID.INIT: {
                if (this.createUpdateCount == 0) {
                    this.canvas.system.updateCreate();

                    if (this.canvas.system.isCreateComplete()) {
                        this.createUpdateCount = 1;
                    }
                } else if (this.createUpdateCount == 1) {
                    this.canvas.changeScene(ConstantUtil.CANVAS.ID_SCENE_NAME_ARRAY[ConstantUtil.CANVAS.ID.MAIN]);

                    this.createUpdateCount = -1;

                    this.waitNode.active = true;
                }

                break;
            }
            case ConstantUtil.CANVAS.ID.MAIN: {
                if (this.createUpdateCount == 0) {
                    this.canvas.system.updateCreate();

                    if (this.canvas.system.isCreateComplete()) {
                        this.createUpdateCount = 1;
                    }
                } else if (this.createUpdateCount == 1) {
                    this.canvas.graphic.create({canvas: this.canvas});
    
                    this.canvas.sound.create({canvas: this.canvas});
        
                    this.canvas.prefab.create({canvas: this.canvas});

                    this.canvas.layer.create({canvas: this.canvas, openAutoFlag: false});
                    this.canvas.layer.setOpenParameter({openType: ConstantUtil.CANVAS_LAYER.OPEN_TYPE.WORK1});
                    
                    this.canvas.layer.setOpenParameter({openType: ConstantUtil.CANVAS_LAYER.OPEN_TYPE.WORK1});
                    this.canvas.layer.open(true);

                    this.createUpdateCount = -1;
                    
                    this.waitNode.active = false;
                }

                break;
            }
            }
        }

        return;
    }
});
