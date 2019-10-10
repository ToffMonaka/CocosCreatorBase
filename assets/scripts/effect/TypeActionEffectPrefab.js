var NodeAction = require('tml_NodeAction');
var ConstantUtil = require('ConstantUtil');
var EffectPrefab = require('EffectPrefab');

cc.Class({
    extends: EffectPrefab,

    properties: {
        action: {default: null, visible: false},
        actionTag: {default: 0, visible: false},
        deleteFlag: {default: false, visible: false}
    },

    create: function (desc) {
        this.setMasterID(desc.masterID);

        this.action = (desc.action == null) ? new NodeAction() : desc.action;
        this.actionTag = desc.actionTag;

        let create_res = this._super(desc);

        if (create_res < 0) {
            return (create_res);
        }

        return (0);
    },

    delete: function () {
        if (this.action.node == this.node) {
            this.action.run(null, null, 0);
        }

        this._super();

        return;
    },

    update: function (time) {
        if (!this.canUpdate()) {
            return;
        }

        this.onUpdate(time);

        if (this.action.node == this.node) {
            if (!this.deleteFlag) {
                if ((this.autoDeleteFlag)
                && (!this.action.isRun())) {
                    this.deleteFlag = true;
                }
            } else {
                this.delete();
            }
        } else {
            this.delete();
        }

        return;
    },

    play: function () {
        this.node.active = true;

        this._super();

        return;
    },

    stop: function () {
        this.node.active = false;

        if (this.action.node == this.node) {
            this.action.run(null, null, 0);
        }

        this._super();

        return;
    }
});
