function getCSVFile(file_path, load_complete_callback) {
    let csv_file = {
        filePath: '',
        valueArray: null,
        loadCompleteFlag: false,
        loadCompleteCallback: null,
        create: function (desc) {
            let file_path_old = desc.filePath;

            this.filePath = desc.filePath;
            this.valueArray = [];
            this.loadCompleteFlag = false;
            this.loadCompleteCallback = desc.loadCompleteCallback;

            if (this.filePath.length <= 0) {
                this.valueArray = [];
                
                this.loadCompleteFlag = true;

                if (this.loadCompleteCallback != null) {
                    this.loadCompleteCallback(this);
                }
            } else {
                cc.loader.loadRes(this.filePath,
                    (err, dat) => {
                        if (this.filePath != file_path_old) {
                            return;
                        }

                        if (err) {
                            cc.error(err.message || err);

                            this.valueArray = [];

                            this.loadCompleteFlag = true;

                            if (this.loadCompleteCallback != null) {
                                this.loadCompleteCallback(this);
                            }
            
                            return;
                        }

                        this.load(dat);

                        return;
                    }
                );
            }

            return (0);
        },
        load: function (dat) {
            let comment_str = "#";
            let comment_str_index = -1;
            let dq_str = "\"";
            let dq_str_index = -1;
            let dq_str_sub_index = -1;
            let dq_str_cnt = 0;
            let double_dq_str = "\"\"";
            let double_dq_str_index = -1;
            let space_str = " ";
            let split_str = ",";
            let split_str_index = -1;
            let needless_str = "\\s|　";
            let needless_pattern = new RegExp("^[" + needless_str + "]+|[" + needless_str + "]+$", "g");
            let line_feed_str = "\r\n";
            let column_val_ary = null;
            let column_cnt = 0;

            this.valueArray = [];

            let txt_str_ary = dat.split(line_feed_str);

            for (let txt_str_i = 0; txt_str_i < txt_str_ary.length; ++txt_str_i) {
                let txt_str = txt_str_ary[txt_str_i];

                if (txt_str.length <= 0) {
                    continue;
                }

                {// コメント削除
                    dq_str_index = 0;
                    dq_str_sub_index = 0;
                    dq_str_cnt = 0;

                    comment_str_index = txt_str.indexOf(comment_str);

                    while (comment_str_index != -1) {
                        dq_str_index = txt_str.indexOf(dq_str, dq_str_sub_index);

                        while (dq_str_index != -1) {
                            if (dq_str_index >= comment_str_index) {
                                break;
                            }

                            ++dq_str_cnt;

                            dq_str_sub_index = dq_str_index + dq_str.length;

                            dq_str_index = txt_str.indexOf(dq_str, dq_str_index + dq_str.length);
                        }

                        if ((dq_str_cnt & 1) == 0) {
                            txt_str = txt_str.slice(0, comment_str_index);

                            break;
                        } else {
                            dq_str_sub_index = comment_str_index + comment_str.length;

                            comment_str_index = txt_str.indexOf(comment_str, comment_str_index + comment_str.length);
                        }
                    }
                }

                if (txt_str.length <= 0) {
                    continue;
                }

                {// ｢,｣を改行文字列に変換
                    dq_str_index = 0;
                    dq_str_sub_index = 0;
                    dq_str_cnt = 0;

                    split_str_index = txt_str.indexOf(split_str);

                    while (split_str_index != -1) {
                        dq_str_index = txt_str.indexOf(dq_str, dq_str_sub_index);

                        while (dq_str_index != -1) {
                            if (dq_str_index >= split_str_index) {
                                break;
                            }

                            ++dq_str_cnt;

                            dq_str_index = txt_str.indexOf(dq_str, dq_str_index + dq_str.length);
                        }

                        if ((dq_str_cnt & 1) == 0) {
                            txt_str = txt_str.slice(0, split_str_index) + line_feed_str + txt_str.slice(split_str_index + split_str.length);

                            dq_str_sub_index = split_str_index + line_feed_str.length;

                            split_str_index = txt_str.indexOf(split_str, split_str_index + line_feed_str.length);
                        } else {
                            dq_str_sub_index = split_str_index + split_str.length;

                            split_str_index = txt_str.indexOf(split_str, split_str_index + split_str.length);
                        }
                    }
                }

                column_val_ary = txt_str.split(line_feed_str);

                for (let column_val_i = 0; column_val_i < column_val_ary.length; ++column_val_i) {
                    let column_val = column_val_ary[column_val_i];
    
                    {// ｢""｣を｢"｣に変換
                        double_dq_str_index = column_val.indexOf(double_dq_str);
    
                        while (double_dq_str_index != -1) {
                            column_val = column_val.slice(0, double_dq_str_index) + dq_str + column_val.slice(double_dq_str_index + double_dq_str.length);

                            double_dq_str_index = column_val.indexOf(double_dq_str, double_dq_str_index + dq_str.length);
                        }
                    }

                    {// 先頭の｢"｣を削除
                        dq_str_index = column_val.indexOf(dq_str);
    
                        if (dq_str_index != -1) {
                            column_val = column_val.slice(dq_str_index + dq_str.length);
                        }
                    }
    
                    {// 末尾の｢"｣を削除
                        dq_str_index = column_val.lastIndexOf(dq_str);
    
                        if (dq_str_index != -1) {
                            column_val = column_val.slice(0, dq_str_index);
                        }
                    }

                    column_val_ary[column_val_i] = column_val.replace(needless_pattern, '');
                }
    
                if (column_val_ary.length < column_cnt) {
                    while (column_val_ary.length < column_cnt) {
                        column_val_ary.push("");
                    }
                } else if (column_val_ary.length > column_cnt) {
                    column_cnt = column_val_ary.length;
    
                    for (let val_i = 0; val_i < this.valueArray.length; ++val_i) {
                        while (this.valueArray[val_i].length < column_cnt) {
                            this.valueArray[val_i].push("");
                        }
                    }
                }

                this.valueArray.push(column_val_ary);
            }

            this.loadCompleteFlag = true;

            if (this.loadCompleteCallback != null) {
                this.loadCompleteCallback(this);
            }

            return;
        },
        getFilePath: function () {
            return (this.filePath);
        },
        isLoadComplete: function () {
            return (this.loadCompleteFlag);
        },
        getValue: function (row_index, column_index) {
            if (row_index >= this.valueArray.length) {
                return (null);
            }
        
            if (column_index >= this.valueArray[row_index].length) {
                return (null);
            }
        
            return (this.valueArray[row_index][column_index]);
        },
        getValueArray: function () {
            return (this.valueArray);
        },
        showValue: function () {
            cc.log('FileUtil.getCSVFile.showValue start: ');

            for (let val_i = 0; val_i < this.valueArray.length; ++val_i) {
                for (let val_j = 0; val_j < this.valueArray[val_i].length; ++val_j) {
                    cc.log('value[' + val_i + '][' + val_j + ']=' + this.valueArray[val_i][val_j]);
                }
            }

            cc.log('FileUtil.getCSVFile.showValue end: ');

            return;
        }
    };

    csv_file.create({filePath: file_path, loadCompleteCallback: load_complete_callback});

    return (csv_file);
};

module.exports = {
    getCSVFile: getCSVFile
};
