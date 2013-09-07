/**
 * The employee base mediator.
 */
Ext.define("Skin.mediator.extjs.employee.base.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.employee.Event"
    ],

    inject: [
        "employeeStore",
        "logger"
    ]
    
});