var NodeUtil = require('tml_NodeUtil');
var Layer = require('tml_Layer');
var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: Layer,

    properties: {
        bottomLayoutNode: {default: null, type: cc.Node},
        companyNameLabel: {default: null, type: cc.Label},
        versionNameLabel: {default: null, type: cc.Label}
    },

    onReady: function () {
        {// set layer
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
        this.updateBottomLayout();

        return;
    },

    onOpen: function () {
        if (this.openFlag) {
            switch (this.openType) {
            case ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK1: {
                this.node.scale = 1.0;
                this.node.opacity = 255;
                this.openAction.run(this.node, null, 0);
                
                break;
            }
            case ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK2: {
                this.node.scale = 1.0;
                this.node.opacity = 0;
                this.openAction.run(this.node, cc.fadeTo(0.1, 255), 0);

                break;
            }
            case ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK3: {
                this.node.scale = 10.0;
                this.node.opacity = 0;
                this.openAction.run(this.node, cc.spawn(cc.scaleTo(1.0, 1.0), cc.fadeTo(1.0, 255)), 0);

                break;
            }
            }

            this.setOpen();
        } else {
            switch (this.openType) {
            case ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);
                
                break;
            }
            case ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK2: {
                this.openAction.run(this.node, cc.fadeTo(0.1, 0), 0);

                break;
            }
            case ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK3: {
                this.openAction.run(this.node, cc.spawn(cc.scaleTo(1.0, 10.0), cc.fadeTo(1.0, 0)), 0);

                break;
            }
            }
            
            this.setClose();
        }

        return;
    },

    onCanOpen: function (open_flg) {
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
        this.setCompanyName();
        this.setversionName();

        this.canvas.sound.playBGM(ConstantUtil.CANVAS_SOUND.BGM_FILE_PATH_ID.TITLE_BGM1, 1.0, false);

        return;
    },

    setClose: function () {
        return;
    },

    setCompanyName: function () {
        this.companyNameLabel.string = ConstantUtil.APPLICATION.COMPANY_NAME;

        return;
    },
    
    setversionName: function () {
        this.versionNameLabel.string = 'Version ' + ConstantUtil.APPLICATION.VERSION_NAME;

        return;
    },

    updateBottomLayout: function () {
        return;
    }
});
