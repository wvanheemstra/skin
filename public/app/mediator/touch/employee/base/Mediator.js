/**
 * The employee base mediator.
 */
Ext.define("Skin.mediator.touch.employee.base.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.employee.Event"
    ],

    inject: [
        "employeeStore",
        "logger"
    ]
    
});