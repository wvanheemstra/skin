/*
 * Main
 * skin.view.Main
 */
Ext.define('skin.view.phone.Main', {
  extend: 'skin.view.Main',
  alias: 'widget.mainphoneview',
  requires: ['skin.view.phone.Header', 'skin.view.phone.Landscape', 'skin.view.phone.Portrait', 'skin.view.phone.MainMenu'],
  config: {
    cls: 'phone-main',      
    title: 'Phone-specific version', // for testing only
    fullscreen: true,
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',        
      scrollable: null
    },    
    //html: 'I\'m the Main Phone View',
    items: [
      {
        //xtype: 'headerphoneview',  
        //xtype: 'landscapephoneview'
      }
    ]
  }
});