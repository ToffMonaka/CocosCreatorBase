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
        focusOpenFlag: {default: false, visible: false},
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

    onCompleteOpen: function () {
        return;
    },
    
    onFocus: function () {
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
        if (!this.canUpdate()) {
            return;
        }

        if ((this.openFlag & !this.openCompleteFlag)
        && (!this.openAction.isRun())) {
            this.completeOpen();
        }

        if ((!this.openFlag)
        && (!this.openAction.isRun())) {
            this.completeOpen();
        }

        this.updateOpen();
        
        this.updateFocus();

        this.onUpdate(time);

        if (!this.openFlag & !this.openCompleteFlag) {
            this.setActiveFlag(false);
        }

        for (let layer_i = 0; layer_i < this.layerController.layerArray.length; ++layer_i) {
            let layer = this.layerController.layerArray[layer_i];

            if (!layer.openAutoFlag) {
                continue;
            }

            if (layer.openFlag) {
                if (this.focusFlag) {
                    if (!layer.canOpen(true)) {
                        layer.open(false);
                    }
                } else {
                    layer.open(false);
                }
            } else {
                if (this.focusFlag) {
                    layer.open(true);
                }
            }
        }

        return;
    },

    canUpdate: function () {
        return (this.canvas != null);
    },
    
    open: function (open_flg) {
        if (!this.canOpen(open_flg)) {
            return;
        }

        this.openNoCan(open_flg);

        return;
    },

    openNoCan: function (open_flg) {
        if (open_flg) {
            this.setActiveFlag(true);
        }

        this.openFlag = open_flg;

        this.onOpen();

        this.update(0.0);

        return;
    },

    canOpen: function (open_flg) {
        return (true);
    },

    updateOpen: function () {
        return;
    },

    completeOpen: function () {
        this.openCompleteFlag = this.openFlag;
        
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

    setOpenParameter: function (param) {
        if (param.openType !== undefined) {
            this.openType = param.openType;
        }

        if (param.openContinueFlag !== undefined) {
            this.openContinueFlag = param.openContinueFlag;
        }
        
        return;
    },

    focus: function (focus_flg) {
        if (!this.canFocus(focus_flg)) {
            return;
        }

        this.focusNoCan(focus_flg);

        return;
    },

    focusNoCan: function (focus_flg) {
        this.focusFlag = focus_flg;

        this.onFocus();

        return;
    },

    canFocus: function (focus_flg) {
        return (true);
    },

    canFocusByAllow: function (focus_flg, allow_flg) {
        if (focus_flg) {
            if (!allow_flg) {
                return (false);
            }
        } else {
            if (allow_flg) {
                return (false);
            }
        }

        return (true);
    },
    
    canFocusByDeny: function (focus_flg, deny_flg) {
        if (focus_flg) {
            if (deny_flg) {
                return (false);
            }
        } else {
            if (!deny_flg) {
                return (false);
            }
        }

        return (true);
    },
    
    canFocusByAllowDeny: function (focus_flg, allow_flg, deny_flg) {
        if (focus_flg) {
            if (!allow_flg | deny_flg) {
                return (false);
            }
        } else {
            if (allow_flg & !deny_flg) {
                return (false);
            }
        }

        return (true);
    },

    updateFocus: function () {
        if (this.layer != null) {
            this.layer.updateFocus();
        }

        if ((this.openFlag & this.openCompleteFlag)
        && (this.canOpen(true))) {
            this.focusOpenFlag = true;
        } else {
            this.focusOpenFlag = false;
        }

        if (this.focusFlag) {
            if (this.focusOpenFlag) {
                if (this.layer != null) {
                    if (this.layer.focusOpenFlag) {
                        if (this.layer.focusFlag) {
                            if (!this.canFocus(true)) {
                                this.focus(false);
                            }
                        } else {
                            this.focus(false);
                        }
                    } else {
                        this.focusNoCan(false);
                    }
                } else {
                    if (!this.canFocus(true)) {
                        this.focus(false);
                    }
                }
            } else {
                this.focusNoCan(false);
            }
        } else {
            if (this.focusOpenFlag) {
                if (this.layer != null) {
                    if (this.layer.focusOpenFlag) {
                        if (this.layer.focusFlag) {
                            this.focus(true);
                        }
                    }
                } else {
                    this.focus(true);
                }
            }
        }

        return;
    },

    isControl: function () {
        this.updateFocus();

        return (this.focusFlag);
    },

    setActiveFlag: function (active_flg) {
        this.node.active = active_flg;
        this.openFlag = false;
        this.openCompleteFlag = false;
        this.focusFlag = false;
        this.focusOpenFlag = false;

        for (let layer_i = 0; layer_i < this.layerController.layerArray.length; ++layer_i) {
            let layer = this.layerController.layerArray[layer_i];

            layer.setActiveFlag(false);
        }
        
        return;
    },
    
    setLayerController: function (layer_ary) {
        this.layerController = new LayerController(layer_ary);

        return;
    }
});
