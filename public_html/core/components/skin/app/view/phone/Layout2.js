/*
 * Layout2
 * skin.view.Layout2
 */
Ext.define('skin.view.phone.Layout2', {
    extend: 'skin.view.Layout2',
    alias : 'widget.layout2phoneview',
  views: ['skin.view.phone.Login'],
  requires: ['skin.view.phone.Login'],
    config: {
       //html: 'This panel takes 67% of the available space',
         style: 'background-color: #8b8989',
         flex: 2,
    padding: 10,
    items: [] // eof items
  }// eof config
});