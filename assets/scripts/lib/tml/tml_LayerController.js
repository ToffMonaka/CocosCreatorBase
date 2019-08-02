function LayerController (layer_ary) {
    this.layerArray = layer_ary;

    return;
};

LayerController.prototype.active = function (active_flg) {
    for (let layer_i = 0; layer_i < this.layerArray.length; ++layer_i) {
        this.layerArray[layer_i].node.active = active_flg;
    }

    return;
};

LayerController.prototype.activeByIndex = function (active_flg, index_ary) {
    for (let index_i = 0; index_i < index_ary.length; ++index_i) {
        this.layerArray[index_ary[index_i]].node.active = active_flg;
    }

    return;
};

LayerController.prototype.getActiveFlag = function () {
    let active_flg = false;

    for (let layer_i = 0; layer_i < this.layerArray.length; ++layer_i) {
        active_flg |= this.layerArray[layer_i].node.active;
    }

    return (active_flg);
};

LayerController.prototype.getActiveFlagByIndex = function (index_ary) {
    let active_flg = false;

    for (let index_i = 0; index_i < index_ary.length; ++index_i) {
        active_flg |= this.layerArray[index_ary[index_i]].node.active;
    }

    return (active_flg);
};

LayerController.prototype.open = function (open_flg) {
    for (let layer_i = 0; layer_i < this.layerArray.length; ++layer_i) {
        this.layerArray[layer_i].open(open_flg);
    }

    return;
};

LayerController.prototype.openByIndex = function (open_flg, index_ary) {
    for (let index_i = 0; index_i < index_ary.length; ++index_i) {
        this.layerArray[index_ary[index_i]].open(open_flg);
    }

    return;
};

LayerController.prototype.getOpenFlag = function () {
    let open_flg = false;

    for (let layer_i = 0; layer_i < this.layerArray.length; ++layer_i) {
        open_flg |= this.layerArray[layer_i].openFlag;
    }

    return (open_flg);
};

LayerController.prototype.getOpenFlagByIndex = function (index_ary) {
    let open_flg = false;

    for (let index_i = 0; index_i < index_ary.length; ++index_i) {
        open_flg |= this.layerArray[index_ary[index_i]].openFlag;
    }

    return (open_flg);
};

LayerController.prototype.focus = function (focus_flg) {
    for (let layer_i = 0; layer_i < this.layerArray.length; ++layer_i) {
        this.layerArray[layer_i].focus(focus_flg);
    }

    return;
};

LayerController.prototype.focusByIndex = function (focus_flg, index_ary) {
    for (let index_i = 0; index_i < index_ary.length; ++index_i) {
        this.layerArray[index_ary[index_i]].focus(focus_flg);
    }

    return;
};

LayerController.prototype.getFocusFlag = function () {
    let focus_flg = false;

    for (let layer_i = 0; layer_i < this.layerArray.length; ++layer_i) {
        focus_flg |= this.layerArray[layer_i].focusFlag;
    }

    return (focus_flg);
};

LayerController.prototype.getFocusFlagByIndex = function (index_ary) {
    let focus_flg = false;

    for (let index_i = 0; index_i < index_ary.length; ++index_i) {
        focus_flg |= this.layerArray[index_ary[index_i]].focusFlag;
    }

    return (focus_flg);
};

module.exports = LayerController;
