Array.prototype.getIndex_TML = function (val) {
    for (let i = 0; i < this.length; ++i) {
        if (this[i] === val) {
            return (i);
        }
    }

    return (-1);
};

Array.prototype.swap_TML = function (index1, index2) {
    let tmp_val = this[index1];
    
    this[index1] = this[index2];
    this[index2] = tmp_val;

    return;
};

Array.prototype.setUndefined_TML = function (val) {
    for (let i = 0; i < this.length; ++i) {
        if (this[i] === undefined) {
            this[i] = val;
        }
    }

    return (-1);
};

/*
module.exports = {
};
*/
