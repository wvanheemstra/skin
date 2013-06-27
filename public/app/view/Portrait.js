/*
 * Portrait
 * Ext.form.Panel
 */
Ext.define('skin.view.Portrait', {
    extend: 'Ext.form.Panel',
    alias : 'widget.portraitview',   
    requires: [
        'skin.view.Layout1',
        'skin.view.Layout2'        
    ],
    config: {
        cls: 'portrait',    
        layout: {
            type: 'vbox'
        },
        flex: 1,        
        defaults: {
            margin: '3 3 3 3'
        }
    }
});