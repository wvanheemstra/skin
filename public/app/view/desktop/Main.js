/*
 * Main
 * skin.view.Main
 */
Ext.define('skin.view.desktop.Main', {
  extend: 'skin.view.Main',
  alias: 'widget.maindesktopview',
  requires: ['skin.view.desktop.Header', 'skin.view.desktop.Landscape', 'skin.view.desktop.Portrait', 'skin.view.desktop.MainMenu'],
  config: {
    cls: 'desktop-main',  
    title: 'Desktop-specific version', // for testing only
    fullscreen: true,
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',
      scrollable: null
    },
    //html: 'I\'m the Main Desktop View',
    items: [
      {
        //xtype: 'headerdesktopview',  
        //xtype: 'landscapedesktopview'
      }
    ]
  }
});