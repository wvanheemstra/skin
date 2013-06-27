/*
 * Layout0
 * skin.view.Layout0
 */
Ext.define('skin.view.phone.Layout0', {
    extend: 'skin.view.Layout0',
    alias : 'widget.layout0phoneview',
    config: {
        cls: 'phone-layout0',
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