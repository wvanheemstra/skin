/**
 * app
 * Ext.app.Application
 */
Ext.Loader.setConfig({
  enabled: true
});

Ext.Loader.setPath({

});

Ext.application({
  name: 'skin',
  appFolder: '../../../app',
  profiles: ['Phone','Tablet','Desktop'],
  views: [], // views are loaded automatically
  controllers: [], // limited to the generic controllers, as profile controllers get loaded automatically
  renderTo: document.body,
  launch: function() {
    console.info('app is launching...');
    if(Ext.os.deviceType==='Desktop') {
      console.log('I am a Desktop.');
    }
    else if (Ext.os.deviceType==='Tablet') {
      console.log('I am a Tablet.');
    }
    else if (Ext.os.deviceType==='Phone') {
      console.log('I am a Phone.');    
    }
  }//eof launch
});