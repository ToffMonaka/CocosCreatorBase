var NodeUtil = require('tml_NodeUtil');

function ScrollViewEx (scroll_view, threshold_size) {
    this.scrollView = scroll_view;
    this.scrollView.enabled = true;
    this.focusFlag = true;
    this.thresholdFlag = false;
    this.thresholdPosition = cc.Vec2.ZERO;
    this.thresholdSize = threshold_size;

    return;
};

ScrollViewEx.prototype.update = function () {
    return;
};

ScrollViewEx.prototype.focus = function (focus_flg) {
    this.focusFlag = focus_flg;

    this.scrollView.enabled = this.focusFlag;
    this.scrollView.stopAutoScroll();
    
    return;
};

ScrollViewEx.prototype.isControl = function () {
    return (this.thresholdFlag);
};

ScrollViewEx.prototype.readyScroll = function () {
    this.scrollView.enabled = this.focusFlag;
    this.scrollView.stopAutoScroll();
    
    return;
};

ScrollViewEx.prototype.setEvent = function (node) {
    if (node === undefined) {
        this.setStartEvent(this.scrollView.content);
        this.setMoveEvent(this.scrollView.content);
    } else {
        this.setStartEvent(node);
        this.setMoveEvent(node);
    }

    return;
};

ScrollViewEx.prototype.setStartEvent = function (node) {
    NodeUtil.setEvent(node, cc.Node.EventType.TOUCH_START, this.onStartEvent, this);

    return;
};

ScrollViewEx.prototype.setMoveEvent = function (node) {
    NodeUtil.setEvent(node, cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent, this);
    
    return;
};

ScrollViewEx.prototype.onStartEvent = function (event) {
    if (!this.focusFlag) {
        return;
    }
    
    let event_pos = event.target.convertToNodeSpace(event.getLocation());

    this.thresholdPosition = event_pos;

    this.thresholdFlag = true;
    this.scrollView.enabled = false;

    return;
};

ScrollViewEx.prototype.onMoveEvent = function (event) {
    if (!this.focusFlag) {
        return;
    }

    if (this.thresholdFlag) {
        let event_pos = event.target.convertToNodeSpace(event.getLocation());
        let disp_pos = event_pos.sub(this.thresholdPosition);
        
        if ((cc.pLength(disp_pos) * this.scrollView.content.scale) >= this.thresholdSize) {
            this.thresholdFlag = false;
            this.scrollView.enabled = true;
        }
    }

    return;
};

module.exports = ScrollViewEx;
