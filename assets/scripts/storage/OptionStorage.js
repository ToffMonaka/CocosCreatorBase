var StorageUtil = require('tml_StorageUtil');
var ConstantUtil = require('ConstantUtil');

function OptionStorageData () {
    this.soundBGMMuteFlag = false;
    this.soundBGMVolume = 1.0;
    this.soundSEMuteFlag = false;
    this.soundSEVolume = 1.0;
    this.stageLifeGameFlag = true;

    return;
};

OptionStorageData.prototype.setSoundBGMMuteFlag = function (mute_flg) {
    this.soundBGMMuteFlag = mute_flg;

    return;
};

OptionStorageData.prototype.setSoundBGMVolume = function (volume) {
    this.soundBGMVolume = volume;

    return;
};

OptionStorageData.prototype.setSoundSEMuteFlag = function (mute_flg) {
    this.soundSEMuteFlag = mute_flg;

    return;
};

OptionStorageData.prototype.setSoundSEVolume = function (volume) {
    this.soundSEVolume = volume;

    return;
};

OptionStorageData.prototype.setStageLifeGameFlag = function (life_game_flg) {
    this.stageLifeGameFlag = life_game_flg;

    return;
};

function OptionStorage () {
    this.system = null;
    this.storage = null;
    this.dataName = '';
    this.data = null;
    
    return;
};

OptionStorage.prototype.create = function (desc) {
    this.system = desc.storage.system;
    this.storage = desc.storage;
    this.dataName = desc.dataName;
    
    this.loadData();

    return;
};

OptionStorage.prototype.saveData = function () {
    let a_str = '';

    a_str += '0/a' + ((this.data.soundBGMMuteFlag) ? '1' : '0') +
            '/A1/a' + this.data.soundBGMVolume.toFixed(1) +
            '/A2/a' + ((this.data.soundSEMuteFlag) ? '1' : '0') +
            '/A3/a' + this.data.soundSEVolume.toFixed(1) +
            '/A4/a' + ((this.data.stageLifeGameFlag) ? '1' : '0');

    cc.sys.localStorage.setItem(this.dataName, a_str);

    return;
};

OptionStorage.prototype.loadData = function () {
    this.data = new OptionStorageData();
    
    do {
        let a_str = cc.sys.localStorage.getItem(this.dataName);
        
        if ((a_str === null)
        || (a_str.length <= 0)) {
            cc.log('OptionStorage.loadData: data=Empty');

            break;
        }

        cc.log('OptionStorage.loadData: data=' + a_str);

        let dat = this.data;

        let a_split2_str_ary = a_str.split('/A');

        for (let a_split2_str_i = 0; a_split2_str_i < a_split2_str_ary.length; ++a_split2_str_i) {
            let a_split2_str = a_split2_str_ary[a_split2_str_i];
            
            if (a_split2_str.length <= 0) {
                continue;
            }
                
            let a_split3_str_ary = a_split2_str.split('/a');

            if (a_split3_str_ary.length != 2) {
                continue;
            }

            switch (a_split3_str_ary[0]) {
            case '0': {
                dat.setSoundBGMMuteFlag(a_split3_str_ary[1] == '1');
                
                break;
            }
            case '1': {
                dat.setSoundBGMVolume(Number(a_split3_str_ary[1]));
                
                break;
            }
            case '2': {
                dat.setSoundSEMuteFlag(a_split3_str_ary[1] == '1');

                break;
            }
            case '3': {
                dat.setSoundSEVolume(Number(a_split3_str_ary[1]));
                
                break;
            }
            case '4': {
                dat.setStageLifeGameFlag(a_split3_str_ary[1] == '1');

                break;
            }
            }
        }
    } while (false);

    this.recoverData();

    return;
};

OptionStorage.prototype.deleteData = function () {
    this.data = new OptionStorageData();

    do {
        let a_str = cc.sys.localStorage.getItem(this.dataName);

        if ((a_str === null)
        || (a_str.length <= 0)) {
            break;
        }

        cc.sys.localStorage.setItem(this.dataName, '');
    } while (false);

    this.recoverData();

    return;
};

OptionStorage.prototype.recoverData = function () {
    return;
};

OptionStorage.prototype.getNewData = function () {
    return (new OptionStorageData());
};

module.exports = OptionStorage;
