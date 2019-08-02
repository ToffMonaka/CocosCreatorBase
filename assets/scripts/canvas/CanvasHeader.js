var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        canvasID: {default: ConstantUtil.CANVAS.ID.NONE},
        createUpdateCount: {default: -1, visible: false}
    },

    onLoad: function () {
        this.canvas = this.node.parent.getComponent(ConstantUtil.CANVAS.ID_COMPONENT_NAME_ARRAY[this.canvasID]);

        this.createUpdateCount = 0;

        return;
    },

    update: function (time) {
        if (this.createUpdateCount >= 0) {
            switch (this.canvasID) {
            case ConstantUtil.CANVAS.ID.INIT: {
                if (this.createUpdateCount == 0) {
                    this.createUpdateCount = -1;
                }

                break;
            }
            case ConstantUtil.CANVAS.ID.MAIN: {
                if (this.createUpdateCount == 0) {
                    this.createUpdateCount = -1;
                }

                break;
            }
            }
        }
    
        return;
    }
});
