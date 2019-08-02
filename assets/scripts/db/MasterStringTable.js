var FileUtil = require('tml_FileUtil');
var ConstantUtil = require('ConstantUtil');

function MasterStringTable () {
    this.system = null;
    this.db = null;
    this.recordArray = null;
    this.recordArrayWithID = null;
    this.loadCompleteFlag = false;
    this.csvFile = FileUtil.getCSVFile('', null);

    return;
};

MasterStringTable.prototype.create = function (desc) {
    this.system = desc.db.system;
    this.db = desc.db;
    this.recordArray = [];
    this.recordArrayWithID = [];
    this.loadCompleteFlag = false;

    this.csvFile.create({filePath: desc.filePath, loadCompleteCallback: this.load.bind(this)});

    return;
};

MasterStringTable.prototype.load = function (csv_file) {
    this.recordArray = [];
    this.recordArrayWithID = [];

    for (let val_ary_i = 0; val_ary_i < csv_file.getValueArray().length; ++val_ary_i) {
        let val_ary = csv_file.getValueArray()[val_ary_i];

        let rec = {
            id: Number(val_ary[0]),
            string: val_ary[1]
        };

        this.recordArray.push(rec);
        this.recordArrayWithID[rec.id] = rec;
    }

    this.recordArrayWithID.setUndefined_TML(null);

    this.loadCompleteFlag = true;

    return;
};

MasterStringTable.prototype.isLoadComplete = function () {
    return (this.loadCompleteFlag);
};

MasterStringTable.prototype.getRecord = function (index) {
    return (this.recordArray[index]);
};

MasterStringTable.prototype.getRecordArray = function () {
    return (this.recordArray);
};

MasterStringTable.prototype.getRecordWithID = function (mst_id) {
    return (this.recordArrayWithID[mst_id]);
};

MasterStringTable.prototype.getRecordArrayWithID = function () {
    return (this.recordArrayWithID);
};

module.exports = MasterStringTable;
