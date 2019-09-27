var ConstantUtil = require('ConstantUtil');
var EffectPrefab = require('EffectPrefab');

cc.Class({
    extends: EffectPrefab,

    properties: {
        particleSystem: {default: null, type: cc.ParticleSystem},
        deleteFlag: {default: false, visible: false}
    },

    create: function (desc) {
        this.setMasterID(desc.masterID);

        this.particleSystem.autoRemoveOnFinish = false;

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
        if (!this.canUpdate()) {
            return;
        }

        this.onUpdate(time);

        if (!this.deleteFlag) {
            if ((this.autoDeleteFlag)
            && (!this.particleSystem.active && (this.particleSystem.particleCount <= 0))) {
                this.deleteFlag = true;
            }
        } else {
            this.delete();
        }

        return;
    },

    play: function () {
        this.node.active = true;

        this.particleSystem.resetSystem();

        this._super();

        return;
    },

    stop: function () {
        this.node.active = false;

        this.particleSystem.stopSystem();

        this._super();

        return;
    }
});
