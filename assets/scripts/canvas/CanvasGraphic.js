var ConstantUtil = require('ConstantUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false}
    },

    onLoad: function () {
        return;
    },

    create: function (desc) {
        this.canvas = desc.canvas;

        cc.director.getPhysicsManager().enabled = true;
        
        return (0);
    },
    
    update: function (time) {
        return;
    },

    getPhysicsFlag: function () {
        return (cc.director.getPhysicsManager().enabled);
    },

    setPhysicsFlag: function (physics_flg) {
        cc.director.getPhysicsManager().enabled = physics_flg;

        return;
    }
});
