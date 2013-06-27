/*
 * Login
 * Ext.app.Controller
 */
Ext.define('skin.controller.Login', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      loginDesktopView: 'logindesktopview',
      loginPhoneView: 'loginphoneview',
      loginTabletView: 'logintabletview',
      landscapeDesktopView: 'landscapedesktopview',
      landscapePhoneView: 'landscapephoneview',
      landscapeTabletView: 'landscapetabletview',
      portraitDesktopView: 'portraitdesktopview',
      portraitPhoneView: 'portraitphoneview',
      portraitTabletView: 'portraittabletview',
      headerDesktopView: 'headerdesktopview',
      headerPhoneView: 'headerphoneview',
      headerTabletView: 'headertabletview',
      layout0DesktopView: 'layout0desktopview',
      layout0PhoneView: 'layout0phoneview',
      layout0TabletView: 'layout0tabletview',
      layout1DesktopView: 'layout1desktopview',
      layout1PhoneView: 'layout1phoneview',
      layout1TabletView: 'layout1tabletview',       
      layout2DesktopView: 'layout2desktopview',
      layout2PhoneView: 'layout2phoneview',
      layout2TabletView: 'layout2tabletview',
      layout9DesktopView: 'layout9desktopview',
      layout9PhoneView: 'layout9phoneview',
      layout9TabletView: 'layout9tabletview',
      mainMenuDesktopView: 'mainmenudesktopview',
      mainMenuPhoneView: 'mainmenuphoneview',
      mainMenuTabletView: 'mainmenutabletview',
      mainDesktopView: 'maindesktopview',
      mainPhoneView: 'mainphoneview',
      mainTabletView: 'maintabletview'
    },
    control: {
      loginDesktopView:{
        logInCommand: 'onLogInCommand'
      },
      loginPhoneView:{
        logInCommand: 'onLogInCommand'
      },
      loginTabletView:{
        logInCommand: 'onLogInCommand'
      },
      mainMenuDesktopView:{
        logOutCommand: 'onLogOutCommand'
      },
      mainMenuPhoneView:{
        logOutCommand: 'onLogOutCommand'
      },
      mainMenuTabletView:{
        logOutCommand: 'onLogOutCommand'
      }
    }
  },//eof config
  onLogInCommand: function(view, reference, username, password) {
    console.log('Reference: ' + reference + '\n' + 'Username: ' + username + '\n' + 'Password: ' + password);
    var me = this;
    if(Ext.os.is.Desktop) {
      var loginView = me.getLoginDesktopView();
      var mainMenuView = me.getMainMenuDesktopView();
    } else if(Ext.os.is.Phone) {
      var loginView = me.getLoginPhoneView();
      var mainMenuView = me.getMainMenuPhoneView();      
    } else if (Ext.os.is.Tablet) {
      var loginView = me.getLoginTabletView();
      var mainMenuView = me.getMainMenuTabletView();
    }
    if(username.length === 0 || password.length === 0){
      loginView.showLogInFailedMessage('Please enter your username and password.');
      return;
    }
    loginView.setMasked({
      xtype: 'loadmask',
      message: 'Logging In...'
    });
    Ext.Ajax.request({
      url: 'http://vanheemstrapictures.com/skin/api/services/login/', // make dynamic
      method: 'post',
      params: {}, // no params, but JSON instead
      jsonData: {
        'referenceValue': reference,
        'kindOfIdentity[0]': 'UserName',
        'identityValue[0]': username,
        'kindOfIdentity[1]': 'Password',
        'identityValue[1]': password
      },
      success: function(response){
        var loginResponse = Ext.JSON.decode(response.responseText);
       
        console.log('login response: ' + JSON.stringify(loginResponse)); // for testing only
        
        if(loginResponse.success){
          if(loginResponse.userNameFound){
            if(loginResponse.passwordFound){
              // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
              me.sessionToken = loginResponse.sessionToken;
              me.logInSuccess(); // just simulating success, test only
            } else {
              me.logInFailure('The password was not found.');
            }
          } else {
            me.logInFailure('The username was not found.');
          }
        } else {
          me.logInFailure(loginResponse.message);
        }
      },//eof of success
      failure: function(response){
        me.sessionToken = null;
        me.logInFailure('Login failed. Please try again later.');
      }//eof failure
    });
  },//eof onLogInCommand
  onLogOutCommand: function() {
    console.log('Logged out.');
    var me = this;
    //get the device orientation
    var orientation = Ext.Viewport.getOrientation();
    //Ext.Msg.alert("Orientation",orientation, Ext.emptyFn);
        
    //you can also get the height and width and determine the
    //orientation. This code just to show how to do it. You can
    // use either approach
    var height = Ext.Viewport.getWindowHeight();
    var width = Ext.Viewport.getWindowWidth();
    console.log('height: ' + height);
    console.log('width: ' + width);
    if(width > height){
      orientation = 'landscape';
    }
    else {
      orientation = 'portrait';
    } 
    if(Ext.os.is.Desktop) {
      console.log('I\'m a Desktop.');  
      var loginView = me.getLoginDesktopView();
      var headerView = me.getHeaderDesktopView();
      var layout0View = me.getLayout0DesktopView();
      var layout1View = me.getLayout1DesktopView();
      var layout2View = me.getLayout2DesktopView();   
      var landscapeView = me.getLandscapeDesktopView();
      var portraitView = me.getPortraitDesktopView();      
      var mainView = me.getMainDesktopView();
      //remove all the items from the header panel
      headerView.removeAll(false,false);
      headerView.add([layout0View]);
      if(orientation === 'landscape'){
        console.log('I\'m landscape.');
        //remove all the items from the landscape panel
        landscapeView.removeAll(false,false);  
        landscapeView.add([layout1View, loginView]);
        mainView.add([headerView, landscapeView]);
      } else if(orientation === 'portrait'){
        console.log('I\'m portrait.');
        //remove all the items from the portrait panel
        portraitView.removeAll(false,false);  
        portraitView.add([layout1View, loginView]);
        mainView.add([headerView, portraitView]);
      }
    } else if(Ext.os.is.Phone) {
      console.log('I\'m a Phone.');
      var loginView = me.getLoginPhoneView();
      var headerView = me.getHeaderPhoneView();
      var layout0View = me.getLayout0PhoneView();
      var layout1View = me.getLayout1PhoneView();
      var layout2View = me.getLayout2PhoneView();   
      var landscapeView = me.getLandscapePhoneView();
      var portraitView = me.getPortraitPhoneView();
      var mainView = me.getMainPhoneView(); 
      //remove all the items from the header panel
      headerView.removeAll(false,false);
      headerView.add([layout0View]);
      if(orientation === 'landscape'){
        console.log('I\'m landscape.');
        //remove all the items from the landscape panel
        landscapeView.removeAll(false,false);  
        landscapeView.add([layout1View, loginView]);
        mainView.add([headerView, landscapeView]);
      } else if(orientation === 'portrait'){
        console.log('I\'m portrait.');
        //remove all the items from the portrait panel
        portraitView.removeAll(false,false);  
        portraitView.add([layout1View, loginView]);
        mainView.add([headerView, portraitView]);
      }
    } else if (Ext.os.is.Tablet) {
      console.log('I\'m a Tablet.');
      var loginView = me.getLoginTabletView();
      var headerView = me.getHeaderTabletView();
      var layout0View = me.getLayout0TabletView();
      var layout1View = me.getLayout1TabletView();
      var layout2View = me.getLayout2TabletView();   
      var landscapeView = me.getLandscapeTabletView();
      var portraitView = me.getPortraitTabletView();
      var mainView = me.getMainTabletView();
      //remove all the items from the header panel
      headerView.removeAll(false,false);
      headerView.add([layout0View]);
      if(orientation === 'landscape'){
        console.log('I\'m landscape.');
        //remove all the items from the landscape panel
        landscapeView.removeAll(false,false);  
        landscapeView.add([layout1View, loginView]);
        mainView.add([headerView, landscapeView]);
      } else if(orientation === 'portrait'){
        console.log('I\'m portrait.');
        //remove all the items from the portrait panel
        portraitView.removeAll(false,false);  
        portraitView.add([layout1View, loginView]);
        mainView.add([headerView, portraitView]);
      }
    }
    
    Ext.Ajax.request({
      url: 'http://vanheemstrapictures.com/skin/api/services/logout/', // make dynamic
      method: 'post',
      params: {
        sessionToken: me.sessionToken
      },
      success: function(response) {
        // TODO: Implementation
      },
      failure: function(response) {
        // TODO: Implementation
      }
    });
    Ext.Viewport.animateActiveItem(mainView, this.getSlideRightTransition()); // this slides the whole viewport
    
    // WE MAY WANT TO CHANGE THIS BEHAVIOUR TO ONLY SLIDE THE LOGIN PART AND NOT THE WHOLE VIEWPORT
    
    
  },//eof onLogOutCommand
  logInSuccess: function() {
    console.log('Logged in.');
    var me = this;
    //get the device orientation
    var orientation = Ext.Viewport.getOrientation();
    //Ext.Msg.alert("Orientation",orientation, Ext.emptyFn);
        
    //you can also get the height and width and determine the
    //orientation. This code just to show how to do it. You can
    // use either approach
    var height = Ext.Viewport.getWindowHeight();
    var width = Ext.Viewport.getWindowWidth();
    console.log('height: ' + height);
    console.log('width: ' + width);
    if(width > height){
      orientation = 'landscape';
    }
    else {
      orientation = 'portrait';
    }
    if(Ext.os.is.Desktop) {
      console.log('I\'m a Desktop.');
      var loginView = me.getLoginDesktopView();
      var headerView = me.getHeaderDesktopView();
      var layout9View = me.getLayout9DesktopView();
      var landscapeView = me.getLandscapeDesktopView();
      var portraitView = me.getPortraitDesktopView();
      var mainMenuView = me.getMainMenuDesktopView();
      //remove all the items from the header panel
      headerView.removeAll(false,false);
      headerView.add([layout9View]);
      if(orientation === 'landscape'){
          console.log('I\'m landscape.');
          //remove all the items from the landscape panel
          landscapeView.removeAll(false,false);  
          //landscapeView.add([]); // TO DO: add a layout(s)
          mainMenuView.add([headerView, landscapeView]);
      } else if(orientation === 'portrait'){
          console.log('I\'m portrait.');
          //remove all the items from the portrait panel
          portraitView.removeAll(false,false);  
          //portraitView.add([]); // TO DO: add a layout(s)
          mainMenuView.add([headerView, portraitView]);
      }
    } else if(Ext.os.is.Phone) {
      console.log('I\'m a Phone.');   
      var loginView = me.getLoginPhoneView();
      var headerView = me.getHeaderPhoneView();
      var layout9View = me.getLayout9PhoneView();
      var landscapeView = me.getLandscapePhoneView();
      var portraitView = me.getPortraitPhoneView();
      var mainMenuView = me.getMainMenuPhoneView();
      //remove all the items from the header panel
      headerView.removeAll(false,false);
      headerView.add([layout9View]);
      if(orientation === 'landscape'){
          console.log('I\'m landscape.');
          //remove all the items from the landscape panel
          landscapeView.removeAll(false,false);  
          //landscapeView.add([]); // TO DO: add a layout(s)
          mainMenuView.add([headerView, landscapeView]);
      } else if(orientation === 'portrait'){
          console.log('I\'m portrait.');
          //remove all the items from the portrait panel
          portraitView.removeAll(false,false);  
          //portraitView.add([]); // TO DO: add a layout(s)
          mainMenuView.add([headerView, portraitView]);
      }
    } else if (Ext.os.is.Tablet) {
      console.log('I\'m a Tablet.');   
      var loginView = me.getLoginTabletView();
      var headerView = me.getHeaderTabletView();
      var layout9View = me.getLayout9TabletView();
      var landscapeView = me.getLandscapeTabletView();
      var portraitView = me.getPortraitTabletView();
      var mainMenuView = me.getMainMenuTabletView();
      //remove all the items from the header panel
      headerView.removeAll(false,false);
      headerView.add([layout9View]);
      if(orientation === 'landscape'){
          console.log('I\'m landscape.');
          //remove all the items from the landscape panel
          landscapeView.removeAll(false,false);  
          //landscapeView.add([]); // TO DO: add a layout(s)
          mainMenuView.add([headerView, landscapeView]);
      } else if(orientation === 'portrait'){
          console.log('I\'m portrait.');
          //remove all the items from the portrait panel
          portraitView.removeAll(false,false);  
          //portraitView.add([]); // TO DO: add a layout(s)
          mainMenuView.add([headerView, portraitView]);
      }
    }
    loginView.setMasked(false);
    
    //console.log('this: '+ this); // for testing only
    //alert("Viewport: " + Ext.Viewport.toSource()); // for testing only
    //console.log(Ext.Viewport.getActiveItem()); // for testing only
    
    Ext.Viewport.animateActiveItem(mainMenuView, this.getSlideLeftTransition()); // this slides the whole viewport
    
    // WE MAY WANT TO CHANGE THIS BEHAVIOUR TO ONLY SLIDE THE LOGIN PART AND NOT THE WHOLE VIEWPORT
    
  },//eof logInSuccess
  getSlideLeftTransition: function() {
    return {type: 'slide', direction: 'left'};
  },//eof getSlideLeftTransition
  getSlideRightTransition: function() {
    return {type: 'slide', direction: 'right'};
  },//eof getSlideRightTransition
  logInFailure: function(message) {
    console.log('Not logged in.');
    var me = this;
    if(Ext.os.is.Desktop) {
      var loginView = me.getLoginDesktopView();
    } else if(Ext.os.is.Phone) {
      var loginView = me.getLoginPhoneView();    
    } else if (Ext.os.is.Tablet) {
      var loginView = me.getLoginTabletView();
    }
    loginView.showLogInFailedMessage(message);
    loginView.setMasked(false);
  }//eof logInFailure
});