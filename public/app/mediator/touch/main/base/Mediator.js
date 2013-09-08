/**
 * The main base mediator.
 */
Ext.define("Skin.mediator.touch.main.base.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event",
		"Skin.event.navigation.Event",
		"Skin.event.ui.Event",
		"Skin.event.title.Event",
		"Skin.event.company.Event",
		"Skin.event.url.Event",
		"Skin.event.background.Event"
    ],

    inject: [
        "mainStore",
        "logger"
    ]
    
});