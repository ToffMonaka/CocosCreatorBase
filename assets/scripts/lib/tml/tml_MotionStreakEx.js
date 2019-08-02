function MotionStreakEx (anm) {
    this.motionStreak = anm;

    if (this.motionStreak != null) {
        this.motionStreak.enabled = false;
    }

    this.playFlag = false;
    this.playedFlag = false;

    return;
};

MotionStreakEx.prototype.update = function (pos) {
    if ((this.motionStreak == null)
    || (!this.motionStreak.node.activeInHierarchy)) {
        return;
    }

    if (this.playedFlag) {
        this.motionStreak.node.setPosition(pos);
    } else if (this.playFlag) {
        this.motionStreak.enabled = true;
        this.motionStreak.node.setPosition(pos);
        this.motionStreak.reset();

        this.playedFlag = true;
    }

    return;
};

MotionStreakEx.prototype.play = function (pos) {
    if (this.motionStreak == null) {
        return;
    }
    
    this.playFlag = true;
    this.playedFlag = false;

    this.update(pos);

    return;
};

MotionStreakEx.prototype.stop = function () {
    if (this.motionStreak == null) {
        return;
    }

    this.playFlag = false;

    if (this.playedFlag) {
        this.motionStreak.reset();
        this.motionStreak.enabled = false;
    }

    this.playedFlag = false;
    
    return;
};

module.exports = MotionStreakEx;
