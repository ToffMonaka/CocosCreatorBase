var NodeAction = require('tml_NodeAction');
var LayerController = require('tml_LayerController');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        layer: {default: null, serializable: false, visible: false},
        openFlag: {default: false, visible: false},
        openType: {default: 0, visible: false},
        openContinueFlag: {default: false, visible: false},
        openAction: {default: null, visible: false},
        openCompleteFlag: {default: false, visible: false},
        openCompleteCallback: {default: null, visible: false},
        openCompleteCallbackOnceFlag: {default: false, visible: false},
        openAutoFlag: {default: true, visible: false},
        focusFlag: {default: false, visible: false},
        layerController: {default: null, visible: false}
    },

    onLoad: function () {
        this.ready();

        return;
    },

    onReady: function () {
        return;
    },

    onCreate: function (desc) {
        return (0);
    },

    onDelete: function () {
        return;
    },
    
    onUpdate: function (time) {
        return;
    },

    onOpen: function () {
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
        return;
    },

    ready: function () {
        this.onReady();
        
        return;
    },
    
    create: function (desc) {
        this.canvas = (desc.canvas === undefined) ? desc.layer.canvas : desc.canvas;
        this.layer = (desc.layer === undefined) ? null : desc.layer;
        this.openAction = new NodeAction();
        this.openAutoFlag = desc.openAutoFlag;

        let create_res = this.onCreate(desc);

        if (create_res < 0) {
            this.setActiveFlag(false);

            return (create_res);
        }

        this.setActiveFlag(false);

        return (0);
    },
    
    delete: function () {
        this.onDelete();

        this.node.destroy();

        return;
    },
    
    update: function (time) {
        if (!this.isUpdatable()) {
            return;
        }

        this.updateOpen();
        this.updateFocus();

        for (let layer_i = 0; layer_i < this.layerController.layerArray.length; ++layer_i) {
            let layer = this.layerController.layerArray[layer_i];

            if (layer.openAutoFlag) {
                if (this.focusFlag != layer.openFlag) {
                    layer.open(this.focusFlag);
                }

                if (!layer.isOpenable(layer.openFlag)) {
                    layer.open(!layer.openFlag);
                }
            }
        }

        this.onUpdate(time);

        return;
    },

    isUpdatable: function () {
        return (this.canvas != null);
    },
    
    open: function (open_flg) {
        if (!this.isOpenable(open_flg)) {
            return;
        }

        this.openFlag = open_flg;
        
        if (open_flg) {
            this.setActiveFlag(true);
        }

        this.onOpen();

        this.update(0.0);

        return;
    },

    isOpenable: function (open_flg) {
        return (true);
    },

    updateOpen: function () {
        if (this.openFlag & !this.openAction.isRun() & !this.openCompleteFlag) {
            this.completeOpen(true);
        }

        if (!this.openFlag & !this.openAction.isRun()) {
            this.completeOpen(false);

            if (!this.openFlag) {
                this.setActiveFlag(false);
            }
        }

        this.onUpdateOpen();

        return;
    },

    setOpenParameter: function (param) {
        if (param.openType !== undefined) {
            this.openType = param.openType;
        }

        if (param.openContinueFlag !== undefined) {
            this.openContinueFlag = param.openContinueFlag;
        }
        
        return;
    },

    completeOpen: function (open_flg) {
        this.openCompleteFlag = open_flg;
        
        this.onCompleteOpen();

        if (this.openCompleteCallback != null) {
            this.openCompleteCallback(this);

            if (this.openCompleteCallbackOnceFlag) {
                this.openCompleteCallback = null;
            }
        }

        return;
    },

    setOpenCompleteCallback: function (callback, once_flg) {
        this.openCompleteCallback = callback;
        this.openCompleteCallbackOnceFlag = once_flg;
        
        return;
    },

    focus: function (focus_flg) {
        if (!this.isFocusable(focus_flg)) {
            return;
        }

        this.focusFlag = focus_flg;

        this.onFocus();

        return;
    },

    focusByBase: function () {
        if (this.focusFlag) {
            if (this.layer != null) {
                if (!this.layer.focusFlag) {
                    this.focus(false);
                }
            } else {
            }
        } else if (this.openCompleteFlag) {
            if (this.layer != null) {
                if (this.layer.focusFlag) {
                    this.focus(true);
                }
            } else {
                this.focus(true);
            }
        }

        return;
    },

    focusByYes: function (yes_flg) {
        if (this.focusFlag) {
            if (this.layer != null) {
                if ((!this.layer.focusFlag)
                || (!yes_flg)) {
                    this.focus(false);
                }
            } else {
                if (!yes_flg) {
                    this.focus(false);
                }
            }
        } else if (this.openCompleteFlag) {
            if (this.layer != null) {
                if ((this.layer.focusFlag)
                && (yes_flg)) {
                    this.focus(true);
                }
            } else {
                if (yes_flg) {
                    this.focus(true);
                }
            }
        }

        return;
    },
    
    focusByNo: function (no_flg) {
        if (this.focusFlag) {
            if (this.layer != null) {
                if ((!this.layer.focusFlag)
                || (no_flg)) {
                    this.focus(false);
                }
            } else {
                if (no_flg) {
                    this.focus(false);
                }
            }
        } else if (this.openCompleteFlag) {
            if (this.layer != null) {
                if ((this.layer.focusFlag)
                && (!no_flg)) {
                    this.focus(true);
                }
            } else {
                if (!no_flg) {
                    this.focus(true);
                }
            }
        }

        return;
    },
    
    focusByYesNo: function (yes_flg, no_flg) {
        if (this.focusFlag) {
            if (this.layer != null) {
                if ((!this.layer.focusFlag)
                || (!yes_flg || no_flg)) {
                    this.focus(false);
                }
            } else {
                if (!yes_flg || no_flg) {
                    this.focus(false);
                }
            }
        } else if (this.openCompleteFlag) {
            if (this.layer != null) {
                if ((this.layer.focusFlag)
                && (yes_flg && !no_flg)) {
                    this.focus(true);
                }
            } else {
                if (yes_flg && !no_flg) {
                    this.focus(true);
                }
            }
        }

        return;
    },

    isFocusable: function (focus_flg) {
        return (true);
    },
    
    updateFocus: function () {
        this.onUpdateFocus();

        return;
    },

    isControl: function () {
        if (this.layer != null) {
            if (!this.layer.isControl()) {
                return (false);
            }
        }

        this.updateFocus();

        return (this.openFlag & !this.openAction.isRun() & this.focusFlag);
    },

    setActiveFlag: function (active_flg) {
        this.node.active = active_flg;
        this.openFlag = active_flg;
        this.openCompleteFlag = false;
        this.focusFlag = false;
        this.hideLayerController(this.layerController);
    
        return;
    },
    
    setLayerController: function (layer_ary) {
        this.layerController = new LayerController(layer_ary);

        return;
    },

    hideLayerController: function (layer_ctrl) {
        for (let layer_i = 0; layer_i < layer_ctrl.layerArray.length; ++layer_i) {
            let layer = layer_ctrl.layerArray[layer_i];

            layer.setActiveFlag(false);
        }

        return;
    }
});
