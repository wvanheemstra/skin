/*
 * Layout2
 * skin.view.Layout2
 */
Ext.define('skin.view.tablet.Layout2', {
    extend: 'skin.view.Layout2',
    alias : 'widget.layout2tabletview',
  views: ['skin.view.tablet.Login'],
  requires: ['skin.view.tablet.Login'],
    config: {
       //html: 'This panel takes 67% of the available space',
         style: 'background-color: #8b8989',
         flex: 2,
    padding: 10,
    items: [] // eof items
  }// eof config
});