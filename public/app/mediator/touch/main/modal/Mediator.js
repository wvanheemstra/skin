/**
 * The main modal mediator essentially fulfils the passive view pattern for the main modal view.
 */
Ext.define("Skin.mediator.touch.main.modal.Mediator", {
    extend: "Skin.mediator.touch.main.base.Mediator",

    requires: [
        // all set in the base mediator
    ],	
	
    // set up view event to mediator mapping
    control: {
	
	    closeButton: {
            tap: "onCloseButtonTap"
        },
	
//		'button[action=hide]': {
//			tap: 'hide'
//		},
    	titlebar: {
    		painted: "onPainted"
    	}
//        logoutButton: {
//            tap: "onLogoutButtonTap"
//        },
//        newMainButton: {
//            tap: "onNewMainButtonTap"
//        },
//        searchInput :{
//            keyup:          "onSearchKeyUp",
//            clearicontap:   "onSearchClearIconTap"
//        },
//        list: {
//            disclose: "onListDisclose"
//        }
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
        this.eventBus.addGlobalEventListener(Skin.event.ui.Event.SET_UI_SUCCESS, this.onSetUISuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.title.Event.SET_TITLE_SUCCESS, this.onSetTitleSuccess, this);		
//        this.eventBus.addGlobalEventListener(Skin.event.authentication.Event.LOGIN_SUCCESS, this.onLoginSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_MODAL_SUCCESS, this.onGetMainModalSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_MODAL_FAILURE, this.onGetMainModalFailure, this);
    },

    /**
     * Simple navigation method used to navigate back, depending on the previous view.
	 *
	 * @param view	The view to go back to.
     */
    backToPrevious: function(view) {
    	this.logger.debug("backToPrevious view: " + view);
        switch(view) {
            case 'mainslide':
            	this.backToMainSlide();
                break;		
            case 'mainlist':
            	this.backToMainList();
                break;
            case 'maintile':
            	this.backToMainTile();
                break; 				
        }
    },
	
    /**
     * Simple navigation method used to navigate back to the main slide view.
     */
    backToMainSlide: function() {
        this.logger.debug("backToMainSlide");
        this.navigate(Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_SLIDE);
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
     * Handles the set UI event. 
     *
     * @param ui    The ui to set.	 
     */
    setUI: function(ui) {
    	this.logger.debug("setUI: ui = " + ui);
		for ( var i=0; i<this.getView().items.length; i++)
        {
            this.getView().items.getAt(i).setUi(ui);
        }
		//this.getView().refresh();
    },     

    /**
     * Handles the set Title event. 
     *
     * @param title    The title to set.	 
     */
    setTitle: function(title) {
    	this.logger.debug("setTitle: title = " + title);
		for ( var i=0; i<this.getView().items.length; i++)
        {
            this.getView().items.getAt(i).setTitle(title);
        }
		//this.getView().refresh();
    }, 	
	
    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the painted application-level event. 
     */    
    onPainted: function() {
	    this.logger.debug("onPainted");

		// TEMP fix: 
		this.onSetTitleSuccess();
    },

    /**
     * Handles the set ui success application-level event. Update the components for the ui.
     */
    onSetUISuccess: function() {
        this.logger.debug("onSetUISuccess");
        this.setUI(Skin.config.global.Config.getUi());
    },

    /**
     * Handles the set title success application-level event. Update the components for the title.
     */
    onSetTitleSuccess: function() {
        this.logger.debug("onSetTitleSuccess");
        this.setTitle(Skin.config.global.Config.getTitle());
    },	
	
    /**
     * Handles the get mains application-level event.
     */
    onGetMainModalSuccess: function() {
        this.logger.debug("onGetMainModalSuccess");
        this.getView().setMasked(false);
        //this.getList().setStore(this.mainStore);
    },

    /**
     * Handles the get mains failure event from the login controller.
     */
    onGetMainModalFailure: function() {
        this.logger.debug("onGetMainModalFailure");
        this.getView().setMasked(false);
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the close button tap event. Navigates back to the previous main view.
     */
    onCloseButtonTap: function() {
        this.logger.debug("onCloseButtonTap");
        this.backToPrevious(Skin.config.global.Config.getPreviousView());
    }
	
});