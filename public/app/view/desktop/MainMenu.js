/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.desktop.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenudesktopview',
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
});