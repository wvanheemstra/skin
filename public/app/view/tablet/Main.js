/*
 * Main
 * skin.view.Main
 */
Ext.define('skin.view.tablet.Main', {
  extend: 'skin.view.Main',
  alias: 'widget.maintabletview',
  requires: ['skin.view.tablet.Header', 'skin.view.tablet.Landscape', 'skin.view.tablet.Portrait', 'skin.view.tablet.MainMenu'],
  config: {
    cls: 'tablet-main',      
    title: 'Tablet-specific version', // for testing only
    fullscreen: true,
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0', 
      scrollable: null
    },    
    //html: 'I\'m the Main Tablet View',
    items: [
      {
        //xtype: 'headertabletview',  
        //xtype: 'landscapetabletview'
      }
    ]
  }
});