var ConstantUtil = require('ConstantUtil');
var EffectPrefab = require('EffectPrefab');

cc.Class({
    extends: EffectPrefab,

    properties: {
        animation: {default: null, type: cc.Animation},
        animationState: {default: null, type: cc.AnimationState, visible: false},
        animationTime: {default: 0.0, visible: false},
        deleteFlag: {default: false, visible: false}
    },

    create: function (desc) {
        this.setMasterID(desc.masterID);

        this.animationState = this.animation.getAnimationState(this.animation.getClips()[0].name);
        this.animationTime = this.animationState.duration * 60;

        let create_res = this._super(desc);

        if (create_res < 0) {
            return (create_res);
        }

        return (0);
    },

    delete: function () {
        this._super();

        return;
    },

    update: function (time) {
        if (!this.isUpdatable()) {
            return;
        }

        this.onUpdate(time);

        if (!this.deleteFlag) {
            if ((this.autoDeleteFlag)
            && (!this.animationState.isPlaying)) {
                this.deleteFlag = true;
            }
        } else {
            this.delete();
        }

        return;
    },

    play: function () {
        this.node.active = true;

        this.animation.play();

        this._super();

        return;
    },

    stop: function () {
        this.node.active = false;

        this.animation.setCurrentTime(0);
        this.animation.stop();

        this._super();

        return;
    }
});
