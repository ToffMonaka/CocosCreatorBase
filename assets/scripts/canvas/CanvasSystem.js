var ConstantUtil = require('ConstantUtil');
var CanvasConfig = require('CanvasConfig');
var CanvasStorage = require('CanvasStorage');
var CanvasDB = require('CanvasDB');

function CanvasSystem () {
    this.createUpdateCount = -1;
    this.createCompleteFlag = false;

    this.config = null;
    this.storage = null;
    this.db = null;

    return;
};

CanvasSystem.prototype.create = function (desc) {
    this.createUpdateCount = 0;
    this.createCompleteFlag = false;

    this.config = new CanvasConfig();
    this.storage = new CanvasStorage();
    this.db = new CanvasDB();

    this.config.create({system: this, dataName: ConstantUtil.CANVAS_SYSTEM.CONFIG_DATA_NAME});

    return;
};

CanvasSystem.prototype.updateCreate = function () {
    if (this.createUpdateCount >= 0) {
        if (this.createUpdateCount == 0) {
            this.storage.create({system: this});

            this.createUpdateCount = 1;
        } else if (this.createUpdateCount == 1) {
            this.storage.updateCreate();

            if (this.storage.isCreateComplete()) {
                this.createUpdateCount = 2;
            }
        } else if (this.createUpdateCount == 2) {
            this.db.create({system: this});

            this.createUpdateCount = 3;
        } else if (this.createUpdateCount == 3) {
            this.db.updateCreate();

            if (this.db.isCreateComplete()) {
                this.createUpdateCount = -1;
                this.createCompleteFlag = true;
            }
        }
    }

    return;
};

CanvasSystem.prototype.isCreateComplete = function () {
    return (this.createCompleteFlag);
};

module.exports = CanvasSystem;
