/**
 * The modal of main view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
 Ext.define("Skin.view.touch.main.modal.View", {
    //extend: "Skin.view.touch.main.base.View",
    extend: "Ext.form.Panel",	
    alias: "widget.mainModalView",
    controller: "Skin.mediator.touch.main.modal.Mediator",

    requires: [
        "Ext.form.FieldSet"
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
			
/*	
			itemId: 'popbox',  
			hidden: true, // hide the view initially
			floating: true,  
			centered: true,  
			modal: true,  
			height: 200,  
			width: 300,  
			showAnimation: { type: 'slide', direction: 'left'},  
			styleHtmlContent: true,  
			html: 'Hi, I\'m a popup',  
*/			
			
			items: [{
				xtype: "button",
				itemId: "backButton",
				align: "left",
				plugins: [
					{
						type: "localization",
						method: "setText",
						key: "mainModal.back"
					}
				]
			}]
		}]
    }
});	