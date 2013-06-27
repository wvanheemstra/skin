/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.desktop.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenudesktopview',
  /* requires: ['skin.view.desktop.Header', 'skin.view.desktop.Landscape', 'skin.view.desktop.Portrait', 'skin.view.desktop.Main'], */

  
  
  config: {
    layout: {
      type: 'fit'
    },
    items: [{
      xtype: 'titlebar',
      title: 'Main Desktop Menu',
      docked: 'top',
      items: [
        {
          xtype: 'button',
          text: 'Log Out',
          itemId: 'logOutButtonDesktop',
          align: 'right',
          bubbleEvents: ['processLogOutButton'],
          listeners: {
            tap: function() {
                console.log("You tapped logOutButtonDesktop");
                this.fireEvent('processLogOutButton', this);
            }
          }
        }
      ]
    }],//eof items
    listeners: {
      processLogOutButton: function(){
        console.log("Processing LogOutButton");
        this.fireEvent('logOutCommand');
      }//eof processLogOutButton
    }// eof listeners
  }
  
    
  
  
  /*
  config: {
    cls: 'desktop-mainmenu',  
    title: 'Desktop-specific version', // for testing only
    fullscreen: true,      
    layout: {
      type: 'vbox' // WAS fit
    },
    defaults: {
      margin: '0 0 0 0',        
      scrollable: false
    },
    //html: 'I\'m the Main Menu Desktop View',
    items: [
      {
        //xtype: 'headerdesktopview',  
        //xtype: 'landscapedesktopview'
      }
    ]
  }
  */
});