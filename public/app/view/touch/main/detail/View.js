/**
 * The main details view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.detail.View", {
    extend: "Ext.form.Panel",
    alias: "widget.mainDetailView",
    controller: "Skin.mediator.touch.main.detail.Mediator",

    requires: [
        "Ext.form.FieldSet",
        "Ext.Toolbar"
    ],

    config: {

        items: [
            {
                xtype: "titlebar",
                docked: "top",
                plugins: [
                    {
                        type: "localization",
                        method: "setTitle",
                        key: "mainDetail.title"
                    }
                ],
                items: [
                    {
                        xtype: "button",
                        itemId: "backButton",
                        align: "left",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "mainDetail.back"
                            }
                        ]
                    },
                    {
                        xtype: "button",
                        itemId: "saveMainButton",
                        align: "right",
                        ui: "action",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "mainDetail.save"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "fieldset",
                itemId: "fieldset",
                items: [
                    {
                        xtype: "textfield",
                        itemId: "nameTextField",
                        name: "name",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "mainDetail.name"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "button",
                itemId: "deleteButton",
                align: "center",
                ui: "action",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "mainDetail.delete"
                    }
                ]
            }
        ]
    }
});