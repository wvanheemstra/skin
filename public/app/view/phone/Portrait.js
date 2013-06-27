/*
 * Portrait
 * skin.view.Portrait
 */
Ext.define('skin.view.phone.Portrait', {
    extend: 'skin.view.Portrait',
    alias : 'widget.portraitphoneview',  
    requires: [
        'skin.view.phone.Layout1',
        'skin.view.phone.Layout2'
    ],
    config: {
      cls: 'phone-portrait',    
        //layout: {
        //    type: 'vbox'
        //},
        //defaults: {
        //    margin: '3 3 3 3'
        //}
      layout: { // specific to phone
        type: 'card',
        animation: {
        	type: 'slide',
        	direction: 'left',
        	duration: 1000
        }
      },
      flex: 1,
      defaults: {
        margin: '0 0 0 0'
      }
    }
});