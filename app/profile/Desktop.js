/**
 * Desktop
 * Ext.app.Profile
 */
Ext.define('skin.profile.Desktop', {
  extend: 'Ext.app.Profile',
  config: {
    name: 'Desktop',
    views: ['skin.view.desktop.Main']
  },
  isActive: function() {
    return Ext.os.is.Desktop;
  },
  launch: function() {
    //Ext.create('skin.view.desktop.Main');
    Ext.Viewport.add(
      //[{xtype: 'logindesktopview'}]
      [{xtype: 'maindesktopview'}]
    );
  }
});