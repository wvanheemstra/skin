/*
 * Main
 * skin.view.Main
 */
Ext.define('skin.view.tablet.Main', {
  extend: 'skin.view.Main',
  alias: 'widget.maintabletview',
  requires: ['skin.view.tablet.Landscape', 'skin.view.tablet.Portrait', 'skin.view.tablet.MainMenu'],
  config: {
    title: 'Tablet-specific version', // for testing only
    fullscreen: true,
    layout: {
      type: 'fit'
    },
    //html: 'I\'m the Main Tablet View',
    items: [
      {
        //xtype: 'landscapetabletview',
      }
    ]
  }
});