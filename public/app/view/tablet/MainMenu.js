/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.tablet.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenutabletview',
  requires: ['skin.view.tablet.Header', 'skin.view.tablet.Landscape', 'skin.view.tablet.Portrait'],
  config: {
    cls: 'tablet-mainmenu',      
    title: 'Tablet-specific version', // for testing only
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
            //xtype: 'headertabletview',  
            //xtype: 'landscapetabletview'
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