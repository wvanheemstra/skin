/*
 * Header
 * skin.view.Header
 */
Ext.define('skin.view.phone.Header', {
    extend: 'skin.view.Header',
    alias : 'widget.headerphoneview',   
    requires: [
        'skin.view.phone.Layout0',
        'skin.view.phone.Layout9'
    ],
    config: {
        cls: 'phone-header', 
        layout: {
            type: 'vbox'
        },
        flex: 1,
        maxHeight: 40,
        defaults: {
            margin: '0 0 0 0',
            height: 40,            
            scrollable: false
        },
        items: [],//eof items
        listeners: {
        	'statusOnline': function() {
        		console.log("Phone Header detected statusOnline");
        		this.items.first().fireEvent('showOnline', this);
        	},
        	'statusOffline': function() {
        		console.log("Phone Header detected statusOffline");
        		this.items.first().fireEvent('showOffline', this);
        	}
        }//eof listeners
    }
});