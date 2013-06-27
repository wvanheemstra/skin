/*
 * Landscape
 * Ext.form.Panel
 */
Ext.define('skin.view.Landscape', {
    extend: 'Ext.form.Panel',
    alias : 'widget.landscapeview',    
    requires: [
        'skin.view.Layout1',
        'skin.view.Layout2'
    ],
    config: {
        cls: 'landscape', 
        layout: {
            type: 'hbox'
        },
        flex: 1,        
        defaults: {
            margin: '3 3 3 3'
        }
    }
});