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
        "Skin.view.touch.login.View",
		"Skin.view.touch.main.slide.View",
        "Skin.view.touch.main.list.View",
        "Skin.view.touch.main.tile.View",
        "Skin.view.touch.main.modal.View",		
        "Skin.view.touch.main.detail.View"
        //"Skin.view.touch.employee.list.View",
        //"Skin.view.touch.employee.tile.View",
        //"Skin.view.touch.employee.detail.View"
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

    ////////////////////////////////////////////
    // ICON
    ////////////////////////////////////////////    
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    ////////////////////////////////////////////
    // STARTUP IMAGE
    ////////////////////////////////////////////
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },    
    
    /**
     * Add the views to the stage. Not optimal since we don't need them all upfront, but it'll get the
     * ball rolling in the right direction for a PoC.
     *
     * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
     */
    launch: function () {
        console.log("app.launch");
        
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        //since there's no view associated with it
        var viewportMediator = Ext.create("Skin.mediator.touch.viewport.Mediator");
        viewportMediator.init();

        Ext.Viewport.add([
            { xtype: "loginView" },
			{ xtype: "mainSlideView" },
            { xtype: "mainListView" },
            { xtype: "mainTileView" },
            { xtype: "mainModalView" },	
            { xtype: "mainDetailView" }
            //{ xtype: "employeeListView" },
            //{ xtype: "employeeTileView" },
            //{ xtype: "employeeDetailView" }            
        ]);
		
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