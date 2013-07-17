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
 * The main application class sets up the following:
 *
 * <ul>
 * <li>Sets up loaders and class loader dependencies</li>
 * <li>Sencha MVC infrastructure (listing out the models, views, and controllers)</li>
 * <li>WASI Sencha Extensions library</li>
 * <li>DeftJS IoC and dependencies</li>
 * <li>Adds the views to the main Viewport when the application launches</li>
 * </ul>
 */
Ext.onReady(function () {
    console.log("app.onReady");

    Ext.require([
        "Skin.service.authentication.Service",
        "Skin.service.authentication.mock.Service",
        "Skin.service.employee.mock.Service",
        "Skin.store.employee.Store",

        "nineam.locale.LocaleManager",
        "nineam.locale.plugin.touch.LocalePlugin"

    ]);

    // Configure the DeftJS IoC container
    Deft.Injector.configure({

        ////////////////////////////////////////////
        // LOGGER
        ////////////////////////////////////////////
        logger:                 FlowMVC.logger.Logger.getInjectableLogger(),

        ////////////////////////////////////////////
        // EVENT DISPATCHER
        ////////////////////////////////////////////
        eventBus:               "FlowMVC.mvc.event.EventDispatcher",

        ////////////////////////////////////////////
        // IMPL
        ////////////////////////////////////////////
        employeeStore:          "Skin.store.employee.Store",

//        ////////////////////////////////////////////
//        // MOCKS
//        ////////////////////////////////////////////
        authenticationService:  "Skin.service.authentication.mock.Service",
        employeeService:        "Skin.service.employee.mock.Service",

        authenticationServiceClass: {
            value: "Skin.service.authentication.mock.Service"
        }
    });

});

Ext.application({

    name: "Skin",

    ////////////////////////////////////////////
    // MODELS
    ////////////////////////////////////////////
    models: [
        "employee.Model"
    ],

    ////////////////////////////////////////////
    // VIEWS
    ////////////////////////////////////////////
    views: [
        "Skin.view.touch.LoginView",
        "Skin.view.touch.EmployeeListView",
        "Skin.view.touch.EmployeeDetailView",
        "Skin.view.touch.EmployeeTileView"
    ],

    ////////////////////////////////////////////
    // CONTROLLERS
    ////////////////////////////////////////////
    controllers:[
        "bootstrap.Controller",
        "authentication.Controller",
        "employee.Controller"
    ],

    /**
     * Add the views to the stage. Not optimal since we don't need them all upfront, but it'll get the
     * ball rolling in the right direction for a PoC.
     *
     * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
     */
    launch: function () {
        console.log("app.launch");

        //since there's no view associated with it
        var viewportMediator = Ext.create("Skin.mediator.touch.viewport.Mediator");
        viewportMediator.init();

        Ext.Viewport.add([
            { xtype: "loginView" },
            { xtype: "employeeListView" },
            { xtype: "employeeDetailView" },
            { xtype: "employeeTileView" }
        ]);
    }
});