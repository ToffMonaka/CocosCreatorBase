var NodeUtil = require('tml_NodeUtil');
var Layer = require('tml_Layer');
var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: Layer,

    properties: {
        infoLabel: {default: null, type: cc.Label}
    },

    onReady: function () {
        {// set layer
            this.setLayerController([]);
        }
        
        return;
    },

    onCreate: function (desc) {
        {// create layer
        }

        {// set event
        }
        
        return (0);
    },

    onDelete: function () {
        return;
    },
    
    onUpdate: function (time) {
        return;
    },

    onOpen: function () {
        if (this.openFlag) {
            switch (this.openType) {
            case ConstantUtil.TERMINAL_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);
        
                break;
            }
            }

            this.setOpen();
        } else {
            switch (this.openType) {
            case ConstantUtil.TERMINAL_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);
                
                break;
            }
            }
            
            this.setClose();
        }
        
        return;
    },

    onCompleteOpen: function () {
        return;
    },
    
    onFocus: function () {
        return;
    },

    canOpen: function (open_flg) {
        if (open_flg) {
            if (!ConstantUtil.APPLICATION.DEBUG_FLAG) {
                return (false);
            }

            if (!this.canvas.layer.titleLayer.node.active) {
                return (false);
            }
        }

        return (true);
    },

    setOpenParameter: function (param) {
        this._super(param);

        return;
    },

    canFocus: function (focus_flg) {
        return (true);
    },

    isControl: function () {
        return (this._super());
    },
    
    setOpen: function () {
        this.infoLabel.string = "" +
        "Terminal Info:\n" +
        "SIZE=" + this.canvas.node.width + "," + this.canvas.node.height + "\n" +
        "LANGUAGE=" + cc.sys.language + "\n" +
        "BROWSER=" + cc.sys.isBrowser + "\n" +
        "MOBILE=" + cc.sys.isMobile + "\n" +
        "NATIVE=" + cc.sys.isNative + "\n" +
        "ENGINE=" + (!CC_EDITOR || cc.engine.isPlaying);

        return;
    },

    setClose: function () {
        return;
    }
});
