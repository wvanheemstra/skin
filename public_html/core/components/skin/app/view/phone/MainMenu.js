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
          align: 'right'
        }
      ]
    }],
    listeners: {
      tap: {
        element: 'element',
        delegate: '#logOutButtonPhone',
        fn: function(e) {
          console.log('Element with id "logOutButtonPhone" was tapped!');
          this.fireEvent('logOutCommand');
        } // eof onLogInButtonTap
      } // eof tap
    }// eof listeners
  }
});