/*
 * Main
 * Ext.Panel
 *
 */
Ext.define('skin.view.Main', {
  extend: 'Ext.Panel',
  alias: 'widget.mainview',
  requires: ['skin.view.Header', 'skin.view.Landscape', 'skin.view.Portrait', 'skin.view.MainMenu'],
  config: {
    cls: 'main',    
    title: 'Generic version', // for testing only
    fullscreen: true,
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',        
      scrollable: null
    },    
    //html: 'I\'m the Main View',
    items: [
      {
        //xtype: 'headerview',
        //xtype: 'landscapeview'
      }
    ]
  }
});