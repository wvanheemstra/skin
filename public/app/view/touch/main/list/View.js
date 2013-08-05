/**
 * The list of main view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.list.View", {
    extend: "Skin.view.touch.main.base.View",
    alias: "widget.mainListView",
    controller: "Skin.mediator.touch.main.list.Mediator",

    requires: [
        //"Skin.view.touch.component.ListView"
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
                        key: "mainList.title"
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
                                key: "mainList.logOff"
                            }
                        ]
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
                                key: "mainList.new"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "list",
                //xtype: "listview",
                itemId: "list",
                fullscreen: true,
				ui: "neutral",
                itemTpl: "<div class='contact'>{name}</div>",
                grouped: false,// WAS true, grouped currently causes an error
                onItemDisclosure: true,
                plugins: [
                    {
                        type: "localization",
                        method: "setLoadingText",
                        key: "mainList.loading"
                    },
                    {
                        type: "localization",
                        method: "setEmptyText",
                        key: "mainList.noMains"
                    }
                ],

                items: [
                    {
                        xtype: "titlebar" ,
                        itemId:"titlebar",
                        id:"titlebar",
                        docked: "top",

                        items: [
                            {
                                xtype: "searchfield" ,
                                itemId:"searchInput",
                                id:"searchInput"
                            }
                        ]
                    }
                ]
            }
        ]
    }
});