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
        cls: 'tablet-portrait',         
        layout: {
            type: 'vbox'
        },
        flex: 1,        
        defaults: {
            margin: '3 3 3 3'
        }
    }
});