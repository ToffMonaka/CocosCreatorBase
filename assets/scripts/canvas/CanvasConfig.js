var StorageUtil = require('tml_StorageUtil');
var ConstantUtil = require('ConstantUtil');

function CanvasConfigData () {
    this.languageType = ConstantUtil.CANVAS_CONFIG.LANGUAGE_TYPE.NONE;

    if (cc.sys.language == cc.sys.LANGUAGE_JAPANESE) {
        this.languageType = ConstantUtil.CANVAS_CONFIG.LANGUAGE_TYPE.JAPANESE;
    } else {
        this.languageType = ConstantUtil.CANVAS_CONFIG.LANGUAGE_TYPE.ENGLISH;
    }

    return;
};

CanvasConfigData.prototype.setLanguageType = function (lang_type) {
    this.languageType = lang_type;

    return;
};

function CanvasConfig () {
    this.system = null;
    this.dataName = '';
    this.data = null;
    
    return;
};

CanvasConfig.prototype.create = function (desc) {
    this.system = desc.system;
    this.dataName = desc.dataName;
    
    this.loadData();

    return;
};

CanvasConfig.prototype.saveData = function () {
    let a_str = '';

    a_str += '0/a' + this.data.languageType;

    cc.sys.localStorage.setItem(this.dataName, a_str);

    return;
};

CanvasConfig.prototype.loadData = function () {
    this.data = new CanvasConfigData();
    
    do {
        let a_str = cc.sys.localStorage.getItem(this.dataName);
        
        if ((a_str === null)
        || (a_str.length <= 0)) {
            cc.log('CanvasConfig.loadData: data=Empty');

            break;
        }

        cc.log('CanvasConfig.loadData: data=' + a_str);

        let dat = this.data;

        let a_split1_str_ary = a_str.split('/A');

        for (let a_split1_str_i = 0; a_split1_str_i < a_split1_str_ary.length; ++a_split1_str_i) {
            let a_split1_str = a_split1_str_ary[a_split1_str_i];
            
            if (a_split1_str.length <= 0) {
                continue;
            }
                
            let a_split2_str_ary = a_split1_str.split('/a');

            if (a_split2_str_ary.length != 2) {
                continue;
            }

            switch (a_split2_str_ary[0]) {
            case '0': {
                dat.setLanguageType(Number(a_split2_str_ary[1]));
                
                break;
            }
            }
        }
    } while (false);

    this.recoverData();
    
    return;
};

CanvasConfig.prototype.deleteData = function () {
    this.data = new CanvasConfigData();

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

CanvasConfig.prototype.recoverData = function () {
    return;
};

CanvasConfig.prototype.getNewData = function () {
    return (new CanvasConfigData());
};

module.exports = CanvasConfig;
