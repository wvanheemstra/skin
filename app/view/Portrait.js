/*
 * Portrait
 * Ext.form.Panel
 */
Ext.define('skin.view.Portrait', {
    extend: 'Ext.form.Panel',
    alias : 'widget.portraitview',
    requires: [
        'skin.view.Layout1',
        'skin.view.Layout2'
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