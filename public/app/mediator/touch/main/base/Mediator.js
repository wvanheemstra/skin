/**
 * The main base mediator.
 */
Ext.define("Skin.mediator.touch.main.base.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event"
    ],

    inject: [
        "mainStore",
        "logger"
    ]
    
});