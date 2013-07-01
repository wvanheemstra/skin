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
            margin: '0 0 0 0'
        },
        items: [
            {
                xtype: 'label',
                cls: 'status',
                html: '.'
            },{
                xtype: 'spacer'
            }
        ],//eof items
        listeners: {
        	'showOnline': function() {
        		console.log("Layout9 detected showOnline");
        		this.items.first().removeCls('offline');
        		this.items.first().addCls('online');        		
        	},
        	'showOffline': function() {
        		console.log("Layout9 detected showOffline");
        		this.items.first().removeCls('online');
        		this.items.first().addCls('offline');        		
        	}
        }//eof listeners
    }
});