/*
 * SetLayout
 * Ext.app.Controller
 */
Ext.define('skin.controller.SetLayout', {
  extend : 'Ext.app.Controller',
  config: {
    profile: Ext.os.deviceType.toLowerCase(),
    refs: {
      myContainer: 'mainview'
    },
    isLoggedIn: false, // defaults to false
    control: {
      'mainview': {
        activate: 'onActivate'
      },
      'viewport': {
        //capture the orientation change event
        orientationchange: 'onOrientationchange'
      }
    } 
  },
  onActivate: function() {
    console.log('Main container is active');
  },
  init: function() {
    console.log('Controller initialized');
  },
  onLoggedIn:function() {
    this.isLoggedIn = true;
    console.log('Is Logged In.');
  },
  onLoggedOut:function() {
    this.isLoggedIn = false;
    console.log('Is Logged Out.');    
  },  
  onOrientationchange: function(viewport, orientation, width, height) {
    console.log('Viewport orientation just changed');
    //Ext.Msg.alert("Orientation",orientation, Ext.emptyFn);
    //another way to check the orientation is by checking the 
    //height and width of the screen window
    //There are some issues with the orientation when the code
    //was run on an Android Tablet so you check the height and 
    //width for a temporary fix until sencha provides one.
    console.log('height: ' + height);
    console.log('width: ' + width);
    if(width > height){
      orientation = 'landscape';
    }
    else {
      orientation = 'portrait';
    }
    console.log('Orientation is ' + orientation);    
    //remove all the items from the main panel
    this.getMyContainer().removeAll(false,false);
    //add the landscape panel based on orientation 
    if(orientation == 'landscape'){
      //console.log(landscapeView.getItems());
      if(this.isLoggedIn) { // PUT CHECK FOR LOGGED IN USER HERE, OTHERWISE SHOW LOGIN VIEW
        landscapeView.add([layout1View,layout2View]);
      }
      else {
        landscapeView.add([layout1View,loginView]);
      }
      this.getMyContainer().add([landscapeView]);
    }
    //add the portrait panel based on orientation 
    if(orientation == 'portrait'){
      //console.log(portraitView.getItems());
      if(this.isLoggedIn) { // PUT CHECK FOR LOGGED IN USER HERE, OTHERWISE SHOW LOGIN VIEW
        portraitView.add([layout1View,layout2View]);
      }
      else {
        portraitView.add([layout1View,loginView]); 
      }
      this.getMyContainer().add([portraitView]);
    }
  },
  launch: function() {
    console.log('Controller launched');
    //create a single instance of all the panels as global variables
    //so we can use them to add and remove without creating them 
    //again and again. (Not sure if creating again is better approach!)
    //Also this way it keeps the information that was entered on the
    //screen when the device orientation without you saving and restoring
    //each component
    if(Ext.os.is.Desktop){
      layout1View = Ext.widget('layout1desktopview');
      layout2View = Ext.widget('layout2desktopview');
      loginView = Ext.widget('logindesktopview');
      mainMenuView = Ext.widget('mainmenudesktopview');
      landscapeView = Ext.widget('landscapedesktopview');
      portraitView = Ext.widget('portraitdesktopview');
    } else if(Ext.os.is.Phone) {
      layout1View = Ext.widget('layout1phoneview'); 
      layout2View = Ext.widget('layout2phoneview');
      loginView = Ext.widget('loginphoneview'); 
      mainMenuView = Ext.widget('mainmenuphoneview');
      landscapeView = Ext.widget('landscapephoneview'); 
      portraitView = Ext.widget('portraitphoneview'); 
    } else if(Ext.os.is.Tablet) {
      layout1View = Ext.widget('layout1tabletview'); 
      layout2View = Ext.widget('layout2tabletview');
      loginView = Ext.widget('logintabletview');
      mainMenuView = Ext.widget('mainmenutabletview');
      landscapeView = Ext.widget('landscapetabletview');
      portraitView = Ext.widget('portraittabletview'); 
    }
       
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
    console.log('Orientation is ' + orientation);
        
    //set panels inside the main Panel based on orientation
    if(orientation == 'landscape'){
      if(this.isLoggedIn) { // PUT CHECK FOR LOGGED IN USER HERE, OTHERWISE SHOW LOGIN VIEW
        landscapeView.add([layout1View,layout2View]);
      }
      else {
        landscapeView.add([layout1View,loginView]);
      }
      this.getMyContainer().add([landscapeView]);
    }
    if(orientation == 'portrait'){
      if(this.isLoggedIn) { // PUT CHECK FOR LOGGED IN USER HERE, OTHERWISE SHOW LOGIN VIEW
        portraitView.add([layout1View,layout2View]);
      }
      else {
        portraitView.add([layout1View,loginView]);
      }
      this.getMyContainer().add([portraitView]);
    }
  },     
});