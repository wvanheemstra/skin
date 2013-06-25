/*
 * Layout1
 * skin.view.Layout1
 */
Ext.define('skin.view.tablet.Layout1', {
    extend: 'skin.view.Layout1',
    alias : 'widget.layout1tabletview',
    requires: ['Ext.Label',
               'Ext.field.Slider'
           ],
    config: {
        style: 'background-color: #cdc9c9',
        flex: 1,
        layout: {
            type: 'vbox'
        },
        defaults: {
            margin: '0 0 5 0',
            labelWidth: '125'
        },
        items: [
            {
                xtype: 'label',
                //html: 'This panel takes 33% of the available space',
        html: 'Some Tablet Panel Title'
            },   
            {
                xtype: 'sliderfield',
                label: 'Slide this to have fun',
                name: 'myslider',
                labelAlign: 'top',
                increment: 25
            },
            {
                xtype: 'textfield',
                label: 'My Name'
            },   
            {
                xtype: 'button',
                text: 'Some Activity',
                iconCls: 'arrow_right',
                iconMask: true 
            }
        ]
    }
});