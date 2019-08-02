var ConstantUtil = require('ConstantUtil');
var MasterStringTable = require('MasterStringTable');

function CanvasDB () {
    this.system = null;
    this.createUpdateCount = -1;
    this.createCompleteFlag = false;

    this.masterStringTable = null;

    return;
};

CanvasDB.prototype.create = function (desc) {
    this.system = desc.system;
    this.createUpdateCount = 0;
    this.createCompleteFlag = false;

    this.masterStringTable = new MasterStringTable();

    return;
};

CanvasDB.prototype.updateCreate = function () {
    if (this.createUpdateCount >= 0) {
        if (this.createUpdateCount == 0) {
            switch (this.system.config.data.languageType) {
            case ConstantUtil.CANVAS_CONFIG.LANGUAGE_TYPE.ENGLISH: {
                this.masterStringTable.create({db: this, filePath: ConstantUtil.MASTER.STRING_EN_TABLE_FILE_PATH});
        
                break;
            }
            case ConstantUtil.CANVAS_CONFIG.LANGUAGE_TYPE.JAPANESE: {
                this.masterStringTable.create({db: this, filePath: ConstantUtil.MASTER.STRING_JP_TABLE_FILE_PATH});
        
                break;
            }
            }

            this.createUpdateCount = 1;
        } else if (this.createUpdateCount == 1) {
            if (this.masterStringTable.isLoadComplete()) {
                this.createUpdateCount = -1;
                this.createCompleteFlag = true;
            }
        }
    }

    return;
};

CanvasDB.prototype.isCreateComplete = function () {
    return (this.createCompleteFlag);
};

module.exports = CanvasDB;
