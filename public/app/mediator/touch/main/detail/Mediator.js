/**
 * The main detail mediator essentially fulfills the passive view pattern for the main detail view.
 */
Ext.define("Skin.mediator.touch.main.detail.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event",
        "Skin.event.navigation.Event"
    ],

    inject: [
        "mainStore",
        "logger"
    ],

    // set up view event to mediator mapping
    control: {
        backButton: {
            tap: "onBackButtonTap"
        },

        saveMainButton: {
            tap: "onSaveMainButtonTap"
        },

        deleteButton: {
            tap: "onDeleteButtonTap"
        }
    },

    // set up injected object event listening
    observe: {
        mainStore: {
            selectedRecordChange: "onSelectedRecordChange"
        }
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(Skin.event.main.Event.CREATE_MAIN_SUCCESS, this.onCreateMainSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.UPDATE_MAIN_SUCCESS, this.onUpdateMainSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.DELETE_MAIN_SUCCESS, this.onDeleteMainSuccess, this);
    },

    /**
     * Functional method to save a main. Determines if the main is new and it needs to be
     * created, or existing and needs to be updated and fires off the corresponding application-level event.
     *
     * @param main    The main is the data model for the item in the list currently selected.
     */
    saveMain: function(main) {
        this.logger.debug("saveMain");

        var evt;
        var msg;

        if(main != null) {

            var id = main.id;

            if( (id != null) && (id != "") ) {
                evt = Ext.create("Skin.event.main.Event", Skin.event.main.Event.UPDATE_MAIN);
                msg = nineam.locale.LocaleManager.getProperty("mainDetail.updatingMain");
            } else {
                evt = Ext.create("Skin.event.main.Event", Skin.event.main.Event.CREATE_MAIN);
                msg = nineam.locale.LocaleManager.getProperty("mainDetail.creatingMain");
            }

            this.getView().setMasked({
                xtype: "loadmask",
                message: msg
            });

            evt.main = main;
            this.eventBus.dispatchGlobalEvent(evt);
        }
    },

    /**
     * Functional method to delete a main. Fires off the corresponding application-level event.
     *
     * @param main    The main is the data model for the item in the list currently selected.
     */
    deleteMain: function(main) {
        this.logger.debug("deleteMain");

        if(main != null) {

            this.getView().setMasked({
                xtype: "loadmask",
                message: nineam.locale.LocaleManager.getProperty("mainDetail.deletingMain")
            });

            var evt = Ext.create("Skin.event.main.Event", Skin.event.main.Event.DELETE_MAIN);
            evt.main = main;

            this.eventBus.dispatchGlobalEvent(evt);
        }
    },

    /**
     * Simple navigation method used to navigate back, depending on the previous view.
     */
    backToPrevious: function() {
        switch(Skin.config.global.Config.getPreviousView()) {
            case 'mainListView':
            	this.backToMainList();
                break;
            case 'mainTileView':
            	this.backToMainTile();
                break;               
        }
    },

    /**
     * Simple navigation method used to navigate back to the main list view.
     */
    backToMainList: function() {
        this.logger.debug("backToMainList");

        this.navigate(Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_LIST);
    },

    /**
     * Simple navigation method used to navigate back to the main tile view.
     */
    backToMainTile: function() {
        this.logger.debug("backToMainTile");

        this.navigate(Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_TILE);
    },

    /**
     * Rests the view to it's default state -- no record set on the view's fields.
     */
    reset: function() {
        this.logger.debug("reset");

        this.getView().setMasked(false);
        this.getView().setRecord(null);
        this.getView().reset();
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the create main success application-level event. Navigates back to the main view.
     */
    onCreateMainSuccess: function() {
        this.logger.debug("onCreateMainSuccess");

        this.getView().setMasked(false);
        this.backToPrevious(); // WAS this.backToMainList();
    },

    /**
     * Handles the update main success application-level event. Navigates back to the main view.
     */
    onUpdateMainSuccess: function() {
        this.logger.debug("onUpdateMainSuccess");

        this.getView().setMasked(false);
        this.backToPrevious(); // WAS this.backToMainList();
    },

    /**
     * Handles the delete main success application-level event. Navigates back to the main view.
     */
    onDeleteMainSuccess: function() {
        this.logger.debug("onDeleteMainSuccess");

        this.reset();
        this.backToPrevious(); // WAS this.backToMainList();
    },

    /**
     * Handles the change of the selected record in the main store. Loads the appropriate record in the view or
     * resets it if the record is null.
     *
     * @param {Skin.store.MainStore} store The store that has the selected record.
     * @param {Skin.model.MainModel} record The selected record of the store.
     */
    onSelectedRecordChange: function(store, record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", main = " + record.get("name")
            : "new main";
        this.logger.debug("onSelectedRecordChange = " + logMsg);

        if (record) {
            this.getView().setRecord(record);
        } else {
            this.reset();
        }
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the back button tap event. Navigates back to the main view.
     */
    onBackButtonTap: function() {
        this.logger.debug("onBackButtonTap");

        this.backToPrevious(); // WAS this.backToMainList();
    },

    /**
     * Handles the save button tap event. Grabs the view's current main data and passes the record
     * to the functional save method.
     */
    onSaveMainButtonTap: function() {
        this.logger.debug("onSaveMainButtonTap");

        var main = this.getView().getRecord();
        var newMain = this.getView().getValues();

        // if this is a new main record, there's no id available
        if(main != null) {
            newMain.id = main.data.id;
        }

        this.saveMain(newMain);
    },

    /**
     * Handles the delete button tap event. Grabs the view's current main data and passes the record
     * to the functional delete method.
     */
    onDeleteButtonTap: function() {
        this.logger.debug("onDeleteButtonTap");

        var main = this.getView().getRecord();

	    if(main) {
		    this.deleteMain(main.data);
	    }
    }

});