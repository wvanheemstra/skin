/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.phone.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenuphoneview',
  requires: ['skin.view.phone.Header', 'skin.view.phone.Landscape', 'skin.view.phone.Portrait'],
  config: {
    cls: 'phone-mainmenu',     
    title: 'Phone-specific version', // for testing only
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
            //xtype: 'headerphoneview',  
            //xtype: 'landscapephoneview'
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