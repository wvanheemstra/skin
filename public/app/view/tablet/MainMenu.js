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
          align: 'right'
        }
      ]
    }],
    listeners: {
      tap: {
        element: 'element',
        delegate: '#logOutButtonTablet',
        fn: function(e) {
          console.log('Element with id "logOutButtonTablet" was tapped!');
          this.fireEvent('logOutCommand');
        } // eof onLogInButtonTap
      } // eof tap
    }// eof listeners
  }
});