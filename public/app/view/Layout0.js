/*
 * Layout0
 * Ext.Panel
 */
Ext.define('skin.view.Layout0', {
    extend: 'Ext.Panel',
    alias : 'widget.layout0view',
    config: {
        cls: 'layout0',  
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            margin: '0 0 5 0',
            labelWidth: '125'
        },
        items: [
            {
                xtype: 'label',
                html: 'This is Layout0'
            }
        ]
    }
});