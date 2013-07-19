/**
 * The main event contains data and event types to perform CRUD operations on ... .
 */
Ext.define("Skin.event.main.Event", {
    extend: "FlowMVC.mvc.event.AbstractEvent",
    
    statics: {
    	
    	// ... more
    	
    },

	// ... more

    /**
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * @param {String} type The event type.
     */
    constructor: function(type) {
        this.callParent(arguments);

    }
})	