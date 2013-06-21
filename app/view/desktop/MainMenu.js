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
          align: 'right'
        }
      ]
    }],
    listeners: {
      tap: {
        element: 'element',
        delegate: '#logOutButtonDesktop',
        fn: function(e) {
          console.log('Element with id "logOutButtonDesktop" was tapped!');
          this.fireEvent('logOutCommand');
        } // eof onLogInButtonTap
      } // eof tap
    }// eof listeners
  }
});