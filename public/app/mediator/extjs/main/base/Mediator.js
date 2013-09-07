/**
 * The main base mediator.
 */
Ext.define("Skin.mediator.extjs.main.base.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event"
    ],

    inject: [
        "mainStore",
        "logger"
    ],
	
	/**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
        this.eventBus.addGlobalEventListener(Skin.event.ui.Event.SET_UI_SUCCESS, this.onSetUISuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.authentication.Event.LOGIN_SUCCESS, this.onLoginSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_SLIDE_SUCCESS, this.onGetMainSlideSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_SLIDE_FAILURE, this.onGetMainSlideFailure, this);		
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_LIST_SUCCESS, this.onGetMainListSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_LIST_FAILURE, this.onGetMainListFailure, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_TILE_SUCCESS, this.onGetMainTileSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_TILE_FAILURE, this.onGetMainTileFailure, this);		
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.UPDATE_MAIN_SUCCESS, this.onUpdateMainSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.DELETE_MAIN_SUCCESS, this.onDeleteMainSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.CREATE_MAIN_SUCCESS, this.onCreateMainSuccess, this);
    },
	
    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the painted application-level event. Set the main detail view
     * as the current view.
     */    
    onPainted: function() {
		// placeholder
    },	

    /**
     * Handles the set ui success application-level event. Update the components for the ui.
     */
    onSetUISuccess: function() {
        // placeholder
    },

    /**
     * Handles the login success application-level event. Slide the main list view
     * onto stage.
     */
    onLoginSuccess: function() {
        // placeholder
    },

    /**
     * Handles the get mains success application-level event.
     */
    onGetMainSlideSuccess: function() {
        // placeholder
    },

    /**
     * Handles the get mains failure event from the login controller.
     */
    onGetMainSlideFailure: function() {
        // placeholder
    },
	
    /**
     * Handles the get mains success application-level event.
     */
    onGetMainListSuccess: function() {
        // placeholder
    },

    /**
     * Handles the get mains failure event from the login controller.
     */
    onGetMainListFailure: function() {
        // placeholder
    },

    /**
     * Handles the get mains success application-level event.
     */
    onGetMainTileSuccess: function() {
        // placeholder
    },

    /**
     * Handles the get mains failure event from the login controller.
     */
    onGetMainTileFailure: function() {
        // placeholder
    },
	
    /**
     * Handles the create main success application-level event. Navigates back to the main list view.
     */
    onCreateMainSuccess: function() {
        // placeholder
    },

    /**
     * Handles the update main success application-level event. Navigates back to the main list view.
     */
    onUpdateMainSuccess: function() {
        // placeholder
    },

    /**
     * Handles the delete main success application-level event. Navigates back to the main list view.
     */
    onDeleteMainSuccess: function() {
        // placeholder
    },

    /**
     * Handles the change of the selected record in the main store. Loads the appropriate record in the view or
     * resets it if the record is null.
     *
     * @param {Skin.store.main.Store} store The store that has the selected record.
     * @param {Skin.model.main.Model} record The selected record of the store.
     */
    onSelectedRecordChange: function(store, record) {
		// placeholder
    },	
    
});