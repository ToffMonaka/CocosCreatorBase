var ConstantUtil = require('ConstantUtil');
var TypeActionEffectPrefab = require('TypeActionEffectPrefab');

cc.Class({
    extends: TypeActionEffectPrefab,

    properties: {
        outTime: {default: 0.0, visible: false},
        waitTime: {default: 0.0, visible: false},
        inTime: {default: 0.0, visible: false}
    },

    onCreate: function (desc) {
        this.node.color = desc.color;
        this.outTime = desc.outTime;
        this.waitTime = desc.waitTime;
        this.inTime = desc.inTime;

        return (0);
    },

    onUpdate: function (time) {
        this.node.setPosition(this.parentNode.getPosition());
        this.node.setContentSize(this.parentNode.getContentSize());

        return;
    },
    
    onPlay: function () {
        let opacity = 0;
        let act = null;
        let act_ary = [];

        if (this.inTime > 0.0) {
            opacity = 255;
            act_ary.unshift(cc.fadeTo(this.inTime, 0));
        }

        if (this.waitTime > 0.0) {
            opacity = 255;
            act_ary.unshift(cc.delayTime(this.waitTime));
        }
        
        if (this.outTime > 0.0) {
            opacity = 0;
            act_ary.unshift(cc.fadeTo(this.outTime, 255));
        }

        if (act_ary.length > 1) {
            act = cc.sequence(act_ary);
        } else if (act_ary.length == 1) {
            act = act_ary[0];
        }
        
        this.node.opacity = opacity;
        this.action.run(this.node, act, this.actionTag);

        return;
    }
});
