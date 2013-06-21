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
      url: 'api.php?api=services/login/', // make for real
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
    if(Ext.os.is.Desktop) {
      var loginView = me.getLoginDesktopView();
      var mainView = me.getMainDesktopView();
    } else if(Ext.os.is.Phone) {
      var loginView = me.getLoginPhoneView();
      var mainView = me.getMainPhoneView();     
    } else if (Ext.os.is.Tablet) {
      var loginView = me.getLoginTabletView();
      var mainView = me.getMainTabletView();
    }
    Ext.Ajax.request({
      url: 'api.php?api=services/logout/', // make for real
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