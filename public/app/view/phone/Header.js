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
        listeners: {
        	'statusOnline': function() {
        		console.log("Phone Header detected statusOnline");
        	},
        	'statusOffline': function() {
        		console.log("Phone Header detected statusOffline");
        	}
        }//eof listeners
    }
});