/*
 * Main
 * skin.view.Main
 */
Ext.define('skin.view.desktop.Main', {
  extend: 'skin.view.Main',
  alias: 'widget.maindesktopview',
  requires: ['skin.view.desktop.Landscape', 'skin.view.desktop.Portrait', 'skin.view.desktop.MainMenu'],
  config: {
    title: 'Desktop-specific version', // for testing only
    fullscreen: true,
    layout: {
      type: 'fit'
    },
    //html: 'I\'m the Main Desktop View',
    items: [
      {
        //xtype: 'landscapedesktopview',
      }
    ]
  }
});