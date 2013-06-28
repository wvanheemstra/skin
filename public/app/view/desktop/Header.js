/*
 * Header
 * skin.view.Header
 */
Ext.define('skin.view.desktop.Header', {
    extend: 'skin.view.Header',
    alias : 'widget.headerdesktopview',
    requires: [
        'skin.view.desktop.Layout0',
        'skin.view.desktop.Layout9'
    ],
    config: {
        cls: 'desktop-header',
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
        		console.log("Desktop Header detected statusOnline");
        	},
        	'statusOffline': function() {
        		console.log("Desktop Header detected statusOffline");
        	}
        }//eof listeners
    }
});