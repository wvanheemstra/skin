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
        layout: {
            type: 'hbox'
        },
        defaults: {
            margin: '3 3 3 3',
        },
    }
});