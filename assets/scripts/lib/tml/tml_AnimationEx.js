function AnimationEx (anm) {
    this.animation = anm;

    if (this.animation != null) {
        this.animation.enabled = false;
    }
    
    this.playFlag = false;
    this.playedFlag = false;

    return;
};

AnimationEx.prototype.update = function () {
    if ((this.animation == null)
    || (!this.animation.node.activeInHierarchy)) {
        return;
    }

    if (this.playedFlag) {
    } else if (this.playFlag) {
        this.animation.enabled = true;
        this.animation.play(undefined, 0.0);

        this.playedFlag = true;
    }

    return;
};

AnimationEx.prototype.play = function () {
    if (this.animation == null) {
        return;
    }
    
    this.playFlag = true;
    this.playedFlag = false;

    this.update();

    return;
};

AnimationEx.prototype.stop = function () {
    if (this.animation == null) {
        return;
    }

    this.playFlag = false;

    if (this.playedFlag) {
        this.animation.setCurrentTime(0);
        this.animation.stop();
        this.animation.enabled = false;
    }

    this.playedFlag = false;
    
    return;
};

AnimationEx.prototype.pause = function () {
    if (this.animation == null) {
        return;
    }
    
    if (this.playedFlag) {
        this.animation.pause();
    }

    return;
};

AnimationEx.prototype.resume = function () {
    if (this.animation == null) {
        return;
    }
    
    if (this.playedFlag) {
        this.animation.resume();
    }

    return;
};

module.exports = AnimationEx;
