/**
 * The viewport mediator essentially fulfils the passive view pattern for the application's Viewport.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; e.g. a login button on a desktop app could be click whereas mobile could be tap.
 *
 * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
 */
Ext.define("Skin.mediator.extjs.viewport.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
		"Skin.event.session.Event",
        "Skin.event.ui.Event",     
        "Skin.event.company.Event",	
        "Skin.event.url.Event",
        "Skin.event.background.Event",		
        "Skin.event.authentication.Event",
        "Skin.event.navigation.Event"
    ],

    inject: [
        "logger"
    ],

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

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

		var ui = Skin.config.global.Config.getUi();
		this.setUI(ui);
		
		var background = Skin.config.global.Config.getBackground();
		this.setBackground(background);	
		
		var company = Skin.config.global.Config.getCompany();
		this.setCompany(company);
		
		var url = Skin.config.global.Config.getUrl();
		this.setURL(url);	
		
		var id = Skin.config.global.Config.getId();
		var sessionId = Skin.config.global.Config.getSessionId();
		this.getSession(id, sessionId);
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
     * Sets the url
     *
	 * @param url	The url to set.	 
     */
    setURL: function(url) {
        this.logger.debug("setURL: url = " + url);
		var evt = Ext.create("Skin.event.url.Event", Skin.event.url.Event.SET_URL, url);
		this.eventBus.dispatchGlobalEvent(evt);
    },
	
    /**
     * Maps the current application action like login, logout, show a view, etc and navigates to a
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
                console.log("next view: " + nextView);
				if(nextView == 'login') {view = this.getViewByXType("loginView");}
				if(nextView == 'mainslide') {view = this.getViewByXType("mainSlideView");}
				if(nextView == 'mainlist') {view = this.getViewByXType("mainListView");}
				if(nextView == 'maintile') {view = this.getViewByXType("mainTileView");}				
                if(nextView == 'employeelist') {view = this.getViewByXType("employeeListView");}
				if(nextView == 'employeetile') {view = this.getViewByXType("employeeTileView");}
				Skin.config.global.Config.setCurrentView(nextView);
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.authentication.Event.LOGOUT_SUCCESS:
                view = this.getViewByXType("loginView");
				Skin.config.global.Config.setCurrentView('login');
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_DETAIL:
                view = this.getViewByXType("mainDetailView");
				Skin.config.global.Config.setCurrentView('maindetail');
                direction = this.getSlideLeftTransition();
                break;
				
            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_MODAL:
                view = this.getViewByXType("mainModalView");
				Skin.config.global.Config.setCurrentView('mainmodal');
                direction = this.getSlideLeftTransition();// CHANGE THIS TO AN OPEN TRANSITION
                break;				

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_SLIDE:
                view = this.getViewByXType("mainSlideView");
				Skin.config.global.Config.setCurrentView('mainslide');
                direction = this.getSlideRightTransition();
                break;
				
            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_LIST:
                view = this.getViewByXType("mainListView");
				Skin.config.global.Config.setCurrentView('mainlist');
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_TILE:
                view = this.getViewByXType("mainTileView");
				Skin.config.global.Config.setCurrentView('maintile');
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_CLOSE_SHOW_MAIN_SLIDE:
                view = this.getViewByXType("mainSlideView");
				Skin.config.global.Config.setCurrentView('mainslide');
                direction = this.getSlideRightTransition(); // CHANGE THIS TO A CLOSE TRANSITION
                break;
				
            // case Skin.event.navigation.Event.ACTION_SHOW_EMPLOYEE_DETAIL:
                // view = this.getViewByXType("employeeDetailView");
				// Skin.config.global.Config.setCurrentView('employeedetail');
                // direction = this.getSlideLeftTransition();
                // break;

            // case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_LIST:
                // view = this.getViewByXType("employeeListView");
				// Skin.config.global.Config.setCurrentView('employeelist');
                // direction = this.getSlideRightTransition();
                // break;

            // case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_TILE:
                // view = this.getViewByXType("employeeTileView");
				// Skin.config.global.Config.setCurrentView('employeetile');
                // direction = this.getSlideRightTransition();
                // break;
        }

        // only navigate to the screen if the view exists
        if(view != null) {
//            this.slidleft(this.getViewByXType("extjsLoginView"));
            this.logger.debug("navigate = " + view.getItemId());
            this.getView().setView(view.getItemId());
//            this.setView(view.getItemId());
        } else {
            this.logger.warn("ViewportMediator.navigate: couldn't map navigation to action = " + action + " because " +
                "the view is null. Check the xtype.");
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
	
//    /**
//     * TODO
//     * @param view
//     */
//    setView: function(view) {
//        console.log("Viewport.setView: " + view);
//
//        try {
//            for ( var i=0; i<this.getView().items.length; i++)
//            {
//                var id = this.getView().items.getAt(i).getItemId();
//                if (id == view)
//                {
//                    this.getView().items.getAt(i).show();
//                } else {
//                    this.getView().items.getAt(i).hide();
//                }
//            }
//        } catch(e) {
//
//        }
//
//    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////	

    /**
     * Handles the get session success event
     */
    onGetSessionSuccess: function() { 
    	this.logger.debug("onGetSessionSuccess"); 	
    	//Skin.config.global.Config.setNextView('maintile');
        //var view = this.getView();
        //view.setLoading(false);
	//	this.navigate(Skin.event.authentication.Event.LOGIN_SUCCESS);
		// The views need to be able to load their data,
		// hence we throw a LOGIN_SUCCESS event
		// to which they are listening
		var evt = Ext.create("Core.event.authentication.Event", Core.event.authentication.Event.LOGIN_SUCCESS);
		this.eventBus.dispatchGlobalEvent(evt);			
    },
    
    /**
     * Handles the get session failure event
     */
    onGetSessionFailure: function() { 
    	this.logger.debug("onGetSessionFailure"); 
    	Skin.config.global.Config.setCurrentView('login');
        //var view = this.getView();
        //view.setLoading(false);
		this.navigate(Skin.event.authentication.Event.LOGOUT_SUCCESS);
    },	
	
    /**
     * Handles the navigation application event and passes on the action to a functional, testable method.
     */
    onNavigate: function(event) {
        this.logger.debug("onNavigate");
        this.navigate(event.action);
    }
	
    // slidleft: function (view) {
        // var results = this.getView().getState();
        // view.animate({
            // to: {
                // x: -results.width,
                // y: 0
            // },
            // duration: 1000,
            // listeners: {
                // afteranimate: function() {
                    // this.getView().getLayout().setActiveItem(this.getViewByXType("extjsMainListView")); // IS THIS NOT A TYPO, SHOULD IT BE mainListView INSTEAD ?
                    // this.logger.debug("after")
                // }
            // }
        // })
    // }
});