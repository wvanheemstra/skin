/*
 * Layout1
 * skin.view.Layout1
 */
Ext.define('skin.view.phone.Layout1', {
    extend: 'skin.view.Layout1',
    alias : 'widget.layout1phoneview',
    config: {
        style: 'background-color: #cdc9c9',
        flex: 1,
        layout: {
            type: 'vbox',
        },
        defaults: {
            margin: '0 0 5 0',
            labelWidth: '125',
        },
        items: [
            {
                xtype: 'label',
                //html: 'This panel takes 33% of the available space',
        html: 'Some Phone Panel Title'
            },   
            {
                xtype: 'sliderfield',
                label: 'Slide this to have fun',
                name: 'myslider',
                labelAlign: 'top',
                increment: 25,
            },
            {
                xtype: 'textfield',
                label: 'My Name',
            },   
            {
                xtype: 'button',
                text: 'Some Activity',
                iconCls: 'arrow_right',
                iconMask: true, 
            },   
            {
                xtype: 'button',
                text: 'Administration',
                iconCls: 'arrow_right',
                iconMask: true,
                handler: function() {
                    container.setActiveItem({
                        html: 'This is the new item.'
                    });
                } 
            }
        ]
    }
});