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
        //layout: {
        //    type: 'vbox'
        //},
        //defaults: {
        //    margin: '3 3 3 3'
        //}
      layout: {
        type: 'card'
      },
      defaults: {
        margin: '0 0 0 0'
      }
    }
});