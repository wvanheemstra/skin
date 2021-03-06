/**
 * A TileView class
 * @author Willem van Heemstra
 */
Ext.define('Skin.view.extjs.component.TileView', {
    // Extend dataview
    extend: 'Ext.DataView',
	alias: "widget.tileview",
    config: {
        // Give it a custom baseCls so we can target this view and its items
        baseCls: 'skin-tile-view',

        // Give it a simple itemTpl which displays the field name within the item
        itemTpl: '{name}'
    }
});