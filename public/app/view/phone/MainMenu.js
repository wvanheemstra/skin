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
      scrollable: false
    },    
    items: [{
      xtype: 'titlebar',
      title: 'Main Phone Menu',
      docked: 'top',
      items: [
        {
          xtype: 'button',
          text: 'Log Out',
          itemId: 'logOutButtonPhone',
          align: 'right',
          bubbleEvents: ['processLogOutButton'],
          listeners: {
            tap: function() {
                console.log("You tapped logOutButtonPhone");
                this.fireEvent('processLogOutButton', this);
            }
          }
        }
      ]
    }],
    listeners: {
      processLogOutButton: function(){
        console.log("Processing LogOutButton");
        this.fireEvent('logOutCommand');
      }//eof processLogOutButton
    }// eof listeners
  }  
  
  /*
  config: {
    cls: 'phone-mainmenu',     
    title: 'Phone-specific version', // for testing only
    fullscreen: true,      
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',        
      scrollable: false
    },
    //html: 'I\'m the Main Menu Phone View',
    items: [
      {
        //xtype: 'headerphoneview',  
        //xtype: 'landscapephoneview'
      }
    ]
  }
  */
});