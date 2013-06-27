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
      scrollable: false
    },    
    items: [{
      xtype: 'titlebar',
      title: 'Main Tablet Menu',
      docked: 'top',
      items: [
        {
          xtype: 'button',
          text: 'Log Out',
          itemId: 'logOutButtonTablet',
          align: 'right',
          bubbleEvents: ['processLogOutButton'],
          listeners: {
            tap: function() {
                console.log("You tapped logOutButtonTablet");
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
    cls: 'tablet-mainmenu',      
    title: 'Tablet-specific version', // for testing only
    fullscreen: true,      
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',        
      scrollable: false
    },
    //html: 'I\'m the Main Menu Tablet View',
    items: [
      {
        //xtype: 'headertabletview',  
        //xtype: 'landscapetabletview'
      }
    ]
  }
  */
});