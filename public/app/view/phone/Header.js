/*
 * Header
 * skin.view.Header
 */
Ext.define('skin.view.phone.Header', {
    extend: 'skin.view.Header',
    alias : 'widget.headerphoneview',   
    requires: [
        'skin.view.phone.Layout0'
    ],
    config: {
        cls: 'phone-header', 
        layout: {
            type: 'vbox'
        },
        flex: 1,
        maxHeight: 40,
        defaults: {
            margin: '0 0 0 0',
            height: 40,            
            scrollable: false
        }
    }
});