/*
 * Main
 * skin.view.Main
 */
Ext.define('skin.view.phone.Main', {
  extend: 'skin.view.Main',
  alias: 'widget.mainphoneview',
  //requires: ['skin.view.phone.Landscape', 'skin.view.phone.Portrait', 'skin.view.phone.MainMenu'],
  config: {
    title: 'Phone-specific version', // for testing only
    fullscreen: true,
    layout: {
      type: 'fit'
    },
    //html: 'I\'m the Main Phone View',
    items: [
      {
        //xtype: 'landscapephoneview',
      }
    ]
  }
});