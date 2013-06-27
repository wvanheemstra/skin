/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.desktop.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenudesktopview',
  requires: ['skin.view.desktop.Header', 'skin.view.desktop.Landscape', 'skin.view.desktop.Portrait'],
  config: {
    cls: 'desktop-mainmenu',  
    title: 'Desktop-specific version', // for testing only
    fullscreen: true,       
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',        
      scrollable: null
    },
    items: [
        {
            //xtype: 'headerdesktopview',  
            //xtype: 'landscapedesktopview'
        }
    ],//eof items
    listeners: {
      processLogOutButton: function(){
        console.log("Processing LogOutButton");
        this.fireEvent('logOutCommand');
      }//eof processLogOutButton
    }// eof listeners
  }
});