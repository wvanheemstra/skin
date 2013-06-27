/*
 * Landscape
 * skin.view.Landscape
 */
Ext.define('skin.view.phone.Landscape', {
    extend: 'skin.view.Landscape',
    alias : 'widget.landscapephoneview',  
    requires: [
        'skin.view.phone.Layout1',
        'skin.view.phone.Layout2'
    ],
    config: {
        cls: 'phone-landscape',  
        layout: {
            type: 'hbox'
        },
        flex: 1,        
        defaults: {
            margin: '3 3 3 3'
        }
    }
});