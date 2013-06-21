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
  appFolder: '../app',
  profiles: ['Phone','Tablet','Desktop'],
  views: [], // views are loaded automatically
  controllers: ['skin.controller.SetLayout','skin.controller.Login'], // limited to the generic controllers, as profile controllers get loaded automatically
  renderTo: document.body,
  launch: function() {
    console.info('app is launching...');
    if(Ext.os.deviceType==='Desktop') {
      console.log('I am a Desktop.');
      useLoadMask : true,
      Ext.Viewport.add( // TO DO: Since Viewport occupies the whole screen, we need to instead use a Panel layout...for desktop viewing so the rest of the page is visible
        [{
          //xtype: 'panel',
          //style: 'background: #ff0089; text-align:left;',
          id: 'desktop',
          xtype: 'maindesktopview',
          //html: 'I am a Desktop.',
          listeners: { 
            activate: { 
                fn: updateAppElementForDesktop
            }
          }
        }]
      );      
    }
    else if (Ext.os.deviceType==='Tablet') {
      console.log('I am a Tablet.');
      useLoadMask : true,
      Ext.Viewport.add(
       [{
          //xtype: 'panel',
          //style: 'background: #ff0089; text-align:left;',
          id: 'tablet',
          xtype: 'maintabletview',
          //html: 'I am a Tablet.',
          listeners: { 
            activate: { 
                fn: updateAppElementForTablet
            }
	  }
        }]
      );      
    }
    else if (Ext.os.deviceType==='Phone') {
      console.log('I am a Phone.');
      useLoadMask : true,
      Ext.Viewport.add(
       [{
          //xtype: 'panel',
          //style: 'background: #ff0089; text-align:left;',
          id: 'phone',
          xtype: 'mainphoneview',
          //html: 'I am a Phone.',
          listeners: { 
            activate: { 
                fn: updateAppElementForPhone
            }
	  }
        }]
      );      
    }
  }//eof launch
});

function updateAppElementForDesktop() {
    console.log('I am active !');
    var appEl = document.getElementById('appEl');
    //console.log(appEl);
    var desktop = document.getElementById('desktop');
    //console.log(desktop);
    appEl.parentNode.replaceChild(desktop, appEl);
}

function updateAppElementForTablet() {
    console.log('I am active !');
    var appEl = document.getElementById('appEl');
    //console.log(appEl);
    var tablet = document.getElementById('tablet');
    //console.log(tablet);
    appEl.parentNode.replaceChild(tablet, appEl);
}

function updateAppElementForPhone() {
    console.log('I am active !');
    var appEl = document.getElementById('appEl');
    //console.log(appEl);
    var phone = document.getElementById('phone');
    //console.log(phone);
    appEl.parentNode.replaceChild(phone, appEl);
}