/*
 Copyright (c) 2013 [Web App Solution, Inc.](mailto:admin@webappsolution.com)

 CafeTownsend Sencha Touch DeftJS PoC is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CafeTownsend Sencha Touch DeftJS PoC is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CafeTownsend Sencha Touch DeftJS PoC.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The viewport mediator essentially fulfills the passive view pattern for the application's's Viewport.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; eg, a login button on a desktop app could be click whereas mobile could be tap.
 *
 * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
 */
Ext.define("Skin.mediator.touch.viewport.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
       // "Skin.event.session.Event",    
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
        mainListView:			"mainListView",
        mainTileView:			"mainTileView",
        mainDetailView:		    "mainDetailView",
        employeeListView:       "employeeListView",
        employeeTileView:       "employeeTileView",
        employeeDetailView:     "employeeDetailView"
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

        //this.eventBus.addGlobalEventListener(Skin.event.session.Event.SET_SESSION, this.onSetSession, this);
        //this.eventBus.addGlobalEventListener(Skin.event.session.Event.CLEAR_SESSION, this.onClearSession, this);        
        this.eventBus.addGlobalEventListener(Skin.event.ui.Event.SET_UI, this.onSetUI, this);
        this.eventBus.addGlobalEventListener(Skin.event.company.Event.SET_COMPANY, this.onSetCompany, this);
        this.eventBus.addGlobalEventListener(Skin.event.navigation.Event.NAVIGATE, this.onNavigate, this);
    },

    /**
     * Handles the set session event
     *
     */
//    setSession: function(id, sessionId) {
//        this.logger.debug("setSession: id = " + id + ", sessionId = " + sessionId);
//    },

    /**
     * Handles the clear session event
     *
     */
//    clearSession: function(id, sessionId) {
//        this.logger.debug("clearSession: id = " + id + ", sessionId = " + sessionId);
//    },

    /**
     * Handles the set ui event
     *
     */
    setUI: function(ui) {
        this.logger.debug("set: ui = ", ui);
    },
    
    /**
     * Handles the set company event
     *
     */
    setCompany: function(company) {
        this.logger.debug("set: company = ", company);
    },    

    /**
     * Maps the current application action like company, ui, login, logout, show a view, etc and navigates to a
     * corresponding view.
     *
     * @param action    The current application-level action.
     */
    navigate: function(action) {
        this.logger.debug("navigate: action = ", action);

        var view;
        var direction;

        switch(action) {
        	
//            case Skin.event.company.Event.SET_COMPANY_SUCCESS:
//                console.log("company: "+ Skin.config.global.Config.getCompany());
//                break;         	
//        	
//            case Skin.event.ui.Event.SET_UI_SUCCESS:
//                console.log("ui: "+ Skin.config.global.Config.getUi());
//                break;        	

            case Skin.event.authentication.Event.LOGIN_SUCCESS:
            	// HERE WE GET WHICH VIEW TO GO TO
                console.log("next view: "+ Skin.config.global.Config.getNextView()); // added by wvh, for testing only
                
                //WAS view = this.getEmployeeListView();
                view = this.getViewByXType(Skin.config.global.Config.getNextView());
                
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.authentication.Event.LOGOUT_SUCCESS:
                view = this.getLoginView();
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_SHOW_MAIN_DETAIL:
                view = this.getMainDetailView();
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_LIST:
                view = this.getMainListView();
                direction = this.getSlideRightTransition();
                break;
                
            case Skin.event.navigation.Event.ACTION_BACK_SHOW_MAIN_TILE:
                view = this.getMainTileView();
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_SHOW_EMPLOYEE_DETAIL:
                view = this.getEmployeeDetailView();
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_LIST:
                view = this.getEmployeeListView();
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_TILE:
                view = this.getEmployeeTileView();
                direction = this.getSlideRightTransition();
                break;
        }

        // only navigate to the screen if the view exist
        if(view != null) {
            Ext.Viewport.animateActiveItem(view, direction);
        } else {
            this.logger.warn("ViewportMediator.navigate: couldn't map navigation to action = ", action);
        }

    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the set session application event and passes on the id and sessionId to a functional, testable method.
     */
//    onSetSession: function(event) {
//        this.logger.debug("onSetSession");
//
//        this.setSession(event.id, event.sessionId);
//    },

    /**
     * Handles the clear session application event and passes on the id and sessionId to a functional, testable method.
     */
//    onClearSession: function(event) {
//        this.logger.debug("onClearSession");
//
//        this.clearSession(event.id, event.sessionId);
//    },

    /**
     * Handles the set ui application event and passes on the ui to a functional, testable method.
     */
    onSetUI: function(event) {
        this.logger.debug("onSetUI");

        this.setUI(event.ui);
    },

    /**
     * Handles the set company application event and passes on the company to a functional, testable method.
     */
    onSetCompany: function(event) {
        this.logger.debug("onSetCompany");

        this.setCompany(event.company);
    },

    /**
     * Handles the navigation application event and passes on the action to a functional, testable method.
     */
    onNavigate: function(event) {
        this.logger.debug("onNavigate");

        this.navigate(event.action);
    }

});

