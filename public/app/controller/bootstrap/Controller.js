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
 * The BootstrapController acts like a service controller with asynchronous callback methods for successful
 * and failed authentication service calls.
 */
Ext.define("Skin.controller.bootstrap.Controller", {
    extend: "FlowMVC.mvc.controller.AbstractController",

    requires: [
        "nineam.locale.store.LocalesStore",
        "nineam.locale.event.LocaleEvent"
    ],

    inject: [
        "logger"
    ],

    /**
     * @event Skin.event.AuthenticationEvent.LOGIN_SUCCESS
     * Fired when the login service is successful.
     */

    /**
     * Sets up global event bus handlers.
     * @protected
     */
    init: function() {
        this.callParent();
        this.logger.debug("init");

        this.initLocaleManager();
    },

    /**
     * Sets up global event bus handlers.
     * @protected
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
    },

    /**
     * Initializes the Localization Manager loading in two languages for now.
     */
    initLocaleManager: function() {
        var lm = nineam.locale.LocaleManager;
        lm.addListener(nineam.locale.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);

        var locales = Ext.create("nineam.locale.store.LocalesStore", {
            data: [
                {id: "en_uk", label: "English UK", url: "locale/en_uk.json"},
                {id: "en_us", label: "English US", url: "locale/en_us.json"},
                {id: "es_us", label: "Spanish", url: "locale/es_us.json"},
                {id: "nl_nl", label: "Dutch", url: "locale/nl_nl.json"},
                {id: "de_de", label: "Deutsch", url: "locale/de_de.json"}
            ]
        });
        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        
        
        this.logger.debug("locale: " + locale);
        
        
        locale = locale ? locale : "en_uk";
        this.logger.debug("initLocaleManager: locale = " + locale);
        lm.setLocale(locale);
    },

    /**
     * LocaleManager initialized event handler
     */
    localeManagerInitializedEventHandler: function() {
//        Ext.getBody().unmask(); // TODO: not for touch
    }

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

});

