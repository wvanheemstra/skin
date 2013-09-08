/**
 * The modal of main view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
 Ext.define("Skin.view.touch.main.modal.View", {
    extend: "Skin.view.touch.main.base.View",
    alias: "widget.mainModalView",
    controller: "Skin.mediator.touch.main.modal.Mediator",

    requires: [
        // empty
    ],
	
	config: {
        items: [{
			xtype: "titlebar",
			itemId: "titlebar",
			ui: "neutral",
			docked: "top",
			plugins: [
				{
					type: "localization",
					method: "setTitle",
					key: "mainModal.title"
				}
			],
			items: [{
				xtype: "button",
				iconMask: true,
				iconCls: 'delete',
				itemId: "closeButton",
				align: "left",
				plugins: [
					{
						type: "localization",
						method: "setText",
						key: "mainModal.close"
					}
				]
			}]
		}]
    }
});	