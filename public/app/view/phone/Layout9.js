/*
 * Layout9
 * skin.view.Layout9
 */
Ext.define('skin.view.phone.Layout9', {
    extend: 'skin.view.Layout9',
    alias : 'widget.layout9phoneview',
    config: {
        cls: 'phone-layout9',
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            margin: '0 0 0 0'
        },
        items: [
        	{
                xtype: 'label',
                cls: 'status',
                html: '.'
            },{
                xtype: 'label',
                html: 'Your Company [logged in]'
            },{
                xtype: 'button',
                text: 'Log Out',
                itemId: 'logOutButtonPhone',
                align: 'right',
                bubbleEvents: ['processLogOutButton'],
                listeners: {
                    tap: function() {
                        console.log("You tapped logOutButtonPhone");
                        this.fireEvent('processLogOutButton', this);
                    }
                }                
            }
        ],//eof items
        listeners: {
        	'showOnline': function() {
        		console.log("Phone Layout9 detected showOnline");
        		this.items.first().removeCls('offline');
        		this.items.first().addCls('online');        		
        	},
        	'showOffline': function() {
        		console.log("Phone Layout9 detected showOffline");
        		this.items.first().removeCls('online');
        		this.items.first().addCls('offline');        		
        	}
        }//eof listeners     
    }//eof config
});