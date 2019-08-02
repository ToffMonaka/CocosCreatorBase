var NodeUtil = require('tml_NodeUtil');
var Layer = require('tml_Layer');
var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: Layer,

    properties: {
        terminalLayerNode: {default: null, type: cc.Node},
        terminalLayer: {default: null, serializable: false, visible: false},
        logLayerNode: {default: null, type: cc.Node},
        logLayer: {default: null, serializable: false, visible: false},
        titleLayerNode: {default: null, type: cc.Node},
        titleLayer: {default: null, serializable: false, visible: false}
    },

    onReady: function () {
        {// set layer
            this.terminalLayer = this.terminalLayerNode.getComponent('TerminalLayer');
            this.logLayer = this.logLayerNode.getComponent('LogLayer');
            this.titleLayer = this.titleLayerNode.getComponent('TitleLayer');

            this.setLayerController([
                this.terminalLayer,
                this.logLayer,
                this.titleLayer
            ]);
        }

        return;
    },

    onCreate: function (desc) {
        {// create layer
            this.terminalLayer.create({layer: this, openAutoFlag: true});
            this.terminalLayer.setOpenParameter({openType: ConstantUtil.TERMINAL_LAYER.OPEN_TYPE.WORK1});
            
            this.logLayer.create({layer: this, openAutoFlag: true, messageLimit: 30});
            this.logLayer.setOpenParameter({openType: ConstantUtil.LOG_LAYER.OPEN_TYPE.WORK1});

            this.titleLayer.create({layer: this, openAutoFlag: false});
            this.titleLayer.setOpenParameter({openType: ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK1});
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
            case ConstantUtil.CANVAS_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);
                
                break;
            }
            }

            this.setOpen();
        } else {
            switch (this.openType) {
            case ConstantUtil.CANVAS_LAYER.OPEN_TYPE.WORK1: {
                this.openAction.run(this.node, null, 0);
                
                break;
            }
            }

            this.setClose();
        }

        return;
    },

    onUpdateOpen: function () {
        return;
    },
    
    onCompleteOpen: function () {
        return;
    },
    
    onFocus: function () {
        return;
    },
    
    onUpdateFocus: function () {
        this.focusByBase();
        
        return;
    },
    
    isOpenable: function (open_flg) {
        return (true);
    },

    setOpenParameter: function (param) {
        this._super(param);

        return;
    },

    isFocusable: function (focus_flg) {
        return (true);
    },

    isControl: function () {
        return (this._super());
    },

    setOpen: function () {
        this.titleLayer.setOpenParameter({openType: ConstantUtil.TITLE_LAYER.OPEN_TYPE.WORK2});
        this.titleLayer.open(true);

        return;
    },

    setClose: function () {
        return;
    }
});
