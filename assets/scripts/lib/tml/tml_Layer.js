var NodeAction = require('tml_NodeAction');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        parentLayer: {default: null, serializable: false, visible: false},
        childLayerArray: {default: [], serializable: false, visible: false},
        openFlag: {default: false, visible: false},
        openAction: {default: null, visible: false},
        openAutoFlag: {default: true, visible: false},
        openCompleteFlag: {default: false, visible: false},
        openCompleteCallback: {default: null, visible: false},
        openCompleteCallbackOnceFlag: {default: false, visible: false},
        openType: {default: 0, visible: false},
        openContinueFlag: {default: false, visible: false},
        openLockType: {default: 0, visible: false},
        focusFlag: {default: false, visible: false},
        focusOpenFlag: {default: false, visible: false},
        focusLockType: {default: 0, visible: false}
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

    ready: function () {
        this.onReady();
        
        return;
    },
    
    create: function (desc) {
        if (this.canvas != null) {
            return (-1);
        }

        this.canvas = (desc.canvas === undefined) ? desc.parentLayer.canvas : desc.canvas;
        this.parentLayer = (desc.parentLayer === undefined) ? null : desc.parentLayer;
        this.childLayerArray = [];
        this.openAction = new NodeAction();
        this.openAutoFlag = desc.openAutoFlag;

        let create_res = this.onCreate(desc);

        if (create_res < 0) {
            this.canvas = null;

            this.setActiveFlag(false);

            return (create_res);
        }

        if (this.parentLayer != null) {
            this.parentLayer.childLayerArray.push(this);
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
        if (this.canvas == null) {
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

        for (let layer_i = 0; layer_i < this.childLayerArray.length; ++layer_i) {
            let layer = this.childLayerArray[layer_i];

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
        if (this.openLockType != 0) {
            if (open_flg) {
                return (this.openLockType == 1);
            } else {
                return (this.openLockType == 2);
            }
        }

        return (this.onCanOpen(open_flg));
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

    setOpenLockType: function (open_lock_type) {
        this.openLockType = open_lock_type;

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
        if (this.focusLockType != 0) {
            if (focus_flg) {
                return (this.focusLockType == 1);
            } else {
                return (this.focusLockType == 2);
            }
        }

        return (this.onCanFocus(focus_flg));
    },

    canFocusByAllow: function (focus_flg, allow_flg) {
        if (focus_flg) {
            return (!(!allow_flg));
        } else {
            return (!(allow_flg));
        }
    },
    
    canFocusByDeny: function (focus_flg, deny_flg) {
        if (focus_flg) {
            return (!(deny_flg));
        } else {
            return (!(!deny_flg));
        }
    },
    
    canFocusByAllowDeny: function (focus_flg, allow_flg, deny_flg) {
        if (focus_flg) {
            return (!(!allow_flg | deny_flg));
        } else {
            return (!(allow_flg & !deny_flg));
        }
    },

    updateFocus: function () {
        if (this.parentLayer != null) {
            this.parentLayer.updateFocus();
        }

        if ((this.openFlag & this.openCompleteFlag)
        && (this.canOpen(true))) {
            this.focusOpenFlag = true;
        } else {
            this.focusOpenFlag = false;
        }

        if (this.focusFlag) {
            if (this.focusOpenFlag) {
                if (this.parentLayer != null) {
                    if (this.parentLayer.focusOpenFlag) {
                        if (this.parentLayer.focusFlag) {
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
                if (this.parentLayer != null) {
                    if (this.parentLayer.focusOpenFlag) {
                        if (this.parentLayer.focusFlag) {
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

    setFocusLockType: function (focus_lock_type) {
        this.focusLockType = focus_lock_type;

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

        for (let layer_i = 0; layer_i < this.childLayerArray.length; ++layer_i) {
            let layer = this.childLayerArray[layer_i];

            layer.setActiveFlag(false);
        }
        
        return;
    }
});
