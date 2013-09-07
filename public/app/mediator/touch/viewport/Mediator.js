/**
 * The viewport mediator essentially fulfils the passive view pattern for the application's Viewport.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; e.g. a login button on a desktop app could be click whereas mobile could be tap.
 *
 * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
 */
Ext.define("Skin.mediator.touch.viewport.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [   
		"Skin.event.session.Event",
        "Skin.event.background.Event", 		
        "Skin.event.ui.Event",     
        "Skin.event.company.Event",    
        "Skin.event.authentication.Event",
        "Skin.event.navigation.Event"
    ],

    inject: [
        "logger"
    ],

    config: {
        // create references to this mediator's views so we can listen to events and grab data from them
        loginView:              "loginView",
        mainSlideView:			"mainSlideView",		
        mainListView:			"mainListView",
        mainTileView:			"mainTileView",
        mainDetailView:		    "mainDetailView"
        //employeeListView:       "employeeListView",
        //employeeTileView:       "employeeTileView",
        //employeeDetailView:     "employeeDetailView"
    },

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

    /**
     * Initializes the view mediator and sets up global event bus handlers.
     */
    init: function() {
        this.logger.debug("init");
        return this.callParent();
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
	    this.eventBus.addGlobalEventListener(Skin.event.session.Event.GET_SESSION_SUCCESS, this.onGetSessionSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.session.Event.GET_SESSION_FAILURE, this.onGetSessionFailure, this); 	
        this.eventBus.addGlobalEventListener(Skin.event.navigation.Event.NAVIGATE, this.onNavigate, this);
    },

	/**
	 * Sets up the Viewport
	 *
	 */
	setupViewport: function(){
		this.logger.debug("setupViewport");

		var background = Skin.config.global.Config.getBackground();
		this.setBackground(background);		
		
		var ui = Skin.config.global.Config.getUi();
		this.setUI(ui);
		
		var company = Skin.config.global.Config.getCompany();
		this.setCompany(company);
		
		var id = Skin.config.global.Config.getId();
		var sessionId = Skin.config.global.Config.getSessionId();
		this.getSession(id, sessionId);
	},	

    /**
     * Sets the background
     *
	 * @param background	The background to set.	 
     */
    setBackground: function(background) {
        this.logger.debug("setBackground: background = " + background);
		var evt = Ext.create("Skin.event.background.Event", Skin.event.background.Event.SET_BACKGROUND, background);
		this.eventBus.dispatchGlobalEvent(evt);
    },
	
    /**
     * Sets the ui
     *
	 * @param ui	The ui to set.
     */
    setUI: function(ui) {
        this.logger.debug("setUI: ui = " + ui);
		var evt = Ext.create("Skin.event.ui.Event", Skin.event.ui.Event.SET_UI, ui);
		this.eventBus.dispatchGlobalEvent(evt);		
    },
    
    /**
     * Sets the company
     *
	 * @param company	The company to set.	 
     */
    setCompany: function(company) {
        this.logger.debug("setCompany: company = " + company);
		var evt = Ext.create("Skin.event.company.Event", Skin.event.company.Event.SET_COMPANY, company);
		this.eventBus.dispatchGlobalEvent(evt);
    },    

    /**
     * Maps the current application action like company, ui, login, logout, show a view, etc and navigates to a
     * corresponding view.
     *
     * @param action    The current application-level action.
     */
    navigate: function(action) {
        this.logger.debug("navigate: action = " + action);
        var view;
        var direction;
        switch(action) {      	

            case Skin.event.authentication.Event.LOGIN_SUCCESS:
            	// HERE WE GET WHICH VIEW TO GO TO
				var nextView = Skin.config.global.Config.getNextView();
                console.log("next view: " + nextView); // added by wvh, for testing only
				if(nextView == 'login') {view = this.getViewByXType("loginView");}
				if(nextView == 'mainslide') {view = this.getViewByXType("mainSlideView");}
				if(nextView == 'mainlist') {view = this.getViewByXType("mainListView");}
				if(nextView == 'maintile') {view = this.getViewByXType("mainTileView");}
                //if(nextView == 'employeelist') {view = this.getViewByXType("employeeListView");}
				//if(nextView == 'employeetile') {view = this.getViewByXType("employeeTileView");}
				Skin.config.global.Config.setCurrentView(nextView);
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.authentication.Event.LOGOUT_SUCCESS:
                view = this.getLoginView();
				Skin.config.global.Config.setCurrentView('login');
                direction = this.getSlideRightTransition();
                break;
				
            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_SLIDE:
                view = this.getMainSlideView();
				Skin.config.global.Config.setCurrentView('mainslide');
                direction = this.getSlideRightTransition();
                break;
				
            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_LIST:
                view = this.getMainListView();
				Skin.config.global.Config.setCurrentView('mainlist');
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_TILE:
                view = this.getMainTileView();
				Skin.config.global.Config.setCurrentView('maintile');
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_DETAIL:
                view = this.getMainDetailView();
				Skin.config.global.Config.setCurrentView('maindetail');
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_SLIDE:
                view = this.getMainSlideView();
				Skin.config.global.Config.setCurrentView('mainslide');
                direction = this.getSlideRightTransition();
                break;				
				
            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_LIST:
                view = this.getMainListView();
				Skin.config.global.Config.setCurrentView('mainlist');
                direction = this.getSlideRightTransition();
                break;
                
            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_TILE:
                view = this.getMainTileView();
				Skin.config.global.Config.setCurrentView('maintile');
                direction = this.getSlideRightTransition();
                break;

            // case Skin.event.navigation.Event.ACTION_SHOW_EMPLOYEE_DETAIL:
                // view = this.getEmployeeDetailView();
				// Skin.config.global.Config.setCurrentView('employeedetail');
                // direction = this.getSlideLeftTransition();
                // break;

            // case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_LIST:
                // view = this.getEmployeeListView();
				// Skin.config.global.Config.setCurrentView('employeelist');
                // direction = this.getSlideRightTransition();
                // break;

            // case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_TILE:
                // view = this.getEmployeeTileView();
				// Skin.config.global.Config.setCurrentView('employeetile');
                // direction = this.getSlideRightTransition();
                // break;
        }

        // only navigate to the screen if the view exist
        if(view != null) {
            Ext.Viewport.animateActiveItem(view, direction);
        } else {
            this.logger.warn("ViewportMediator.navigate: couldn't map navigation to action = ", action);
        }

    },
	
    /**
     * Check if there is still a session of a not-logged off user.
     *
	 * @param id	The id to get
	 * @param sessionId	The sessionId to get
     */
	getSession: function(id, sessionId) {
	    this.logger.debug("getSession: id = " + id + ", sessionId = " + sessionId);
    	var evt = Ext.create("Skin.event.session.Event", Skin.event.session.Event.GET_SESSION, id, sessionId);
        this.eventBus.dispatchGlobalEvent(evt);
	},
	
    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the get session success event
     */
    onGetSessionSuccess: function() { 
    	this.logger.debug("onGetSessionSuccess"); 	
    	// The next view to go to after login is set in the config file
        //var view = this.getView();
        //view.setLoading(false);
		this.navigate(Skin.event.authentication.Event.LOGIN_SUCCESS);		
    },
    
    /**
     * Handles the get session failure event
     */
    onGetSessionFailure: function() { 
    	this.logger.debug("onGetSessionFailure"); 
    	//Skin.config.global.Config.setCurrentView('login');
		this.navigate(Skin.event.authentication.Event.LOGOUT_SUCCESS);
    },	
	
    /**
     * Handles the navigation application event and passes on the action to a functional, testable method.
     */
    onNavigate: function(event) {
        this.logger.debug("onNavigate");
        this.navigate(event.action);
    }
});

