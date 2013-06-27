/*
 * Login
 * Ext.form.Panel
 */
Ext.define('skin.view.Login', {
  extend: 'Ext.form.Panel',
  alias: 'widget.loginview',
  requires: ['Ext.Img',
           'Ext.form.FieldSet',
           'Ext.field.Password',
           'Ext.TitleBar'
       ],
  config: {
    cls: 'login',   
    title: 'Login',
    flex: 2,
    items: []// eof items
  }// eof config
});