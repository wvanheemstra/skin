/*
 * Login
 * skin.view.Login
 */
Ext.define('skin.view.desktop.Login', {
  extend: 'skin.view.Login',
  alias: 'widget.logindesktopview', 
  requires: ['Ext.util.DelayedTask'],
  config: {
    cls: 'desktop-login', 
    title: 'Login',
    flex: 2,
    /*style: 'border: 1px solid red',*/
    items: [
      {
        xtype: 'image',
        src: Ext.Viewport.getOrientation() === 'portrait' ? 'resources/img/padlock_closed.png' : 'resources/img/padlock_closed.png',
        style: Ext.Viewport.getOrientation() === 'portrait' ? 'width:80px;height:80px;margin:auto' : 'width:40px;height:40px;margin:auto'
      },
      {
        xtype: 'label',
        html: 'Login failed. Please enter the correct credentials.',
        itemId: 'logInFailedLabelDesktop',
        hidden: true,
        hideAnimation: 'fadeOut',
        showAnimation: 'fadeIn',
        style: 'color:#990000;margin:5px 0px;'
      },
      {
        xtype: 'fieldset',
        title: 'Desktop Login',
        items: [
          {
            xtype: 'textfield',
            hidden: true,
            placeHolder: 'Reference',
            itemId: 'referenceTextFieldDesktop',
            name: 'referenceTextField',
            required: true,
            value: '1234567890'
          },
          {
            xtype: 'textfield',
            placeHolder: 'Username',
            itemId: 'userNameTextFieldDesktop',
            name: 'userNameTextField',
            required: true
          },
          {
            xtype: 'passwordfield',
            placeHolder: 'Password',
            itemId: 'passwordTextFieldDesktop',
            name: 'passwordTextField',
            required: true
          }
        ]
      },
      {
        xtype: 'button',
        itemId: 'logInButtonDesktop',
        ui: 'action',
        padding: '10px',
        text: 'Log In',
        bubbleEvents: ['processLogInButton'],
        listeners: {
            tap: function() {
                console.log("You tapped logInButtonDesktop");
                this.fireEvent('processLogInButton', this);
            }
        }
      }
    ],// eof items
    listeners: {
      processLogInButton: function(){
          console.log("Processing LogInButton");
          var me = this; //  The 'this' variable is a reference to the Window object,
          // while the 'me' variable is a reference to the Login view, which is a Form panel
          var referenceField = me.down('#referenceTextFieldDesktop');
          var userNameField = me.down('#userNameTextFieldDesktop');
          var passwordField = me.down('#passwordTextFieldDesktop');
          var logInFailedLabel = me.down('#logInFailedLabelDesktop');
          logInFailedLabel.hide();
          var reference = referenceField.getValue();
          var userName = userNameField.getValue();
          var password = passwordField.getValue();
          // using a delayed task in order 
          // to give the hide animation above time 
          // to finish before executing the next steps.
          var task = Ext.create('Ext.util.DelayedTask', function() {
            logInFailedLabel.setHtml('');
            me.fireEvent('logInCommand', me, reference, userName, password);
            console.log('Fired logInCommand for reference: ' + reference + ' userName: ' + userName + ' password: ' + password + '.');
            userNameField.setValue('');
            passwordField.setValue('');
          });
          task.delay(500);          
      }//eof processingLogInButton
    }// eof listeners
  },// eof config
  showLogInFailedMessage: function (message) {
    var label = this.down('#logInFailedLabelDesktop');
    label.setHtml(message);
    label.show();
  }// eof showLogInFailedMessage
});

