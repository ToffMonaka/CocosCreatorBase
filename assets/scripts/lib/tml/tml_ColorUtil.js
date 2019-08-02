function getRGBColorCodeStringFromCode(code) {
    return (('000000' + code.toString(16).toUpperCase()).slice(-6));
};

function getRGBColorCodeFromCodeString(code_str) {
    return (parseInt(code_str, 16));
};

function getRGBColor(r, g, b) {
    let col = {
        _r: 0,
        _g: 0,
        _b: 0,
        get r() {
            return (this._r);
        },
        set r(r) {
            this._r = r;

            return;
        },
        get g() {
            return (this._g);
        },
        set g(g) {
            this._g = g;

            return;
        },
        get b() {
            return (this._b);
        },
        set b(b) {
            this._b = b;

            return;
        },
        get code() {
            return (((this._r & 0xFF) << 16) | ((this._g & 0xFF) << 8) | (this._b & 0xFF));
        },
        set code(code) {
            this._r = (code >> 16) & 0xFF;
            this._g = (code >> 8) & 0xFF;
            this._b = code & 0xFF;

            return;
        },
        get codeString() {
            return (getRGBColorCodeStringFromCode(this.code));
        },
        set codeString(code_str) {
            this.code = getRGBColorCodeFromCodeString(code_str);

            return;
        },
        set: function (col) {
            this._r = col._r;
            this._g = col._g;
            this._b = col._b;

            return;
        },
        getHSVColor: function () {
            let h = 0;
            let s = 0;
            let v = 0;
            let r = this._r;
            let g = this._g;
            let b = this._b;
            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);

            if ((r == g) && (r == b)) {
                h = 0;
            } else if ((r >= g) && (r >= b)) {
                h = 60 * ((g - b) / (max - min));
            } else if ((g >= r) && (g >= b)) {
                h = 60 * ((b - r) / (max - min)) + 120;
            } else if ((b >= r) && (b >= g)) {
                h = 60 * ((r - g) / (max - min)) + 240;
            }

            if (h < 0) {
                h += 360;
            }

            if (max == 0) {
                s = 0;
            } else {
                s = (max - min) / max * 100;
            }

            v = max / 255 * 100;
            
            h = Math.round(h);
            s = Math.round(s);
            v = Math.round(v);

            return (getHSVColor(h, s, v));
        }
    };

    col.r = r;
    col.g = g;
    col.b = b;

    return (col);
};

function getRGBColorFromCode(code) {
    let r = (code >> 16) & 0xFF;
    let g = (code >> 8) & 0xFF;
    let b = code & 0xFF;

    return (getRGBColor(r, g, b));
};

function getHSVColorCodeStringFromCode(code) {
    return (('0000000' + code.toString(16).toUpperCase()).slice(-7));
};

function getHSVColorCodeFromCodeString(code_str) {
    return (parseInt(code_str, 16));
};

function getHSVColor(h, s, v) {
    let col = {
        _h: 0,
        _s: 0,
        _v: 0,
        get h() {
            return (this._h);
        },
        set h(h) {
            this._h = h;

            return;
        },
        get s() {
            return (this._s);
        },
        set s(s) {
            this._s = s;

            return;
        },
        get v() {
            return (this._v);
        },
        set v(v) {
            this._v = v;

            return;
        },
        get code() {
            return (((this._h & 0xFFF) << 16) | ((this._s & 0xFF) << 8) | (this._v & 0xFF));
        },
        set code(code) {
            this._h = (code >> 16) & 0xFFF;
            this._s = (code >> 8) & 0xFF;
            this._v = code & 0xFF;

            return;
        },
        get codeString() {
            return (getHSVColorCodeStringFromCode(this.code));
        },
        set codeString(code_str) {
            this.code = getHSVColorCodeFromCodeString(code_str);

            return;
        },
        set: function (col) {
            this._h = col._h;
            this._s = col._s;
            this._v = col._v;

            return;
        },
        getRGBColor: function () {
            let r = 0;
            let g = 0;
            let b = 0;
            let h = this._h;
            let s = this._s / 100;
            let v = this._v / 100;
            let max = v * 255;
            let min = max - (s * max);
         
            if (h < 60) {
                r = max;
                g = (h / 60) * (max - min) + min;
                b = min;
            } else if (h < 120) {
                r = ((120 - h) / 60) * (max - min) + min;
                g = max;
                b = min;
            } else if (h < 180) {
                r = min;
                g = max;
                b = ((h - 120) / 60) * (max - min) + min;
            } else if (h < 240) {
                r = min;
                g = ((240 - h) / 60) * (max - min) + min;
                b = max;
            } else if (h < 300) {
                r = ((h - 240) / 60) * (max - min) + min;
                g = min;
                b = max;
            } else {
                r = max;
                g = min;
                b = ((360 - h) / 60) * (max - min) + min;
            }

            r = Math.round(r);
            g = Math.round(g);
            b = Math.round(b);            
        
            return (getRGBColor(r, g, b));
        }
    };

    col.h = h;
    col.s = s;
    col.v = v;

    return (col);
};

function getHSVColorFromCode(code) {
    let h = (code >> 16) & 0xFFF;
    let s = (code >> 8) & 0xFF;
    let v = code & 0xFF;

    return (getHSVColor(h, s, v));
};

function validateColorName(name) {
    let tmp_name = name;

    tmp_name = tmp_name.trim();
    tmp_name = tmp_name.slice(0, 64);

    if (tmp_name.length <= 0) {
        tmp_name = 'COLOR';
    }

    return (tmp_name);
};

module.exports = {
    getRGBColorCodeStringFromCode: getRGBColorCodeStringFromCode,
    getRGBColorCodeFromCodeString: getRGBColorCodeFromCodeString,
    getRGBColor: getRGBColor,
    getRGBColorFromCode: getRGBColorFromCode,
    getHSVColorCodeStringFromCode: getHSVColorCodeStringFromCode,
    getHSVColorCodeFromCodeString: getHSVColorCodeFromCodeString,
    getHSVColor: getHSVColor,
    getHSVColorFromCode: getHSVColorFromCode,
    validateColorName: validateColorName
};
