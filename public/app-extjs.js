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

    // pull all of this in so they can be injected
    Ext.syncRequire([
	    "Skin.view.extjs.viewport.View",
        "Skin.service.session.mock.Service", 
        "Skin.service.background.Service",
        "Skin.service.background.mock.Service",		
        "Skin.service.ui.Service",
        "Skin.service.ui.mock.Service", 
        "Skin.service.company.Service",
        "Skin.service.company.mock.Service",		
        "Skin.service.authentication.Service",
        "Skin.service.authentication.mock.Service",
        "Skin.service.main.Service",
        "Skin.service.main.mock.Service",		
        //"Skin.service.employee.mock.Service",
		"Skin.store.session.Store",
        "Skin.store.main.Store",		
        //"Skin.store.employee.Store",
        "FlowMVC.mvc.event.EventDispatcher",
        "FlowMVC.logger.Logger"
    ]);

    /**
     * Locale Manager core classes. These might only need to be required for dev.
     */
    Ext.syncRequire([
        "nineam.locale.LocaleManager",
        "nineam.locale.plugin.extjs.LocalePlugin"
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
        sessionStore:			"Skin.store.session.Store",
        mainStore:				"Skin.store.main.Store",		
        //employeeStore:          "Skin.store.employee.Store",

	    ////////////////////////////////////////////
	    // SERVICES
	    ////////////////////////////////////////////		
		
        ////////////////////////////////////////////
        // SERVICE MOCKS
        ////////////////////////////////////////////
        sessionService:         "Skin.service.session.mock.Service", 
        authenticationService:  "Skin.service.authentication.mock.Service",
        backgroundService:      "Skin.service.background.mock.Service",		
        uiService:        		"Skin.service.ui.mock.Service",
        companyService:        	"Skin.service.company.mock.Service",
        mainService:			"Skin.service.main.mock.Service",
        //employeeService:        "Skin.service.employee.mock.Service",

        sessionServiceClass: {
            value: "Skin.service.session.mock.Service"
        },		
		
        authenticationServiceClass: {
            value: "Skin.service.authentication.mock.Service"
        },
        
        backgroundServiceClass: {
            value: "Skin.service.background.mock.Service"
        },
        
        uiServiceClass: {
            value: "Skin.service.ui.mock.Service"
        },
        
        companyServiceClass: {
            value: "Skin.service.company.mock.Service"
        }		
    });
});

Ext.application({

    name: "Skin",
    
    ////////////////////////////////////////////
    // Ext
    ////////////////////////////////////////////    
    requires: [
    	"Ext.MessageBox"
    ],    
    
    ////////////////////////////////////////////
    // CONFIG
    ////////////////////////////////////////////    
    requires: [
    	"Skin.config.global.Config"
    ],

    ////////////////////////////////////////////
    // MODELS
    ////////////////////////////////////////////
    models: [
        "session.Model",
    	"main.Model"
		//"employee.Model"
    ],

    ////////////////////////////////////////////
    // VIEWS
    ////////////////////////////////////////////
    views: [
        "Skin.view.extjs.viewport.View",
        "Skin.view.extjs.login.View",
        "Skin.view.extjs.main.slide.View",		
        "Skin.view.extjs.main.list.View",
        "Skin.view.extjs.main.detail.View",
        "Skin.view.extjs.main.tile.View"	
        //"Skin.view.extjs.employee.list.View",
        //"Skin.view.extjs.employee.detail.View",
        //"Skin.view.extjs.employee.tile.View"
    ],

    ////////////////////////////////////////////
    // CONTROLLERS
    ////////////////////////////////////////////
    controllers:[
        "bootstrap.Controller",
        "session.Controller",  
        "background.Controller",		
        "ui.Controller",
        "company.Controller",		
        "authentication.Controller",
        "main.Controller"		
        //"employee.Controller"
    ],

    /**
     * Add the views to the stage. Not optimal since we don"t need them all upfront, but it"ll get the
     * ball rolling in the right direction for a PoC.
     *
     * TODO: BMR: 02/22/13: Don"t add all the views to the stage at once. Do it on demand.
     */
    launch: function () {
        console.log("app.launch");
        
    	// Destroy the #appLoadingIndicator element
    	Ext.fly('appLoadingIndicator').destroy();        

        // Set up QuickTips and create the Viewport
        Ext.tip.QuickTipManager.init();
        var viewport = Ext.create("Skin.view.extjs.viewport.View");
		// BELOW IS MOVED TO GET_SESSION_SUCCESS and GET_SESSION_FAILURE
		// viewport.setView(Skin.config.global.Config.getInitialView());
		var viewportMediator = viewport.getController();
		viewportMediator.setupViewport();
    },
    
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});