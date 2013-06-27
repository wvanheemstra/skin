/*
 * Layout0
 * skin.view.Layout0
 */
Ext.define('skin.view.tablet.Layout0', {
    extend: 'skin.view.Layout0',
    alias : 'widget.layout0tabletview',   
    config: {
        cls: 'table-layout0', 
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
                html: 'Your Company'
            }
        ]
    }
});