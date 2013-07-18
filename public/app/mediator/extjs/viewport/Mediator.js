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
Ext.define("Skin.mediator.extjs.viewport.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
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

        this.eventBus.addGlobalEventListener(Skin.event.navigation.Event.NAVIGATE, this.onNavigate, this);
    },

    /**
     * Maps the current application action like login, logout, show a view, etc and navigates to a
     * corresponding view.
     *
     * @param action    The current application-level action.
     */
    navigate: function(action) {
        this.logger.debug("navigate: action = ", action);

        var view;
        var direction;

        switch(action) {
            case Skin.event.authentication.Event.LOGIN_SUCCESS:
            	// HERE WE GET WHICH VIEW TO GO TO
                console.log("next view: "+ Skin.config.global.Config.getNextView()); // added by wvh, for testing only
                
                // WAS view = this.getViewByXType("employeeTileView"); 
                view = this.getViewByXType(Skin.config.global.Config.getNextView());
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.authentication.Event.LOGOUT_SUCCESS:
                view = this.getViewByXType("loginView");
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_SHOW_EMPLOYEE_DETAIL:
            	Skin.config.global.Config.setPreviousView('employeeTileView'); // added by wvh, make this dynamic
                view = this.getViewByXType("employeeDetailView");
                direction = this.getSlideLeftTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_LIST:
                view = this.getViewByXType("employeeListView");
                direction = this.getSlideRightTransition();
                break;

            case Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_TILE:
                view = this.getViewByXType("employeeTileView");
                direction = this.getSlideRightTransition();
                break;
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
     * Handles the navigation applicaiton event and passes on the action to a functional, testable method.
     */
    onNavigate: function(event) {
        this.logger.debug("onNavigate");

        this.navigate(event.action)
    },

    slidleft: function (view) {
        var results = this.getView().getState();
        view.animate({
            to: {
                x: -results.width,
                y: 0
            },
            duration: 1000,
            listeners: {
                afteranimate: function() {
                    this.getView().getLayout().setActiveItem(this.getViewByXType("extjsEmployeeListView")); // IS THIS NOT A TYPO, SHOULD IT BE employeeListView INSTEAD ?
                    this.logger.debug("after")
                }
            }
        })
    }

});

