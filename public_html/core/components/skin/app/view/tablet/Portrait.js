/*
 * Portrait
 * skin.view.Portrait
 */
Ext.define('skin.view.tablet.Portrait', {
    extend: 'skin.view.Portrait',
    alias : 'widget.portraittabletview',
    requires: [
        'skin.view.tablet.Layout1',
        'skin.view.tablet.Layout2'
    ],
    config: {
        layout: {
            type: 'vbox'
        },
        defaults: {
            margin: '3 3 3 3',
        },
    }
});