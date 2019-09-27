var NodeUtil = require('tml_NodeUtil');

function ScrollBarEx (scroll_view, scroll_bar, handle_min_size) {
    this.scrollView = scroll_view;
    this.scrollBar = scroll_bar;
    this.scrollBar.enabled = true;
    this.focusFlag = true;
    this.handleMinSize = handle_min_size;

    return;
};

ScrollBarEx.prototype.update = function () {
    switch (this.scrollBar.direction) {
    case cc.Scrollbar.Direction.HORIZONTAL: {
        let content = this.scrollView.content;
        let content_mv_rng = content.width - content.parent.width;
        let content_mv_x = content.x - (content.parent.width * 0.5);
        let handle = this.scrollBar.handle.node;
        let handle_width = handle.parent.width;
        let handle_mv_rng = 0;
        let handle_mv_x = 0;

        if (content_mv_rng > 0) {
            if (content_mv_x < 0) {
                handle_width = Math.max(Math.ceil(handle.parent.width * (content.parent.width / content.width) + content_mv_x), this.handleMinSize);
            } else if (content_mv_x > content_mv_rng) {
                handle_width = Math.max(Math.ceil(handle.parent.width * (content.parent.width / content.width) + (content_mv_rng - content_mv_x)), this.handleMinSize);
            } else {
                handle_width = Math.max(Math.ceil(handle.parent.width * (content.parent.width / content.width)), this.handleMinSize);
            }

            handle_mv_rng = handle.parent.width - handle_width;
            handle_mv_x = Math.clamp_TML(content_mv_x * (handle_mv_rng / content_mv_rng), 0, handle_mv_rng);
        }

        handle.x = -handle_mv_x;
        handle.width = handle_width;

        break;
    }
    case cc.Scrollbar.Direction.VERTICAL: {
        let content = this.scrollView.content;
        let content_mv_rng = content.height - content.parent.height;
        let content_mv_y = content.y - (content.parent.height * 0.5);
        let handle = this.scrollBar.handle.node;
        let handle_height = handle.parent.height;
        let handle_mv_rng = 0;
        let handle_mv_y = 0;

        if (content_mv_rng > 0) {
            if (content_mv_y < 0) {
                handle_height = Math.max(Math.ceil(handle.parent.height * (content.parent.height / content.height) + content_mv_y), this.handleMinSize);
            } else if (content_mv_y > content_mv_rng) {
                handle_height = Math.max(Math.ceil(handle.parent.height * (content.parent.height / content.height) + (content_mv_rng - content_mv_y)), this.handleMinSize);
            } else {
                handle_height = Math.max(Math.ceil(handle.parent.height * (content.parent.height / content.height)), this.handleMinSize);
            }

            handle_mv_rng = handle.parent.height - handle_height;
            handle_mv_y = Math.clamp_TML(content_mv_y * (handle_mv_rng / content_mv_rng), 0, handle_mv_rng);
        }

        handle.y = -handle_mv_y;
        handle.height = handle_height;

        break;
    }
    }

    return;
};

ScrollBarEx.prototype.focus = function (focus_flg) {
    this.focusFlag = focus_flg;

    this.scrollBar.enabled = this.focusFlag;

    return;
};

ScrollBarEx.prototype.setEvent = function (node) {
    if (node === undefined) {
        this.setStartEvent(this.scrollBar.handle.node);
        this.setMoveEvent(this.scrollBar.handle.node);
    } else {
        this.setStartEvent(node);
        this.setMoveEvent(node);
    }

    return;
};

ScrollBarEx.prototype.setStartEvent = function (node) {
    NodeUtil.setEvent(node, cc.Node.EventType.TOUCH_START, this.onStartEvent, this);

    return;
};

ScrollBarEx.prototype.setMoveEvent = function (node) {
    NodeUtil.setEvent(node, cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent, this);
    
    return;
};

ScrollBarEx.prototype.onStartEvent = function (event) {
    if (!this.focusFlag) {
        return;
    }

    this.scrollView.stopAutoScroll();
    
    return;
};

ScrollBarEx.prototype.onMoveEvent = function (event) {
    if (!this.focusFlag) {
        return;
    }

    switch (this.scrollBar.direction) {
    case cc.Scrollbar.Direction.HORIZONTAL: {
        let content = this.scrollView.content;
        let content_mv_rng = 0;
        let content_mv_x = 0;
        let handle = this.scrollBar.handle.node;
        let handle_mv_rng = handle.parent.width - handle.width;

        if (handle_mv_rng > 0) {
            content_mv_rng = content.width - content.parent.width;
            content_mv_x = Math.clamp_TML((content.x - (content.parent.width * 0.5)) + (-event.getDeltaX() * (content_mv_rng / handle_mv_rng)), 0, content_mv_rng);
        }

        this.scrollView.stopAutoScroll();
        this.scrollView.scrollToOffset(cc.v2(0, content_mv_x));

        break;
    }
    case cc.Scrollbar.Direction.VERTICAL: {
        let content = this.scrollView.content;
        let content_mv_rng = 0;
        let content_mv_y = 0;
        let handle = this.scrollBar.handle.node;
        let handle_mv_rng = handle.parent.height - handle.height;

        if (handle_mv_rng > 0) {
            content_mv_rng = content.height - content.parent.height;
            content_mv_y = Math.clamp_TML((content.y - (content.parent.height * 0.5)) + (-event.getDeltaY() * (content_mv_rng / handle_mv_rng)), 0, content_mv_rng);
        }

        this.scrollView.stopAutoScroll();
        this.scrollView.scrollToOffset(cc.v2(0, content_mv_y));

        break;
    }
    }

    return;
};

module.exports = ScrollBarEx;
