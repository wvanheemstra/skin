/*
 * Header
 * Ext.form.Panel
 */
Ext.define('skin.view.Header', {
    extend: 'Ext.form.Panel',
    alias : 'widget.headerview',
    requires: [
        'skin.view.Layout0',
        'skin.view.Layout9'
    ],
    config: {
        cls: 'header',  
        layout: {
            type: 'vbox'
        },
        flex: 0,        
        defaults: {
            margin: '0 0 0 0',
            scrollable: false
        }
    }
});