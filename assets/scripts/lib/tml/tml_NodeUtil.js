function getContentSizeByLayout(node, layout) {
    let content_size = cc.size(0, 0);

    switch (layout.type) {
    case cc.Layout.Type.HORIZONTAL: {
        content_size.height = node.height;

        if (node.children.length > 0) {
            content_size.width += node.children[0].width + layout.paddingLeft + layout.paddingRight;

            for (let child_i = 1; child_i < node.children.length; ++child_i) {
                content_size.width += node.children[child_i].width + layout.spacingX;
            }
        }

        break;
    }
    case cc.Layout.Type.VERTICAL: {
        content_size.width = node.width;

        if (node.children.length > 0) {
            content_size.height += node.children[0].height + layout.paddingTop + layout.paddingBottom;

            for (let child_i = 1; child_i < node.children.length; ++child_i) {
                content_size.height += node.children[child_i].height + layout.spacingY;
            }
        }

        break;
    }
    case cc.Layout.Type.GRID: {
        switch (layout.startAxis) {
        case cc.Layout.AxisDirection.HORIZONTAL: {
            content_size.width = node.width;
            
            let reset_flg = true;
            let width = 0;
            let height = 0;

            for (let child_i = 0; child_i < node.children.length; ++child_i) {
                let child = node.children[child_i];

                if (reset_flg) {
                    reset_flg = false;
                    width = child.width + layout.paddingLeft + layout.paddingRight;
                    height = child.height;

                    if (child_i == 0) {
                        content_size.height += layout.paddingTop + layout.paddingBottom;
                    } else {
                        content_size.height += layout.spacingY;
                    }
                } else {
                    width += child.width + layout.spacingX;

                    if (width > content_size.width) {
                        reset_flg = true;

                        content_size.height += height;
                        
                        --child_i;
                    } else {
                        height = Math.max(height, child.height);
                    }
                }
            }

            content_size.height += height;
            
            break;
        }
        case cc.Layout.AxisDirection.VERTICAL: {
            let reset_flg = true;
            let width = 0;
            let height = 0;

            for (let child_i = 0; child_i < node.children.length; ++child_i) {
                let child = node.children[child_i];

                if (reset_flg) {
                    reset_flg = false;
                    width = child.width;
                    height = child.height + layout.paddingTop + layout.paddingBottom;

                    if (child_i == 0) {
                        content_size.width += layout.paddingLeft + layout.paddingRight;
                    } else {
                        content_size.width += layout.spacingX;
                    }
                } else {
                    height += child.height + layout.spacingY;

                    if (height > content_size.height) {
                        reset_flg = true;
                        
                        content_size.width += width;
                        
                        --child_i;
                    } else {
                        width = Math.max(width, child.width);
                    }
                }
            }

            content_size.width += width;
            
            break;
        }
        }
                
        break;
    }
    }

    return (content_size);
};

function getParentTotalPosition(node, end_node) {
    let parent_total_pos = cc.Vec2.ZERO;

    let tmp_node = node;

    while (tmp_node.parent != null) {
        tmp_node = tmp_node.parent;

        parent_total_pos.x += tmp_node.x;
        parent_total_pos.y += tmp_node.y;

        if (tmp_node == end_node) {
            break;
        }
    }

    return (parent_total_pos);
};

function setEvent(node, event_type, event_callback, event_callback_src) {
    if (!node.activeInHierarchy) {
        return;
    }

    node.on(event_type, event_callback, event_callback_src);

    return;
};

module.exports = {
    getContentSizeByLayout: getContentSizeByLayout,
    getParentTotalPosition: getParentTotalPosition,
    setEvent: setEvent
};
