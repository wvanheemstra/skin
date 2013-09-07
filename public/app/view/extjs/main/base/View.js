/**
 * The base of mains view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.extjs.main.base.View", {
    extend: "Ext.Panel",
    //alias: "widget.mainListView",
    //controller: "Skin.mediator.extjs.main.list.Mediator",
    header: false,

    requires: [
        "Ext.data.*",
        "Ext.util.*",
        "Ext.view.View",
        "Skin.view.extjs.component.LiveSearchGridPanel",
        "nineam.locale.LocaleManager"
    ]

});
