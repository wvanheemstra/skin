/**
 * Phone
 * Ext.app.Profile
 */
Ext.define('skin.profile.Phone', {
  extend: 'Ext.app.Profile',
  config: {
    name: 'Phone',
    views: ['skin.view.phone.Main']
  },
  isActive: function() {
    return Ext.os.is.Phone;
  },
  launch: function() {
    //Ext.create('skin.view.phone.Main');
    Ext.Viewport.add(
      //[{xtype: 'loginphoneview'}]
      [{xtype: 'mainphoneview'}]
    );
  }
});