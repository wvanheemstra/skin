/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.Loader.setConfig({
  enabled: true
});

//<debug>
Ext.Loader.setPath({
    'Ext': 'resources/js/touch/src',
    'Ext.ux': 'resources/js/touch-custom/src/ux'
});
//</debug>

Ext.application({
    name: 'skin',
    appFolder: 'app',
    requires: [
        'Ext.MessageBox',
        'Ext.ux.util.OnlineManager'
    ],
    profiles: ['Phone','Tablet','Desktop'],
    views: [], // views are loaded automatically
    controllers: ['skin.controller.SetLayout','skin.controller.Login'], // limited to the generic controllers, as profile controllers get loaded automatically
    renderTo: document.body,
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        console.info('app is launching...');
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('skin.view.Main'));
        
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
        }//eof desktop
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
        }//eof tablet
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
        }//eof phone
    },//eof launch
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
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
