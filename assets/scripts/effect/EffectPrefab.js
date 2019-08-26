var LayerPrefab = require('tml_LayerPrefab');
var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: LayerPrefab,

    properties: {
        parentNode: {default: null, type: cc.Node, visible: false},
        masterData: {default: null, visible: false},
        autoDeleteFlag: {default: false, visible: false}
    },

    onReady: function () {
        {// set event
        }

        return;
    },
    
    onPlay: function () {
        return;
    },

    onStop: function () {
        return;
    },
    
    create: function (desc) {
        this.parentNode = desc.parentNode;
        this.autoDeleteFlag = desc.autoDeleteFlag;

        let create_res = this._super(desc);

        if (create_res < 0) {
            this.node.active = false;

            return (create_res);
        }

        this.parentNode.addChild(this.node);

        this.node.active = false;

        return (0);
    },

    play: function () {
        this.onPlay();

        return;
    },

    stop: function () {
        this.onStop();

        return;
    },

    setMasterID: function (mst_id) {
        this.masterData = ConstantUtil.EFFECT_MASTER_DATA.get(mst_id);

        return;
    }
});
