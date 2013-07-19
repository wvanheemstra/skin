/**
 * The MainController acts as the command with asynchronous callback methods for successful
 * and failed main service calls.eError: "undefined" is not a function(evaluating "controller.getStores()")
 */
Ext.define("Skin.controller.main.Controller", {
    extend: "FlowMVC.mvc.controller.AbstractController",

    requires: [
        "Skin.event.main.Event",
        "FlowMVC.mvc.service.rpc.Responder"
    ],

    inject: [
        "mainService",
        //"mainStore",
        "logger"
    ],
    
    // ... more
    
    /**
     * Sets up global event bus handlers.
     * @protected
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
        
        // ... more
        
    }
    
    // ... more
    
});    