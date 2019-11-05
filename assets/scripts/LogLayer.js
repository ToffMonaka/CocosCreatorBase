var NodeUtil = require('tml_NodeUtil');
var Layer = require('tml_Layer');
var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: Layer,

    properties: {
        messageArray: {default: [], visible: false},
        messageLimit: {default: 0, visible: false},
        messageLabel: {default: null, type: cc.Label}
    },

    onReady: function () {
        {// set layer
        }
        
        return;
    },

    onCreate: function (desc) {
        this.deleteMessage();

        this.messageLimit = desc.messageLimit;
        
        {// create layer
        }
        
        {// set event
        }

        return (0);
    },

    onDelete: function () {
        this.deleteMessage();
        
        return;
    },
    
    onUpdate: function (time) {
        return;
    },

    onOpen: function () {
        if (this.openFlag) {
            switch (this.openType) {
            case ConstantUtil.LOG_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);
        
                break;
            }
            }

            this.setOpen();
        } else {
            switch (this.openType) {
            case ConstantUtil.LOG_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);

                break;
            }
            }

            this.setClose();
        }
        
        return;
    },

    onCanOpen: function (open_flg) {
        if (open_flg) {
            if (!ConstantUtil.APPLICATION.DEBUG_FLAG) {
                return (false);
            }
        }
        
        return (true);
    },

    onCompleteOpen: function () {
        return;
    },
    
    onFocus: function () {
        return;
    },

    onCanFocus: function (focus_flg) {
        return (true);
    },

    setOpenParameter: function (param) {
        this._super(param);

        return;
    },

    isControl: function () {
        return (this._super());
    },

    setOpen: function () {
        return;
    },
    
    setClose: function () {
        return;
    },

    addMessage: function (msg) {
        if (this.messageArray.length > this.messageLimit) {
            this.messageArray.shift();
        }

        this.messageArray.push(msg);
        this.messageLabel.string = "Log Message:\n" + this.messageArray.join("\n");

        cc.log(msg);

        return;
    },

    deleteMessage: function () {
        this.messageArray = [];
        this.messageLabel.string = "Log Message:\n";

        return;
    }
});
