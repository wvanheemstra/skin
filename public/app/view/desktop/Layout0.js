/*
 * Layout0
 * skin.view.Layout0
 */
Ext.define('skin.view.desktop.Layout0', {
    extend: 'skin.view.Layout0',
    alias : 'widget.layout0desktopview',
    config: {
        cls: 'desktop-layout0',
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
                html: 'Your Company'
            }
        ],
        listeners: {
        	'showOnline': function() {
        		console.log("Desktop Layout0 detected showOnline");
        		this.items.first().removeCls('offline');
        		this.items.first().addCls('online');
        	},
        	'showOffline': function() {
        		console.log("Desktop Layout0 detected showOffline");
        		this.items.first().removeCls('online');
        		this.items.first().addCls('offline');
        	}
        }//eof listeners
    }
});