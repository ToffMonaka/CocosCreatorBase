Math.clamp_TML = function (val, min_val, max_val) {
    return ((val < min_val) ? min_val : (val > max_val) ? max_val : val);
};

Math.wait_TML = function (time) {
    let date1 = new Date();
    let date2 = null;

    while (true) {
        date2 = new Date();

        if ((date2 - date1) > time) {
            break;
        }
    }

    return;
};

Math.radian_TML = function (angle) {
    return (angle * (Math.PI / 180.0));
};

Math.degree_TML = function (angle) {
    return (angle * (180.0 / Math.PI));
};

/*
module.exports = {
};
*/
