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
                cls: 'status',
                html: '.'
            }
        ],
        listeners: {
        	'showOnline': function() {
        		console.log("Layout0 detected showOnline");
        		this.items.first().removeCls('offline');
        		this.items.first().addCls('online');        		
        	},
        	'showOffline': function() {
        		console.log("Layout0 detected showOffline");
        		this.items.first().removeCls('online');
        		this.items.first().addCls('offline');        		
        	}
        }//eof listeners
    }
});