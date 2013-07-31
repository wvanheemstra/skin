/**
 * The list of mains view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.tile.View", {
    extend: "Ext.Panel",
    alias: "widget.mainTileView",
    controller: "Skin.mediator.touch.main.tile.Mediator",

    requires: [
        "Ext.TitleBar",
        "Ext.dataview.List",
        "Ext.field.Search",
        "Skin.view.touch.component.TileView"
    ],

    config: {

        layout: {
            type: "fit"
        },

        items: [
            {
                xtype: "titlebar",
                docked: "top",
                plugins: [
                    {
                        type: "localization",
                        method: "setTitle",
                        key: "mainTile.title"
                    }
                ],
                items: [
                    {
                        xtype: "button",
                        itemId: "logoutButton",
                        align: "left",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "mainTile.logOff"
                            }
                        ]
                    },
                    {
                        xtype: "button",
                        itemId: "newMainButton",
                        align: "right",
                        ui: "action",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "mainTile.new"
                            }
                        ]
                    }
                ]
            },           
            {
                xtype: "tileview",
                itemId: "tile",
                itemTpl: "{name}",
                autoScroll: true,
                emptyText: "No Mains"      	
            }
                     
        ]
    }
});