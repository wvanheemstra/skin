/**
 * The list of tile view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.tile.View", {
    extend: "Skin.view.touch.main.base.View",
    alias: "widget.mainTileView",
    controller: "Skin.mediator.touch.main.tile.Mediator",

    requires: [
        //"Skin.view.touch.component.TileView"
    ],

    config: {

        layout: {
            type: "fit"
        },
        
        items: [
            {
                xtype: "titlebar",
                itemId: "titlebar",
                ui: "neutral",
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
                                key: "mainTile.logOut"
                            }
                        ]
                    },
					{
						xtype: "spacer"
					},
                    {
                        xtype: "button",
                        itemId: "newMainButton",
                        align: "right",
                        ui: "neutral", // WAS action
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
/*                      
            {
                xtype: "tileview",
                itemId: "tile",
                itemTpl: "{name}",
                autoScroll: true,
                emptyText: "No Mains"        	
            }
 */           
            {
                xtype: "list",
                itemId: "tile",
                ui: "neutral",
                fullscreen: true,
                itemTpl: "<div class='contact'>{name}</div>",
                grouped: false, // WAS true, but this causes an error
                onItemDisclosure: true,
                plugins: [
                    {
                        type: "localization",
                        method: "setLoadingText",
                        key: "mainTile.loading"
                    },
                    {
                        type: "localization",
                        method: "setEmptyText",
                        key: "mainTile.noMains"
                    }
                ],

                items: [
                    {
                        xtype: "titlebar" ,
                        itemId:"titlebar",
                        id:"titlebar",
                        docked: "top",
                        ui: "neutral",
                        items: [
                            {
                                xtype: "searchfield" ,
                                itemId:"searchInput",
                                id:"searchInput"
                            }
                        ]
                    }
                ]
            }// eof list                      
        ]
    }// eof config
});