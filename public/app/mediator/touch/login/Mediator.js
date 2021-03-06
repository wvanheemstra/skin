/**
 * The login mediator essentially fulfils the passive view pattern for the login view.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; eg, a login button on a desktop app could be click whereas mobile could be tap.
 */
Ext.define("Skin.mediator.touch.login.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
    	"Skin.event.session.Event",  
    	"Skin.event.background.Event",		
    	"Skin.event.ui.Event",
    	"Skin.event.company.Event",
        "Skin.event.authentication.Event",
        "nineam.locale.LocaleManager"
    ],

    inject: [
        "logger"
    ],

    // set up view event to mediator mapping
    control: {
		//background:						true,	
		company:						true,
        logInButton: {
            tap: "onLoginButtonTap",
            painted: "onPainted"
        },
        usernameTextField:      		true,
        passwordTextField:      		true,
        keepmeloggedinCheckboxField:    true,
        logInFailedLabel:      			true
    },

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners"); 
        this.eventBus.addGlobalEventListener(Skin.event.background.Event.SET_BACKGROUND_SUCCESS, this.onSetBackgroundSuccess, this);		
        this.eventBus.addGlobalEventListener(Skin.event.ui.Event.SET_UI_SUCCESS, this.onSetUISuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.company.Event.SET_COMPANY_SUCCESS, this.onSetCompanySuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.authentication.Event.LOGIN_SUCCESS, this.onLoginSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.authentication.Event.LOGIN_FAILURE, this.onLoginFailure, this);
        this.eventBus.addGlobalEventListener(Skin.event.authentication.Event.LOGOUT_SUCCESS, this.onLogoutSuccess, this);
    },

    /**
     * Handles the set background event. 
     *
     * @param background    The background to be set.	 
     */
    setBackground: function(background) {
		this.logger.debug("setBackground: background = " + background);
		//this.getBackground().setTitle(Skin.config.global.Config.getBackground());  // TO DO
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
            this.getView().items.getAt(i).setUi(ui);
        }
	}, 

    /**
     * Handles the set company event. 
     *
     * @param company    The company to be set.	 
     */
    setCompany: function(company) {
		this.logger.debug("setCompany: company = " + company);
		this.getCompany().setTitle(Skin.config.global.Config.getCompany());
    },

    /**
     * The functional, testable login method. Show a loading mask and dispatch the application-level login event.
     *
     * @param {String} username The username being passed to authenticate the user.
     * @param {String} password The password being passed to authenticate the user.
     * @param {Boolean} keepmeloggedin The keepmeloggedin being passed.
     */
    login: function(username, password, keepmeloggedin) {
        this.logger.debug("login: username = " + username + ", password = " + password + ", keepmeloggedin = " + keepmeloggedin);
		if(keepmeloggedin) {
			Skin.config.global.Config.setKeepMeLoggedIn(true);		
		} 
		else {
			Skin.config.global.Config.setKeepMeLoggedIn(false);	
		}

        var view = this.getView();
        this.reset();
        view.setMasked({
            xtype: "loadmask",
            message: nineam.locale.LocaleManager.getProperty("login.loggingIn")
        });

        var evt = Ext.create("Skin.event.authentication.Event", Skin.event.authentication.Event.LOGIN, username, password);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Shows the login failed label.
     *
     * @param message   The message string displayed for a failed login.
     */
    showLogInFailedMessage: function(message) {
        this.logger.debug("showLogInFailedMessage: " + message);
        var label = this.getLogInFailedLabel();
        label.setHtml(message);
        label.show();
    },

    /**
     * Determines if the credentials are valid for login and the ui is set.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.    
     * @return {Boolean}    Flag indicating if the supplied username and password are valid.
     */
    areLoginCredentialsValid: function(username, password) {
		this.logger.debug("areLoginCredentialsValid: username = " + username + ", password = " + password);
        return (username.length !== 0 && password.length !== 0);
    },

    /**
     * Resets the view's login fields.
     */
    reset: function() {
		this.logger.debug("reset");
        this.getUsernameTextField().setValue("");
        this.getPasswordTextField().setValue("");
       	this.getKeepmeloggedinCheckboxField().setChecked(false); 		
    },
	
    /**
     * Generates a string of 4 random characters.
     */	
	s4: function () {
		this.logger.debug("s4");
		return Math.floor((1 + Math.random()) * 0x10000)
				 .toString(16)
				 .substring(1);
	},

    /**
     * Generates a string of pairs of 4 random characters.
     */
	guid: function() {
		this.logger.debug("guid");
		return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
			 this.s4() + '-' + this.s4() + this.s4() + this.s4();
	},

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the painted application-level event.
     */    
    onPainted: function() {
		this.logger.debug("onPainted");
    },    	    

    /**
     * Handles the set background success event from the login controller.
     */
    onSetBackgroundSuccess: function() {
        this.logger.debug("onSetBackgroundSuccess");
        this.setBackground(Skin.config.global.Config.getBackground());
    },	
	
    /**
     * Handles the set ui success event from the login controller.
     */
    onSetUISuccess: function() {
        this.logger.debug("onSetUISuccess");
        this.setUI(Skin.config.global.Config.getUi());
    },

    /**
     * Handles the set company success event from the login controller.
     */
    onSetCompanySuccess: function() {
        this.logger.debug("onSetCompanySuccess");
        this.setCompany(Skin.config.global.Config.getCompany());
    },

    /**
     * Handles the login success event from the login controller. Removes the loading mask from the view.
     */
    onLoginSuccess: function() {
        this.logger.debug("onLoginSuccess");

		// HERE IS PROBABLY WHERE WE LIKE TO SET SESSION
		if(Skin.config.global.Config.getKeepMeLoggedIn()) {
			var id = 1;
			Skin.config.global.Config.setId(id);
			var sessionId = this.guid();
			Skin.config.global.Config.setSessionId(sessionId);
			
			this.logger.debug("set session: id = " + id + ", sessionId = " + sessionId);			
			
			var evt = Ext.create("Skin.event.session.Event", Skin.event.session.Event.SET_SESSION, id, sessionId);
        	this.eventBus.dispatchGlobalEvent(evt);
		}
		else {
			var id = Skin.config.global.Config.getId(id);
			var sessionId = Skin.config.global.Config.getSessionId(sessionId);
			
			this.logger.debug("clear session: id = " + id + ", sessionId = " + sessionId);			
			
			var evt = Ext.create("Skin.event.session.Event", Skin.event.session.Event.CLEAR_SESSION, id, sessionId);
        	this.eventBus.dispatchGlobalEvent(evt);	
		}

		// The next view to go to after login is set in the config file
        var view = this.getView();
        view.setMasked(false);
    },

    /**
     * Handles the logout success event from the logout controller. Slide the login view
     * onto stage.
     */
    onLogoutSuccess: function() {
        this.logger.debug("onLogoutSuccess");
		// HERE IS PROBABLY WHERE WE LIKE TO CLEAR SESSION
		var id = Skin.config.global.Config.getId(id);
		var sessionId = Skin.config.global.Config.getSessionId(sessionId);
		this.logger.debug("clear session: id = " + id + ", sessionId = " + sessionId);
		var evt = Ext.create("Skin.event.session.Event", Skin.event.session.Event.CLEAR_SESSION, id, sessionId);
        this.eventBus.dispatchGlobalEvent(evt);
        var view = this.getView();
        view.setMasked(false);
        this.navigate(Skin.event.authentication.Event.LOGOUT_SUCCESS);
    },

    /**
     * Handles the login failure event from the login controller. Removes the loading mask from the view.
     * Shows the failed login message.
     */
    onLoginFailure: function() {
        this.logger.debug("onLoginFailure");
        var view = this.getView();
        view.setMasked(false);
        this.showLogInFailedMessage(nineam.locale.LocaleManager.getProperty("login.loginFailed"));
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the simple tap event from the login view's submit button. Grabs the username and password
     * and passes them to the testable login method if the login credentials are valid.
     *
     * @param event The tap event from the login button on the login view.
     */
    onLoginButtonTap: function(event) {
        this.logger.debug("onLoginButtonTap");
        var username = this.getUsernameTextField().getValue();
        var password = this.getPasswordTextField().getValue();
       	var keepmeloggedin = this.getKeepmeloggedinCheckboxField().getChecked(); 
        // NOTE: if you don't reference a component multiple times you don't need to create a ref to it can simply
        // gain access to it with the method: getComponentById()
        var label = this.getComponentById("logInFailedLabel", this.getView());
        var me = this;
        label.hide();
        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {
            label.setHtml("");
            if(me.areLoginCredentialsValid(username, password)) {
                me.login(username, password, keepmeloggedin);
            } else {
                me.showLogInFailedMessage(nineam.locale.LocaleManager.getProperty("login.credentialsRequired"));
            }
        });
        task.delay(250);
    }
});