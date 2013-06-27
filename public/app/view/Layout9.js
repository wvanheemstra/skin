/*
 * Layout9
 * Ext.Panel
 */
Ext.define('skin.view.Layout9', {
    extend: 'Ext.Panel',
    alias : 'widget.layout9view',
    config: {
        cls: 'layout9',  
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
                html: 'This is Layout9'
            }
        ]
    }
});