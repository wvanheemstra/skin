/*
 * Header
 * skin.view.Header
 */
Ext.define('skin.view.tablet.Header', {
    extend: 'skin.view.Header',
    alias : 'widget.headertabletview',
    requires: [
        'skin.view.tablet.Layout0',
        'skin.view.tablet.Layout9'
    ],
    config: {
        cls: 'tablet-header',   
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
        		console.log("Tablet Header detected statusOnline");
        		this.items.first().fireEvent('showOnline', this);
        	},
        	'statusOffline': function() {
        		console.log("Tablet Header detected statusOffline");
        		this.items.first().fireEvent('showOffline', this);
        	}
        }//eof listeners
    }
});