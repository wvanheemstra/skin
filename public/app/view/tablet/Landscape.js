/*
 * Landscape
 * skin.view.Landscape
 */
Ext.define('skin.view.tablet.Landscape', {
    extend: 'skin.view.Landscape',
    alias : 'widget.landscapetabletview',   
    requires: [
        'skin.view.tablet.Layout1',
        'skin.view.tablet.Layout2'
    ],
    config: {
        cls: 'tablet-landscape', 
        layout: {
            type: 'hbox'
        },
        flex: 1,        
        defaults: {
            margin: '3 3 3 3'
        }
    }
});