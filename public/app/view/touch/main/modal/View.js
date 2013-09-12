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
		layout: {
			type: "fit"
		},
		src: 'about:blank',
		loadingText: 'Loading ...', // Make this dynamic
		// border: false,
		scroll : "vertical",
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
		},{
			xtype: "toolbar",
			itemId: "bottombar",
			ui: "neutral",
			docked: "bottom"
		}]
    },
	initComponent: function(){
		this.updateHTML();
		this.callParent(arguments);
	},
	updateHTML: function() {
		console.log("updateHTML");
		this.html='<iframe id="iframe-'+this.id+'"'+
			' style="overflow:auto;width:100%;height:100%;"'+
			' frameborder="0" '+
			' src="'+this.src+'"'+
			'></iframe>';
	}
});	