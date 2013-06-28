/*
 * Layout9
 * skin.view.Layout9
 */
Ext.define('skin.view.tablet.Layout9', {
    extend: 'skin.view.Layout9',
    alias : 'widget.layout9tabletview',
    config: {
        cls: 'tablet-layout9',
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            margin: '0 0 0 0',
            labelWidth: '125'
        },
        items: [
            {
                xtype: 'label',
                html: 'Your Company [logged in]'
            },{
                xtype: 'button',
                text: 'Log Out',
                itemId: 'logOutButtonTablet',
                align: 'right',
                bubbleEvents: ['processLogOutButton'],
                listeners: {
                    tap: function() {
                        console.log("You tapped logOutButtonTablet");
                        this.fireEvent('processLogOutButton', this);
                    }
                }                
            }
        ]//eof items       
    }//eof config
});