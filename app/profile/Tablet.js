/**
 * Tablet
 * Ext.app.Profile
 */
Ext.define('skin.profile.Tablet', {
  extend: 'Ext.app.Profile',
  config: {
    name: 'Tablet',
    views: ['skin.view.tablet.Main']
  },
  isActive: function() {
    return Ext.os.is.Tablet;
  },
  launch: function() {
    //Ext.create('skin.view.tablet.Main');
    Ext.Viewport.add(
      //[{xtype: 'logintabletview'}]
      [{xtype: 'maintabletview'}]
    );
  }
});