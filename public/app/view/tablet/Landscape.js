/*
 * Landscape
 * skin.view.Landscape
 */
Ext.define('skin.view.tablet.Landscape', {
    extend: 'skin.view.Landscape',
    alias : 'widget.landscapetabletview',
    requires: [
        'skin.view.tablet.Layout1',
        'skin.view.tablet.Layout2'
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