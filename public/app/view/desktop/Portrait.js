/*
 * Portrait
 * skin.view.Portrait
 */
Ext.define('skin.view.desktop.Portrait', {
    extend: 'skin.view.Portrait',
    alias : 'widget.portraitdesktopview',
    requires: [
        'skin.view.desktop.Layout1',
        'skin.view.desktop.Layout2'
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