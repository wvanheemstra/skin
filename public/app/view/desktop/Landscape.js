/*
 * Landscape
 * skin.view.Landscape
 */
Ext.define('skin.view.desktop.Landscape', {
    extend: 'skin.view.Landscape',
    alias : 'widget.landscapedesktopview',
    requires: [
        'skin.view.desktop.Layout1',
        'skin.view.desktop.Layout2'
    ],
    config: {
        cls: 'desktop-landscape',
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            margin: '3 3 3 3'
        }
    }
});