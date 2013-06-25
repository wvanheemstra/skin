/*
 * MainMenu
 * skin.view.MainMenu
 */
Ext.define('skin.view.phone.MainMenu', {
  extend: 'skin.view.MainMenu',
  alias: 'widget.mainmenuphoneview',
  config: {
    layout: {
      type: 'fit'
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
});