function getPaddingString(val, figure_cnt, fill_str) {
    let val_str = '' + val;
    let add_str = '';
    
    for (let i = 0; i < (figure_cnt - val_str.length); ++i) {
        add_str += fill_str;
    }

    return (add_str + val_str);
};

function getZero2PaddingString(val) {
    if (val < 10) {
        return ('0' + val);
    }

    return ('' + val);
};

function getTimeStringHMS(time) {
    let hour = (time / 3600) | 0;
    let min = ((time / 60) % 60) | 0;
    let sec = (time % 60) | 0;

    return (getZero2PaddingString(hour) + ':' + getZero2PaddingString(min) + ':' + getZero2PaddingString(sec));
};

function getTimeStringMSM(time) {
    let min = (time / 60) | 0;
    let sec = (time % 60) | 0;
    let mil = Math.round(time * 100) % 100;

    return (getZero2PaddingString(min) + ':' + getZero2PaddingString(sec) + ':' + getZero2PaddingString(mil));
};

function getDateString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    
    return ('' + year + '-' + getZero2PaddingString(month) + '-' + getZero2PaddingString(day) + ' ' + getZero2PaddingString(hour) + ':' + getZero2PaddingString(min) + ':' + getZero2PaddingString(sec));
};

module.exports = {
    getPaddingString: getPaddingString,
    getZero2PaddingString: getZero2PaddingString,
    getTimeStringHMS: getTimeStringHMS,
    getTimeStringMSM: getTimeStringMSM,
    getDateString: getDateString
};
