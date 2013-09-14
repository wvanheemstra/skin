/**
 * The CompanyController acts like a service controller with asynchronous callback methods for successful
 * and failed company service calls.
 */
Ext.define("Skin.controller.company.Controller", {
    extend: "FlowMVC.mvc.controller.AbstractController",

    requires: [
        "Skin.event.company.Event",
        "FlowMVC.mvc.service.rpc.Responder"
    ],

    inject: [
        "companyService",
        "companyServiceClass",
        "logger"
    ],

    /**
     * @event Skin.event.company.Event.SET_COMPANY_SUCCESS
     * Fired when the company service is successful.
     */

    /**
     * @event Skin.event.company.Event.SET_COMPANY_FAILURE
     * Fired when the company service fails.
     */

    /**
     * Sets up global event bus handlers.
     * @protected
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
        this.eventBus.addGlobalEventListener(Skin.event.company.Event.SET_COMPANY, this.onSet, this);
    },

    /**
     * Performs company by using the referenced service and sets up the service success and failure
     * callback handlers.
     *
     * @param {String} company The company being passed to set the company.
     */
    set: function(company) {
        this.logger.debug("set: company = " + company);
//        var service = this.getService(this.companyServiceClass);
//        this.companyService.setUsePromise(true);
        this.executeServiceCall(this.companyService, this.companyService.set, [company], this.setSuccess, this.setFailure, this);
    },

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the successful company service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the successful service call.
     */
    setSuccess: function(response) {
        this.logger.info("setSuccess");
		
		// Update the config for the company set
		Skin.config.global.Config.setCompany(response.company);		
		
        var evt = Ext.create("Skin.event.company.Event", Skin.event.company.Event.SET_COMPANY_SUCCESS);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed company service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the failed service call.
     */
    setFailure: function(response) {
        this.logger.warn("setFailure");
        var evt = Ext.create("Skin.event.company.Event", Skin.event.company.Event.SET_COMPANY_FAILURE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the set event on the application-level event bus. Grabs the company
     * and calls a functional method that's more testable than this event handler.
     *
     * @param {Skin.event.company.Event} event Reference to the set event. Contains the company.
     */
    onSet: function(event) {
        var company = event.company;
        this.logger.debug("onSet");
        this.set(company);
    }
});