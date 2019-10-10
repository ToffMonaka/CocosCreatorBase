var ConstantUtil = require('ConstantUtil');
var TypeActionEffectPrefab = require('TypeActionEffectPrefab');

cc.Class({
    extends: TypeActionEffectPrefab,

    properties: {
        messageLayout: {default: null, type: cc.Layout},
        messageLabel: {default: null, type: cc.Label},
        inTime: {default: 0.0, visible: false},
        waitTime: {default: 0.0, visible: false},
        outTime: {default: 0.0, visible: false}
    },

    onReady: function () {
        this.messageLayout.updateLayout();

        {// set event
        }

        return;
    },

    onCreate: function (desc) {
        this.messageLabel.string = desc.message;
        this.inTime = desc.inTime;
        this.waitTime = desc.waitTime;
        this.outTime = desc.outTime;

        return (0);
    },

    onUpdate: function (time) {
        return;
    },
    
    onPlay: function () {
        let y = 0;
        let act = null;
        let act_ary = [];

        if (this.outTime > 0.0) {
            y = 0;
            act_ary.unshift(cc.moveTo(this.outTime, this.node.x, this.canvas.node.height * 0.5 + this.node.height * 0.5));
        }

        if (this.waitTime > 0.0) {
            y = 0;
            act_ary.unshift(cc.delayTime(this.waitTime));
        }

        if (this.inTime > 0.0) {
            y = this.canvas.node.height * 0.5 + this.node.height * 0.5;
            act_ary.unshift(cc.moveTo(this.inTime, this.node.x, 0));
        }

        if (act_ary.length > 1) {
            act = cc.sequence(act_ary);
        } else if (act_ary.length == 1) {
            act = act_ary[0];
        }

        this.node.setPosition(this.node.x, y);

        this.action.run(this.node, act, this.actionTag);

        this.canvas.sound.playSE(ConstantUtil.CANVAS_SOUND.SE_FILE_PATH_ID.NOTICE_SE1, 0.5, false);

        return;
    }
});
