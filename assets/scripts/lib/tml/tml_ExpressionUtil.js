var jsep = require('jsep');

var EXPRESSION = {
    CODE_TYPE: cc.Enum({
        NONE: 0,
        NUMBER: 1,
        DOT: 2,
        PLUS_MINUS: 3,
        ADD: 4,
        SUB: 5,
        MUL: 6,
        DIV: 7,
        MOD: 8,
        AND: 9,
        OR: 10,
        XOR: 11,
        NOT: 12,
        LEFT_SHIFT: 13,
        RIGHT_SHIFT: 14,
        LEFT_PAREN: 15,
        RIGHT_PAREN: 16,
        COMMA: 17,
        SPACE: 18,
        VARIABLE: 19,
        CONSTANT: 20,
        FUNCTION: 21
    })
};
Object.freeze(EXPRESSION);

var EXPRESSION_CONSTANT = {
    CODE_TYPE: cc.Enum({
        NONE: 0,
        NUMBER: 1,
        PLUS_MINUS: 2,
        DOT: 3
    })
};
Object.freeze(EXPRESSION_CONSTANT);

function getJsepNode(code) {
    let jsep_node = null;

    try {
        jsep_node = jsep(code);
    } catch (e) {
        // cc.log('ExpressionUtil.getJsepNode jsep Error: ' + e);
    }

    return (jsep_node);
};

function calcJsepNode(jsep_node, calc_opt) {
    let dat = {
        code: '',
        value: 0,
        result: 0
    };

    switch (jsep_node.type) {
    case jsep.NODE_TYPE.LITERAL: {
        dat.value = jsep_node.value;
        dat.result = 1;

        break;
    }
    case jsep.NODE_TYPE.IDENTIFIER: {
        if (calc_opt.variableDataUseFlag) {
            let var_dat = calc_opt.getVariableData(jsep_node.name);

            if (var_dat != null) {
                dat.value = var_dat.value;
                dat.result = 1;

                break;
            }
        }

        if (calc_opt.constantDataUseFlag) {
            let const_dat = calc_opt.getConstantData(jsep_node.name);

            if (const_dat != null) {
                dat.value = const_dat.value;
                dat.result = 1;

                break;
            }
        }

        dat.code = jsep_node.name;

        break;
    }
    case jsep.NODE_TYPE.UNARY_EXP: {
        let dat_sub = calcJsepNode(jsep_node.argument, calc_opt);

        if (dat_sub.result < 0) {
            dat.result = dat_sub.result;

            break;
        }

        if (dat_sub.result == 1) {
            switch (jsep_node.operator) {
            case '-': {
                dat.value = -dat_sub.value;
                dat.result = 1;

                break;
            }
            case '~': {
                dat.value = ~dat_sub.value;
                dat.result = 1;

                break;
            }
            default: {
                dat.value = dat_sub.value;
                dat.result = 1;

                break;
            }
            }
        } else {
            switch (jsep_node.operator) {
            case '-': {
                dat.code = jsep_node.operator + dat_sub.code;

                break;
            }
            case '~': {
                dat.code = jsep_node.operator + dat_sub.code;

                break;
            }
            default: {
                dat.code = dat_sub.code;

                break;
            }
            }
        }

        break;
    }
    case jsep.NODE_TYPE.BINARY_EXP: {
        let dat_sub1 = calcJsepNode(jsep_node.left, calc_opt);

        if (dat_sub1.result < 0) {
            dat.result = dat_sub1.result;

            break;
        }

        let dat_sub2 = calcJsepNode(jsep_node.right, calc_opt);

        if (dat_sub2.result < 0) {
            dat.result = dat_sub2.result;

            break;
        }

        if ((dat_sub1.result == 1)
        && (dat_sub2.result == 1)) {
            switch (jsep_node.operator) {
            case '+': {
                dat.value = dat_sub1.value + dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '-': {
                dat.value = dat_sub1.value - dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '*': {
                dat.value = dat_sub1.value * dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '/': {
                if (dat_sub2.value == 0) {
                    dat.result = -1;

                    break;
                }
                
                dat.value = dat_sub1.value / dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '%': {
                if (dat_sub2.value == 0) {
                    dat.result = -1;

                    break;
                }
                
                dat.value = dat_sub1.value % dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '&': {
                dat.value = dat_sub1.value & dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '|': {
                dat.value = dat_sub1.value | dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '^': {
                dat.value = dat_sub1.value ^ dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '<<': {
                dat.value = dat_sub1.value << dat_sub2.value;
                dat.result = 1;

                break;
            }
            case '>>': {
                dat.value = dat_sub1.value >> dat_sub2.value;
                dat.result = 1;

                break;
            }
            default: {
                dat.code = '' + dat_sub1.value + ' ' + jsep_node.operator + ' ' + dat_sub2.value;

                break;
            }
            }
        } else if (dat_sub1.result == 1) {
            dat.code = '' + dat_sub1.value + ' ' + jsep_node.operator + ' ' + dat_sub2.code;
        } else if (dat_sub2.result == 1) {
            dat.code = '' + dat_sub1.code + ' ' + jsep_node.operator + ' ' + dat_sub2.value;
        } else {
            dat.code = '' + dat_sub1.code + ' ' + jsep_node.operator + ' ' + dat_sub2.code;
        }

        break;
    }
    case jsep.NODE_TYPE.CALL_EXP: {
        let dat_sub_ary = [];
        let dat_sub_val_flg = true;

        for (let arg_i = 0; arg_i < jsep_node.arguments.length; ++arg_i) {
            let dat_sub = calcJsepNode(jsep_node.arguments[arg_i], calc_opt);

            if (dat_sub.result < 0) {
                dat.result = dat_sub.result;

                break;
            }

            dat_sub_ary.push(dat_sub);
            dat_sub_val_flg &= (dat_sub.result == 1) ? true : false;
        }

        if (dat.result < 0) {
            break;
        }

        if (calc_opt.functionDataUseFlag & dat_sub_val_flg) {
            let func_dat = calc_opt.getFunctionData(jsep_node.callee.name);

            if (func_dat != null) {
                let callback_param_ary = [];

                for (let dat_sub_i = 0; dat_sub_i < dat_sub_ary.length; ++dat_sub_i) {
                    let dat_sub = dat_sub_ary[dat_sub_i];

                    callback_param_ary.push(dat_sub.value);
                }
        
                dat.value = func_dat.callback(callback_param_ary);
                dat.result = 1;

                break;
            }
        }

        let callback_param_code = '';

        for (let dat_sub_i = 0; dat_sub_i < dat_sub_ary.length; ++dat_sub_i) {
            let dat_sub = dat_sub_ary[dat_sub_i];

            if (dat_sub_i > 0) {
                callback_param_code += ', ';
            }

            if (dat_sub.result == 1) {
                callback_param_code += '' + dat_sub.value;
            } else {
                callback_param_code += dat_sub.code;
            }
        }

        dat.code = jsep_node.callee.name + '(' + callback_param_code + ')';

        break;
    }
    }

    return (dat);
};

function getExpression(code) {
    let exp = {
        _code: '',
        _code_index: 0,
        get code() {
            return (this._code);
        },
        set code(code) {
            this._code = code;
            this._code_index = Math.clamp_TML(this._code_index, 0, this._code.length);

            return;
        },
        get codeIndex() {
            return (this._code_index);
        },
        set codeIndex(index) {
            this._code_index = Math.clamp_TML(index, 0, this._code.length);

            return;
        },
        set: function (exp) {
            this._code = exp._code;
            this._code_index = exp._code_index;

            return;
        },
        addCode: function (type, param) {
            switch (type) {
            case EXPRESSION.CODE_TYPE.NUMBER: {
                this.addCodeSub1('' + param);

                break;
            }
            case EXPRESSION.CODE_TYPE.DOT: {
                this.addCodeSub1('.');

                break;
            }
            case EXPRESSION.CODE_TYPE.PLUS_MINUS: {
                this.addCodeSub1('-');

                break;
            }
            case EXPRESSION.CODE_TYPE.ADD: {
                this.addCodeSub1(' + ');

                break;
            }
            case EXPRESSION.CODE_TYPE.SUB: {
                this.addCodeSub1(' - ');

                break;
            }
            case EXPRESSION.CODE_TYPE.MUL: {
                this.addCodeSub1(' * ');

                break;
            }
            case EXPRESSION.CODE_TYPE.DIV: {
                this.addCodeSub1(' / ');

                break;
            }
            case EXPRESSION.CODE_TYPE.MOD: {
                this.addCodeSub1(' % ');

                break;
            }
            case EXPRESSION.CODE_TYPE.AND: {
                this.addCodeSub1(' & ');

                break;
            }
            case EXPRESSION.CODE_TYPE.OR: {
                this.addCodeSub1(' | ');

                break;
            }
            case EXPRESSION.CODE_TYPE.XOR: {
                this.addCodeSub1(' ^ ');

                break;
            }
            case EXPRESSION.CODE_TYPE.NOT: {
                this.addCodeSub1('~');

                break;
            }
            case EXPRESSION.CODE_TYPE.LEFT_SHIFT: {
                this.addCodeSub1(' << ');

                break;
            }
            case EXPRESSION.CODE_TYPE.RIGHT_SHIFT: {
                this.addCodeSub1(' >> ');

                break;
            }
            case EXPRESSION.CODE_TYPE.LEFT_PAREN: {
                this.addCodeSub1('(');

                break;
            }
            case EXPRESSION.CODE_TYPE.RIGHT_PAREN: {
                this.addCodeSub1(')');

                break;
            }
            case EXPRESSION.CODE_TYPE.COMMA: {
                this.addCodeSub1(', ');

                break;
            }
            case EXPRESSION.CODE_TYPE.SPACE: {
                this.addCodeSub1(' ');

                break;
            }
            case EXPRESSION.CODE_TYPE.VARIABLE: {
                this.addCodeSub1(param.name);

                break;
            }
            case EXPRESSION.CODE_TYPE.CONSTANT: {
                this.addCodeSub1(param.name);

                break;
            }
            case EXPRESSION.CODE_TYPE.FUNCTION: {
                this.addCodeSub1(param.name + '(' + param.callbackParameterCode + ')');

                break;
            }
            }

            return;
        },
        addCodeSub1: function (code) {
            this.code = this._code.slice(0, this._code_index) + code + this._code.slice(this._code_index);
            this.codeIndex = this._code_index + code.length;

            return;
        },
        deleteCode: function (cnt) {
            if (cnt > 0) {
                let tmp_cnt = (cnt > this._code_index) ? this._code_index : cnt;

                this.codeIndex = this._code_index - tmp_cnt;
                this.code = this._code.slice(0, this._code_index) + this._code.slice(Math.min(this._code_index + tmp_cnt, this._code.length));
            } else if (cnt < 0) {
                let tmp_cnt = -cnt;

                this.code = this._code.slice(0, this._code_index) + this._code.slice(Math.min(this._code_index + tmp_cnt, this._code.length));
            }

            return;
        },
        getFrontCode: function () {
            return (this._code.slice(0, this._code_index));
        },
        getBackCode: function () {
            return (this._code.slice(this._code_index));
        },
        calc: function (calc_opt) {
            let jsep_node = getJsepNode(this._code);

            if (jsep_node == null) {
                return (-1);
            }

            let dat = calcJsepNode(jsep_node, calc_opt);

            if (dat.result == 1) {
                this.code = '' + dat.value;
            } else if (dat.result >= 0) {
                this.code = dat.code;
            }

            return (dat.result);
        },
        getValue: function () {
            let val = Number(this._code);

            if (isNaN(val)) {
                val = 0;
            }
    
            return (val);
        }
    };

    exp.code = code;
    exp.codeIndex = code.length;

    return (exp);
};

function getExpressionConstant(code) {
    let expc = {
        _code: '',
        _code_index: 0,
        get code() {
            return (this._code);
        },
        set code(code) {
            this._code = code;
            this._code_index = Math.clamp_TML(this._code_index, 0, this._code.length);

            return;
        },
        get codeIndex() {
            return (this._code_index);
        },
        set codeIndex(index) {
            this._code_index = Math.clamp_TML(index, 0, this._code.length);

            return;
        },
        set: function (expc) {
            this._code = expc._code;
            this._code_index = expc._code_index;

            return;
        },
        addCode: function (type, param) {
            switch (type) {
            case EXPRESSION_CONSTANT.CODE_TYPE.NUMBER: {
                this.addCodeSub1('' + param);

                break;
            }
            case EXPRESSION_CONSTANT.CODE_TYPE.DOT: {
                this.addCodeSub1('.');

                break;
            }
            case EXPRESSION_CONSTANT.CODE_TYPE.PLUS_MINUS: {
                this.addCodeSub1('-');

                break;
            }
            }
    
            return;
        },
        addCodeSub1: function (code) {
            this.code = this._code.slice(0, this._code_index) + code + this._code.slice(this._code_index);
            this.codeIndex = this._code_index + code.length;

            return;
        },
        deleteCode: function (cnt) {
            if (cnt > 0) {
                let tmp_cnt = (cnt > this._code_index) ? this._code_index : cnt;

                this.codeIndex = this._code_index - tmp_cnt;
                this.code = this._code.slice(0, this._code_index) + this._code.slice(Math.min(this._code_index + tmp_cnt, this._code.length));
            } else if (cnt < 0) {
                let tmp_cnt = -cnt;

                this.code = this._code.slice(0, this._code_index) + this._code.slice(Math.min(this._code_index + tmp_cnt, this._code.length));
            }

            return;
        },
        getFrontCode: function () {
            return (this._code.slice(0, this._code_index));
        },
        getBackCode: function () {
            return (this._code.slice(this._code_index));
        },
        calc: function (calc_opt) {
            let jsep_node = getJsepNode(this._code);

            if (jsep_node == null) {
                return (-1);
            }

            let dat = calcJsepNode(jsep_node, calc_opt);

            if (dat.result == 1) {
                this.code = '' + dat.value;
            } else if (dat.result >= 0) {
                this.code = dat.code;
            }

            return (dat.result);
        },
        getValue: function () {
            let val = Number(this._code);

            if (isNaN(val)) {
                val = 0;
            }
    
            return (val);
        }
    };

    expc.code = code;
    expc.codeIndex = code.length;

    return (expc);
};

function validateExpressionName(name) {
    let tmp_name = name;

    tmp_name = tmp_name.trim();
    tmp_name = tmp_name.slice(0, 64);

    if (tmp_name.length <= 0) {
        tmp_name = 'EXPRESSION';
    }

    return (tmp_name);
};

function validateExpressionConstantName(name) {
    let tmp_name = name;

    tmp_name = tmp_name.trim();
    tmp_name = tmp_name.replace(/^[0-9]+/g, '');
    tmp_name = tmp_name.replace(/[^a-zA-Z0-9_]/g, '');
    tmp_name = tmp_name.slice(0, 64);
    tmp_name = tmp_name.toUpperCase();

    if (tmp_name.length <= 0) {
        tmp_name = 'CONSTANT';
    }

    return (tmp_name);
};

function getCalcOption() {
    let calc_opt = {
        _var_dat_ary: [],
        _var_dat_index_ary: [],
        _var_dat_use_flg: true,
        _const_dat_ary: [],
        _const_dat_index_ary: [],
        _const_dat_use_flg: true,
        _func_dat_ary: [],
        _func_dat_index_ary: [],
        _func_dat_use_flg: true,
        get variableDataArray() {
            return (this._var_dat_ary);
        },
        get variableDataUseFlag() {
            return (this._var_dat_use_flg);
        },
        set variableDataUseFlag(use_flg) {
            this._var_dat_use_flg = use_flg;

            return;
        },
        get constantDataArray() {
            return (this._const_dat_ary);
        },
        get constantDataUseFlag() {
            return (this._const_dat_use_flg);
        },
        set constantDataUseFlag(use_flg) {
            this._const_dat_use_flg = use_flg;

            return;
        },
        get functionDataArray() {
            return (this._func_dat_ary);
        },
        get functionDataUseFlag() {
            return (this._func_dat_use_flg);
        },
        set functionDataUseFlag(use_flg) {
            this._func_dat_use_flg = use_flg;

            return;
        },
        getVariableData: function (name) {
            let index = this._var_dat_index_ary[name];

            if (index === undefined) {
                return (null);
            }

            return (this._var_dat_ary[index]);
        },
        addVariableData: function (name, val) {
            if (this._var_dat_index_ary[name] !== undefined) {
                return;
            }

            this._var_dat_index_ary[name] = this._var_dat_ary.length;
            this._var_dat_ary.push({name: name, value: val});

            return;
        },
        deleteVariableData: function () {
            this._var_dat_ary = [];
            this._var_dat_index_ary = [];
    
            return;
        },
        getConstantData: function (name) {
            let index = this._const_dat_index_ary[name];

            if (index === undefined) {
                return (null);
            }

            return (this._const_dat_ary[index]);
        },
        addConstantData: function (name, val) {
            if (this._const_dat_index_ary[name] !== undefined) {
                return;
            }

            this._const_dat_index_ary[name] = this._const_dat_ary.length;
            this._const_dat_ary.push({name: name, value: val});

            return;
        },
        deleteConstantData: function () {
            this._const_dat_ary = [];
            this._const_dat_index_ary = [];

            return;
        },
        getFunctionData: function (name) {
            let index = this._func_dat_index_ary[name];

            if (index === undefined) {
                return (null);
            }

            return (this._func_dat_ary[index]);
        },
        addFunctionData: function (name, callback, callback_param_code) {
            if (this._func_dat_index_ary[name] !== undefined) {
                return;
            }

            this._func_dat_index_ary[name] = this._func_dat_ary.length;
            this._func_dat_ary.push({name: name, callback: callback, callbackParameterCode: callback_param_code});

            return;
        },
        deleteFunctionData: function () {
            this._func_dat_ary = [];
            this._func_dat_index_ary = [];

            return;
        }
    };

    return (calc_opt);
};

module.exports = {
    EXPRESSION: EXPRESSION,
    EXPRESSION_CONSTANT: EXPRESSION_CONSTANT,
    getExpression: getExpression,
    getExpressionConstant: getExpressionConstant,
    validateExpressionName: validateExpressionName,
    validateExpressionConstantName: validateExpressionConstantName,
    getCalcOption: getCalcOption
};
