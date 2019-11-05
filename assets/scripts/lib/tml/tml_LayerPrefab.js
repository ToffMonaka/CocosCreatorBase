cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {default: null, serializable: false, visible: false},
        parentLayer: {default: null, serializable: false, visible: false},
        parentLayerScrollViewEx: {default: null, visible: false}
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
        if (this.canvas != null) {
            return (-1);
        }

        this.canvas = (desc.canvas === undefined) ? desc.parentLayer.canvas : desc.canvas;
        this.parentLayer = (desc.parentLayer === undefined) ? null : desc.parentLayer;
        this.parentLayerScrollViewEx = (desc.parentLayerScrollViewEx === undefined) ? null : desc.parentLayerScrollViewEx;

        let create_res = this.onCreate(desc);

        if (create_res < 0) {
            this.canvas = null;

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
        if (this.canvas == null) {
            return;
        }

        this.onUpdate(time);

        return;
    },

    isControl: function () {
        if (this.parentLayer != null) {
            if (!this.parentLayer.isControl()) {
                return (false);
            }
        }

        if (this.parentLayerScrollViewEx != null) {
            if (!this.parentLayerScrollViewEx.isControl()) {
                return (false);
            }
        }

        return (true);
    }
});
