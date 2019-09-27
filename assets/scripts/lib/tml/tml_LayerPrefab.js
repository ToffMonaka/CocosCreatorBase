cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        layer: {default: null, serializable: false, visible: false},
        layerScrollViewEx: {default: null, visible: false}
    },

    onLoad: function () {
        this.ready();

        return;
    },

    onReady: function () {
        return;
    },

    onCreate: function (desc) {
        return (0);
    },

    onDelete: function () {
        return;
    },
    
    onUpdate: function (time) {
        return;
    },

    ready: function () {
        this.onReady();
        
        return;
    },
    
    create: function (desc) {
        this.canvas = (desc.canvas === undefined) ? desc.layer.canvas : desc.canvas;
        this.layer = (desc.layer === undefined) ? null : desc.layer;
        this.layerScrollViewEx = (desc.layerScrollViewEx === undefined) ? null : desc.layerScrollViewEx;

        let create_res = this.onCreate(desc);

        if (create_res < 0) {
            return (create_res);
        }

        return (0);
    },

    delete: function () {
        this.onDelete();

        this.node.destroy();

        return;
    },
    
    update: function (time) {
        if (!this.canUpdate()) {
            return;
        }

        this.onUpdate(time);

        return;
    },

    canUpdate: function () {
        return (this.canvas != null);
    },

    isControl: function () {
        if (this.layer != null) {
            if (!this.layer.isControl()) {
                return (false);
            }
        }

        if (this.layerScrollViewEx != null) {
            if (!this.layerScrollViewEx.isControl()) {
                return (false);
            }
        }

        return (true);
    }
});
