function NodeAction () {
    this.node = null;
    this.tag = 0;

    return;
};

NodeAction.prototype.run = function (node, act, tag) {
    if (this.node != null) {
        this.node.stopActionByTag(this.tag);
    }

    this.node = node;
    this.tag = tag;

    if (this.node == null) {
        return;
    }
    
    this.node.stopActionByTag(this.tag);

    if (act != null) {
        act.setTag(this.tag);
        
        this.node.runAction(act);
    }

    return;
};

NodeAction.prototype.isRun = function () {
    if (this.node == null) {
        return (false);
    }

    return (this.node.getActionByTag(this.tag) != null);
};

module.exports = NodeAction;
