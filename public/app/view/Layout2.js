/*
 * Layout2
 * Ext.Panel
 */
Ext.define('skin.view.Layout2', {
    extend: 'Ext.Panel',
    alias : 'widget.layout2view',
  views: ['skin.view.Login'],
  requires: ['skin.view.Login'],
    config: {
       //html: 'This panel takes 67% of the available space',
         style: 'background-color: #8b8989',
         flex: 2,
    padding: 10,
    items: [] // eof items
  }// eof config
});