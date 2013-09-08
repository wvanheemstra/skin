/**
 * The main modal mediator essentially fulfils the passive view pattern for the main list view.
 */
Ext.define("Skin.mediator.extjs.main.modal.Mediator", {
    extend: "Skin.mediator.extjs.main.base.Mediator",

    // set up view event to mediator mapping
    control: {
//    	toolbar: {
//    		painted: "onPainted"
//    	},	
//        logoutButton: {
//            click: "onLogoutButtonClick"
//        },
//        newMainButton: {
//            click: "onNewMainButtonClick"
//        },
//        list: {
//            itemclick: "onListSelect"
//        }
    },


    /**
     * Handles the set UI event. 
	 *
     * @param ui    The ui to be set.
     */
    setUI: function(ui) {
    	this.logger.debug("setUI: ui = " + ui);
		for ( var i=0; i<this.getView().items.length; i++)
        {
            this.getView().items.getAt(i).setUI(ui);
        }
    },
	
    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the painted application-level event. Set the main list view
     * as the current view.
     */    
    onPainted: function() {
        this.logger.debug("onPainted");	
    },

    /**
     * Handles the set ui success application-level event. Update the components for the ui.
     */
    onSetUISuccess: function() {
        this.logger.debug("onSetUISuccess");
        this.setUI(Skin.config.global.Config.getUi());
    },	
	
    /**
     * Handles the get mains success application-level event.
     */
    onGetMainModalSuccess: function() {
		if(Skin.config.global.Config.getNextView()==='mainmodal') {
			this.logger.debug("onGetMainModalSuccess");
			this.getView().setLoading(false);
			//this.getList().getStore().loadRecords(this.mainStore.getRange());
		}
    },

    /**
     * Handles the get mains failure event from the login controller.
     */
    onGetMainModalFailure: function() {
		if(Skin.config.global.Config.getNextView()==='mainmodal') {
			this.logger.debug("onGetMainModalFailure");
			this.getView().setLoading(false);
		}
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

	// TO DO

});

