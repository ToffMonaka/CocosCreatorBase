var ConstantUtil = require('ConstantUtil');
var CanvasSystem = require('CanvasSystem');

function getNewSystem() {
    if (cc.canvasSystem === undefined) {
        cc.canvasSystem = new CanvasSystem();
    }

    cc.canvasSystem.create({});

    return (cc.canvasSystem);
};

function getSystem() {
    return (cc.canvasSystem);
};

module.exports = {
    getNewSystem: getNewSystem,
    getSystem: getSystem
};
