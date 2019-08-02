var NodeUtil = require('tml_NodeUtil');

function ScrollViewEx (scroll_view, threshold) {
    this.scrollView = scroll_view;

    if (this.scrollView != null) {
        this.scrollView.enabled = true;
    }
    
    this.focusFlag = true;
    this.controlFlag = false;
    this.threshold = threshold;
    this.thresholdPosition = cc.Vec2.ZERO;

    return;
};

ScrollViewEx.prototype.update = function () {
    if (this.scrollView == null) {
        return;
    }

    return;
};

ScrollViewEx.prototype.focus = function (focus_flg) {
    if (this.scrollView == null) {
        return;
    }
    
    this.focusFlag = focus_flg;

    this.scrollView.enabled = this.focusFlag;
    this.scrollView.stopAutoScroll();
    
    return;
};

ScrollViewEx.prototype.isControl = function () {
    return (this.controlFlag);
};

ScrollViewEx.prototype.readyScroll = function () {
    if (this.scrollView == null) {
        return;
    }
    
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
    if (this.scrollView == null) {
        return;
    }
    
    NodeUtil.setEvent(node, cc.Node.EventType.TOUCH_START, this.onStartEvent, this);

    return;
};

ScrollViewEx.prototype.setMoveEvent = function (node) {
    if (this.scrollView == null) {
        return;
    }
    
    NodeUtil.setEvent(node, cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent, this);
    
    return;
};

ScrollViewEx.prototype.onStartEvent = function (event) {
    if (!this.focusFlag) {
        return;
    }
    
    let event_pos = event.target.convertToNodeSpace(event.getLocation());

    this.thresholdPosition = event_pos;

    this.controlFlag = true;
    this.scrollView.enabled = false;

    return;
};

ScrollViewEx.prototype.onMoveEvent = function (event) {
    if (!this.focusFlag) {
        return;
    }

    if (this.controlFlag) {
        let event_pos = event.target.convertToNodeSpace(event.getLocation());
        let disp_pos = event_pos.sub(this.thresholdPosition);
        
        if ((cc.pLength(disp_pos) * this.scrollView.content.scale) >= this.threshold) {
            this.controlFlag = false;
            this.scrollView.enabled = true;
        }
    }

    return;
};

module.exports = ScrollViewEx;
