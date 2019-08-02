var ConstantUtil = require('ConstantUtil');
var OptionStorage = require('OptionStorage');

function CanvasStorage () {
    this.system = null;
    this.createUpdateCount = -1;
    this.createCompleteFlag = false;

    this.optionStorage = null;

    return;
};

CanvasStorage.prototype.create = function (desc) {
    this.system = desc.system;
    this.createUpdateCount = 0;
    this.createCompleteFlag = false;

    this.optionStorage = new OptionStorage();

    return;
};

CanvasStorage.prototype.updateCreate = function () {
    if (this.createUpdateCount >= 0) {
        if (this.createUpdateCount == 0) {
            this.optionStorage.create({storage: this, dataName: ConstantUtil.CANVAS_SYSTEM.OPTION_DATA_NAME});
    
            this.recoverStorage();
    
            this.createUpdateCount = -1;
            this.createCompleteFlag = true;
        }
    }

    return;
};

CanvasStorage.prototype.isCreateComplete = function () {
    return (this.createCompleteFlag);
};

CanvasStorage.prototype.recoverStorage = function () {
    return;
};

module.exports = CanvasStorage;
