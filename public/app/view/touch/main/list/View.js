/**
 * The list of mains view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.list.View", {
    extend: "Ext.Panel",
    alias: "widget.mainListView",
    controller: "Skin.mediator.touch.main.list.Mediator",

    requires: [
        "Ext.TitleBar",
        "Ext.dataview.List",
        "Ext.field.Search"
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
	                    ui: "action",
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
	            itemId: "list",
	            fullscreen: true,
	            itemTpl: "<div class='contact'>{name}</div>",
	            grouped: true,
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