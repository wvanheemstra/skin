/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.tablet.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenutabletview',
  config: {
    layout: {
      type: 'fit'
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
});