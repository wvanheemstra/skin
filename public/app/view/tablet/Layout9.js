/*
 * Layout9
 * skin.view.Layout9
 */
Ext.define('skin.view.tablet.Layout9', {
    extend: 'skin.view.Layout9',
    alias : 'widget.layout9tabletview',
    config: {
        cls: 'tablet-layout9',   
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            margin: '0 0 0 0'
        },
        items: [{
          xtype: 'titlebar',
          title: 'Tablet Layout 9',
          docked: 'top',
          items: [
            {
              xtype: 'button',
              text: 'Log Out',
              itemId: 'logOutButtonTablet',
              align: 'right',
              bubbleEvents: ['processLogOutButton'],
              listeners: {
                tap: function() {
                    console.log("You tapped logOutButtonTablet");
                    this.fireEvent('processLogOutButton', this);
                }
              }
            }
          ]
        }],//eof items
        listeners: {
          processLogOutButton: function(){
            console.log("Processing LogOutButton");
            this.fireEvent('logOutCommand');
          }//eof processLogOutButton
        }// eof listeners        
    }
});