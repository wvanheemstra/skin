/*
 * Main
 * Ext. Panel
 *
 */
Ext.define('skin.view.Main', {
  extend: 'Ext.Panel',
  alias: 'widget.mainview',
  requires: ['skin.view.Landscape', 'skin.view.Portrait', 'skin.view.MainMenu'],
  config: {
    title: 'Generic version', // for testing only
    fullscreen: true,
    layout: {
      type: 'fit'
    },
    //html: 'I\'m the Main View',
    items: [
      {
        //xtype: 'landscapeview',
      }
    ]
  }
});